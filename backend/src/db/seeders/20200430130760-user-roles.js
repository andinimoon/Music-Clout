const { v4: uuid } = require('uuid');

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert('roles', [
      {
        id: getId('Administrator'),
        name: 'Administrator',
        createdAt,
        updatedAt,
      },

      { id: getId('PowerUser'), name: 'PowerUser', createdAt, updatedAt },

      {
        id: getId('ContentManager'),
        name: 'ContentManager',
        createdAt,
        updatedAt,
      },

      {
        id: getId('CommunityLeader'),
        name: 'CommunityLeader',
        createdAt,
        updatedAt,
      },

      { id: getId('TrackCurator'), name: 'TrackCurator', createdAt, updatedAt },

      { id: getId('Listener'), name: 'Listener', createdAt, updatedAt },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        {
          id: getId(`CREATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `CREATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`READ_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `READ_${name.toUpperCase()}`,
        },
        {
          id: getId(`UPDATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `UPDATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`DELETE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `DELETE_${name.toUpperCase()}`,
        },
      ];
    }

    const entities = [
      'users',
      'comments',
      'contests',
      'notifications',
      'tracks',
      'roles',
      'permissions',
      ,
    ];
    await queryInterface.bulkInsert(
      'permissions',
      entities.flatMap(createPermissions),
    );
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`READ_API_DOCS`),
        createdAt,
        updatedAt,
        name: `READ_API_DOCS`,
      },
    ]);
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`CREATE_SEARCH`),
        createdAt,
        updatedAt,
        name: `CREATE_SEARCH`,
      },
    ]);

    await queryInterface.sequelize
      .query(`create table "rolesPermissionsPermissions"
(
"createdAt"           timestamp with time zone not null,
"updatedAt"           timestamp with time zone not null,
"roles_permissionsId" uuid                     not null,
"permissionId"        uuid                     not null,
primary key ("roles_permissionsId", "permissionId")
);`);

    await queryInterface.bulkInsert('rolesPermissionsPermissions', [
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PowerUser'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PowerUser'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PowerUser'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PowerUser'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ContentManager'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ContentManager'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CommunityLeader'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CommunityLeader'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('TrackCurator'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('TrackCurator'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Listener'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Listener'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PowerUser'),
        permissionId: getId('CREATE_COMMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PowerUser'),
        permissionId: getId('READ_COMMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PowerUser'),
        permissionId: getId('UPDATE_COMMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PowerUser'),
        permissionId: getId('DELETE_COMMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ContentManager'),
        permissionId: getId('CREATE_COMMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ContentManager'),
        permissionId: getId('READ_COMMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ContentManager'),
        permissionId: getId('UPDATE_COMMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ContentManager'),
        permissionId: getId('DELETE_COMMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CommunityLeader'),
        permissionId: getId('CREATE_COMMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CommunityLeader'),
        permissionId: getId('READ_COMMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CommunityLeader'),
        permissionId: getId('UPDATE_COMMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CommunityLeader'),
        permissionId: getId('DELETE_COMMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('TrackCurator'),
        permissionId: getId('READ_COMMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('TrackCurator'),
        permissionId: getId('UPDATE_COMMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Listener'),
        permissionId: getId('READ_COMMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Listener'),
        permissionId: getId('UPDATE_COMMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PowerUser'),
        permissionId: getId('CREATE_CONTESTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PowerUser'),
        permissionId: getId('READ_CONTESTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PowerUser'),
        permissionId: getId('UPDATE_CONTESTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PowerUser'),
        permissionId: getId('DELETE_CONTESTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ContentManager'),
        permissionId: getId('CREATE_CONTESTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ContentManager'),
        permissionId: getId('READ_CONTESTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ContentManager'),
        permissionId: getId('UPDATE_CONTESTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CommunityLeader'),
        permissionId: getId('READ_CONTESTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CommunityLeader'),
        permissionId: getId('UPDATE_CONTESTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('TrackCurator'),
        permissionId: getId('READ_CONTESTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('TrackCurator'),
        permissionId: getId('UPDATE_CONTESTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Listener'),
        permissionId: getId('READ_CONTESTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Listener'),
        permissionId: getId('UPDATE_CONTESTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PowerUser'),
        permissionId: getId('CREATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PowerUser'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PowerUser'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PowerUser'),
        permissionId: getId('DELETE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ContentManager'),
        permissionId: getId('CREATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ContentManager'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ContentManager'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CommunityLeader'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CommunityLeader'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('TrackCurator'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('TrackCurator'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Listener'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Listener'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PowerUser'),
        permissionId: getId('CREATE_TRACKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PowerUser'),
        permissionId: getId('READ_TRACKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PowerUser'),
        permissionId: getId('UPDATE_TRACKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PowerUser'),
        permissionId: getId('DELETE_TRACKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ContentManager'),
        permissionId: getId('CREATE_TRACKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ContentManager'),
        permissionId: getId('READ_TRACKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ContentManager'),
        permissionId: getId('UPDATE_TRACKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ContentManager'),
        permissionId: getId('DELETE_TRACKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CommunityLeader'),
        permissionId: getId('READ_TRACKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CommunityLeader'),
        permissionId: getId('UPDATE_TRACKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('TrackCurator'),
        permissionId: getId('READ_TRACKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('TrackCurator'),
        permissionId: getId('UPDATE_TRACKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Listener'),
        permissionId: getId('READ_TRACKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Listener'),
        permissionId: getId('UPDATE_TRACKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('PowerUser'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ContentManager'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CommunityLeader'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('TrackCurator'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Listener'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_COMMENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_COMMENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_COMMENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_COMMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_CONTESTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_CONTESTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_CONTESTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_CONTESTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_TRACKS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_TRACKS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_TRACKS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_TRACKS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ROLES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_PERMISSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SEARCH'),
      },
    ]);

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SuperAdmin',
      )}' WHERE "email"='super_admin@flatlogic.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'Administrator',
      )}' WHERE "email"='admin@flatlogic.com'`,
    );

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'PowerUser',
      )}' WHERE "email"='client@hello.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'ContentManager',
      )}' WHERE "email"='john@doe.com'`,
    );
  },
};
