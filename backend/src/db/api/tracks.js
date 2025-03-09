const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class TracksDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const tracks = await db.tracks.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        description: data.description || null,
        play_count: data.play_count || null,
        upload_date: data.upload_date || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await tracks.setArtist(data.artist || null, {
      transaction,
    });

    return tracks;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const tracksData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      description: item.description || null,
      play_count: item.play_count || null,
      upload_date: item.upload_date || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const tracks = await db.tracks.bulkCreate(tracksData, { transaction });

    // For each item created, replace relation files

    return tracks;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const tracks = await db.tracks.findByPk(id, {}, { transaction });

    const updatePayload = {};

    if (data.title !== undefined) updatePayload.title = data.title;

    if (data.description !== undefined)
      updatePayload.description = data.description;

    if (data.play_count !== undefined)
      updatePayload.play_count = data.play_count;

    if (data.upload_date !== undefined)
      updatePayload.upload_date = data.upload_date;

    updatePayload.updatedById = currentUser.id;

    await tracks.update(updatePayload, { transaction });

    if (data.artist !== undefined) {
      await tracks.setArtist(
        data.artist,

        { transaction },
      );
    }

    return tracks;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const tracks = await db.tracks.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of tracks) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of tracks) {
        await record.destroy({ transaction });
      }
    });

    return tracks;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const tracks = await db.tracks.findByPk(id, options);

    await tracks.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await tracks.destroy({
      transaction,
    });

    return tracks;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const tracks = await db.tracks.findOne({ where }, { transaction });

    if (!tracks) {
      return tracks;
    }

    const output = tracks.get({ plain: true });

    output.comments_track = await tracks.getComments_track({
      transaction,
    });

    output.artist = await tracks.getArtist({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    let where = {};
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;

    let include = [
      {
        model: db.users,
        as: 'artist',

        where: filter.artist
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.artist
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  firstName: {
                    [Op.or]: filter.artist
                      .split('|')
                      .map((term) => ({ [Op.iLike]: `%${term}%` })),
                  },
                },
              ],
            }
          : {},
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.title) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('tracks', 'title', filter.title),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('tracks', 'description', filter.description),
        };
      }

      if (filter.play_countRange) {
        const [start, end] = filter.play_countRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            play_count: {
              ...where.play_count,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            play_count: {
              ...where.play_count,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.upload_dateRange) {
        const [start, end] = filter.upload_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            upload_date: {
              ...where.upload_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            upload_date: {
              ...where.upload_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.active !== undefined) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    const queryOptions = {
      where,
      include,
      distinct: true,
      order:
        filter.field && filter.sort
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
      transaction: options?.transaction,
      logging: console.log,
    };

    if (!options?.countOnly) {
      queryOptions.limit = limit ? Number(limit) : undefined;
      queryOptions.offset = offset ? Number(offset) : undefined;
    }

    try {
      const { rows, count } = await db.tracks.findAndCountAll(queryOptions);

      return {
        rows: options?.countOnly ? [] : rows,
        count: count,
      };
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  static async findAllAutocomplete(query, limit, offset) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('tracks', 'title', query),
        ],
      };
    }

    const records = await db.tracks.findAll({
      attributes: ['id', 'title'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['title', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }
};
