const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const contests = sequelize.define(
    'contests',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      start_date: {
        type: DataTypes.DATE,
      },

      end_date: {
        type: DataTypes.DATE,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  contests.associate = (db) => {
    db.contests.belongsToMany(db.users, {
      as: 'participants',
      foreignKey: {
        name: 'contests_participantsId',
      },
      constraints: false,
      through: 'contestsParticipantsUsers',
    });

    db.contests.belongsToMany(db.users, {
      as: 'participants_filter',
      foreignKey: {
        name: 'contests_participantsId',
      },
      constraints: false,
      through: 'contestsParticipantsUsers',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.contests.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.contests.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return contests;
};
