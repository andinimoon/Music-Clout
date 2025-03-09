const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class NotificationsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const notifications = await db.notifications.create(
      {
        id: data.id || undefined,

        message: data.message || null,
        read: data.read || false,

        notification_date: data.notification_date || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await notifications.setUser(data.user || null, {
      transaction,
    });

    return notifications;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const notificationsData = data.map((item, index) => ({
      id: item.id || undefined,

      message: item.message || null,
      read: item.read || false,

      notification_date: item.notification_date || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const notifications = await db.notifications.bulkCreate(notificationsData, {
      transaction,
    });

    // For each item created, replace relation files

    return notifications;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const notifications = await db.notifications.findByPk(
      id,
      {},
      { transaction },
    );

    const updatePayload = {};

    if (data.message !== undefined) updatePayload.message = data.message;

    if (data.read !== undefined) updatePayload.read = data.read;

    if (data.notification_date !== undefined)
      updatePayload.notification_date = data.notification_date;

    updatePayload.updatedById = currentUser.id;

    await notifications.update(updatePayload, { transaction });

    if (data.user !== undefined) {
      await notifications.setUser(
        data.user,

        { transaction },
      );
    }

    return notifications;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const notifications = await db.notifications.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of notifications) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of notifications) {
        await record.destroy({ transaction });
      }
    });

    return notifications;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const notifications = await db.notifications.findByPk(id, options);

    await notifications.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await notifications.destroy({
      transaction,
    });

    return notifications;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const notifications = await db.notifications.findOne(
      { where },
      { transaction },
    );

    if (!notifications) {
      return notifications;
    }

    const output = notifications.get({ plain: true });

    output.user = await notifications.getUser({
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
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.message) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('notifications', 'message', filter.message),
        };
      }

      if (filter.notification_dateRange) {
        const [start, end] = filter.notification_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            notification_date: {
              ...where.notification_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            notification_date: {
              ...where.notification_date,
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

      if (filter.read) {
        where = {
          ...where,
          read: filter.read,
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
      const { rows, count } = await db.notifications.findAndCountAll(
        queryOptions,
      );

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
          Utils.ilike('notifications', 'message', query),
        ],
      };
    }

    const records = await db.notifications.findAll({
      attributes: ['id', 'message'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['message', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.message,
    }));
  }
};
