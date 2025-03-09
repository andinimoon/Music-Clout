const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const tracks = sequelize.define(
    'tracks',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
      },

      play_count: {
        type: DataTypes.INTEGER,
      },

      upload_date: {
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

  tracks.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.tracks.hasMany(db.comments, {
      as: 'comments_track',
      foreignKey: {
        name: 'trackId',
      },
      constraints: false,
    });

    //end loop

    db.tracks.belongsTo(db.users, {
      as: 'artist',
      foreignKey: {
        name: 'artistId',
      },
      constraints: false,
    });

    db.tracks.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.tracks.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return tracks;
};
