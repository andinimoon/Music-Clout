const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class CommentsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const comments = await db.comments.create(
      {
        id: data.id || undefined,

        content: data.content || null,
        comment_date: data.comment_date || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await comments.setUser(data.user || null, {
      transaction,
    });

    await comments.setTrack(data.track || null, {
      transaction,
    });

    return comments;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const commentsData = data.map((item, index) => ({
      id: item.id || undefined,

      content: item.content || null,
      comment_date: item.comment_date || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const comments = await db.comments.bulkCreate(commentsData, {
      transaction,
    });

    // For each item created, replace relation files

    return comments;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const comments = await db.comments.findByPk(id, {}, { transaction });

    const updatePayload = {};

    if (data.content !== undefined) updatePayload.content = data.content;

    if (data.comment_date !== undefined)
      updatePayload.comment_date = data.comment_date;

    updatePayload.updatedById = currentUser.id;

    await comments.update(updatePayload, { transaction });

    if (data.user !== undefined) {
      await comments.setUser(
        data.user,

        { transaction },
      );
    }

    if (data.track !== undefined) {
      await comments.setTrack(
        data.track,

        { transaction },
      );
    }

    return comments;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const comments = await db.comments.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of comments) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of comments) {
        await record.destroy({ transaction });
      }
    });

    return comments;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const comments = await db.comments.findByPk(id, options);

    await comments.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await comments.destroy({
      transaction,
    });

    return comments;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const comments = await db.comments.findOne({ where }, { transaction });

    if (!comments) {
      return comments;
    }

    const output = comments.get({ plain: true });

    output.user = await comments.getUser({
      transaction,
    });

    output.track = await comments.getTrack({
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
        as: 'user',

        where: filter.user
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.user
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  firstName: {
                    [Op.or]: filter.user
                      .split('|')
                      .map((term) => ({ [Op.iLike]: `%${term}%` })),
                  },
                },
              ],
            }
          : {},
      },

      {
        model: db.tracks,
        as: 'track',

        where: filter.track
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.track
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  title: {
                    [Op.or]: filter.track
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

      if (filter.content) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('comments', 'content', filter.content),
        };
      }

      if (filter.comment_dateRange) {
        const [start, end] = filter.comment_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            comment_date: {
              ...where.comment_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            comment_date: {
              ...where.comment_date,
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
      const { rows, count } = await db.comments.findAndCountAll(queryOptions);

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
          Utils.ilike('comments', 'content', query),
        ],
      };
    }

    const records = await db.comments.findAll({
      attributes: ['id', 'content'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['content', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.content,
    }));
  }
};
