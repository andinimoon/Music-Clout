const db = require('../models');
const Users = db.users;

const Comments = db.comments;

const Contests = db.contests;

const Notifications = db.notifications;

const Tracks = db.tracks;

const CommentsData = [
  {
    content: 'Love this track!',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    comment_date: new Date('2023-10-01T11:00:00Z'),
  },

  {
    content: 'Great vibes!',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    comment_date: new Date('2023-10-02T13:00:00Z'),
  },

  {
    content: 'This is my new favorite song.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    comment_date: new Date('2023-10-03T09:00:00Z'),
  },

  {
    content: 'Amazing work!',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    comment_date: new Date('2023-10-04T15:00:00Z'),
  },

  {
    content: "Can't stop listening to this!",

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    comment_date: new Date('2023-10-05T19:00:00Z'),
  },
];

const ContestsData = [
  {
    name: 'Summer Hit Contest',

    start_date: new Date('2023-06-01T00:00:00Z'),

    end_date: new Date('2023-06-30T23:59:59Z'),

    // type code here for "relation_many" field
  },

  {
    name: 'Winter Jam',

    start_date: new Date('2023-12-01T00:00:00Z'),

    end_date: new Date('2023-12-31T23:59:59Z'),

    // type code here for "relation_many" field
  },

  {
    name: 'Spring Melody',

    start_date: new Date('2023-03-01T00:00:00Z'),

    end_date: new Date('2023-03-31T23:59:59Z'),

    // type code here for "relation_many" field
  },

  {
    name: 'Autumn Beats',

    start_date: new Date('2023-09-01T00:00:00Z'),

    end_date: new Date('2023-09-30T23:59:59Z'),

    // type code here for "relation_many" field
  },

  {
    name: 'New Year Bash',

    start_date: new Date('2023-12-31T00:00:00Z'),

    end_date: new Date('2024-01-01T23:59:59Z'),

    // type code here for "relation_many" field
  },
];

const NotificationsData = [
  {
    message: 'You have a new comment on your track.',

    // type code here for "relation_one" field

    read: false,

    notification_date: new Date('2023-10-01T12:00:00Z'),
  },

  {
    message: 'Your track has been played 100 times!',

    // type code here for "relation_one" field

    read: true,

    notification_date: new Date('2023-10-02T14:00:00Z'),
  },

  {
    message: 'You earned 50 points!',

    // type code here for "relation_one" field

    read: true,

    notification_date: new Date('2023-10-03T10:00:00Z'),
  },

  {
    message: 'New contest available!',

    // type code here for "relation_one" field

    read: true,

    notification_date: new Date('2023-10-04T16:00:00Z'),
  },

  {
    message: 'Your track is trending!',

    // type code here for "relation_one" field

    read: true,

    notification_date: new Date('2023-10-05T20:00:00Z'),
  },
];

const TracksData = [
  {
    title: 'Summer Vibes',

    description: 'A chill summer track to relax to.',

    // type code here for "relation_one" field

    play_count: 500,

    upload_date: new Date('2023-10-01T10:00:00Z'),
  },

  {
    title: 'Night Drive',

    description: 'Perfect music for a late-night drive.',

    // type code here for "relation_one" field

    play_count: 300,

    upload_date: new Date('2023-10-02T12:00:00Z'),
  },

  {
    title: 'Morning Coffee',

    description: 'Start your day with this upbeat tune.',

    // type code here for "relation_one" field

    play_count: 450,

    upload_date: new Date('2023-10-03T08:00:00Z'),
  },

  {
    title: 'Rainy Day Blues',

    description: 'A soulful track for rainy days.',

    // type code here for "relation_one" field

    play_count: 600,

    upload_date: new Date('2023-10-04T14:00:00Z'),
  },

  {
    title: 'Dance Party',

    description: 'Get the party started with this track.',

    // type code here for "relation_one" field

    play_count: 700,

    upload_date: new Date('2023-10-05T18:00:00Z'),
  },
];

// Similar logic for "relation_many"

async function associateCommentWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Comment0 = await Comments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Comment0?.setUser) {
    await Comment0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Comment1 = await Comments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Comment1?.setUser) {
    await Comment1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Comment2 = await Comments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Comment2?.setUser) {
    await Comment2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Comment3 = await Comments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Comment3?.setUser) {
    await Comment3.setUser(relatedUser3);
  }

  const relatedUser4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Comment4 = await Comments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Comment4?.setUser) {
    await Comment4.setUser(relatedUser4);
  }
}

async function associateCommentWithTrack() {
  const relatedTrack0 = await Tracks.findOne({
    offset: Math.floor(Math.random() * (await Tracks.count())),
  });
  const Comment0 = await Comments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Comment0?.setTrack) {
    await Comment0.setTrack(relatedTrack0);
  }

  const relatedTrack1 = await Tracks.findOne({
    offset: Math.floor(Math.random() * (await Tracks.count())),
  });
  const Comment1 = await Comments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Comment1?.setTrack) {
    await Comment1.setTrack(relatedTrack1);
  }

  const relatedTrack2 = await Tracks.findOne({
    offset: Math.floor(Math.random() * (await Tracks.count())),
  });
  const Comment2 = await Comments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Comment2?.setTrack) {
    await Comment2.setTrack(relatedTrack2);
  }

  const relatedTrack3 = await Tracks.findOne({
    offset: Math.floor(Math.random() * (await Tracks.count())),
  });
  const Comment3 = await Comments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Comment3?.setTrack) {
    await Comment3.setTrack(relatedTrack3);
  }

  const relatedTrack4 = await Tracks.findOne({
    offset: Math.floor(Math.random() * (await Tracks.count())),
  });
  const Comment4 = await Comments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Comment4?.setTrack) {
    await Comment4.setTrack(relatedTrack4);
  }
}

// Similar logic for "relation_many"

async function associateNotificationWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification0 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Notification0?.setUser) {
    await Notification0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification1 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Notification1?.setUser) {
    await Notification1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification2 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Notification2?.setUser) {
    await Notification2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification3 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Notification3?.setUser) {
    await Notification3.setUser(relatedUser3);
  }

  const relatedUser4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification4 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Notification4?.setUser) {
    await Notification4.setUser(relatedUser4);
  }
}

async function associateTrackWithArtist() {
  const relatedArtist0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Track0 = await Tracks.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Track0?.setArtist) {
    await Track0.setArtist(relatedArtist0);
  }

  const relatedArtist1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Track1 = await Tracks.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Track1?.setArtist) {
    await Track1.setArtist(relatedArtist1);
  }

  const relatedArtist2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Track2 = await Tracks.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Track2?.setArtist) {
    await Track2.setArtist(relatedArtist2);
  }

  const relatedArtist3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Track3 = await Tracks.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Track3?.setArtist) {
    await Track3.setArtist(relatedArtist3);
  }

  const relatedArtist4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Track4 = await Tracks.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Track4?.setArtist) {
    await Track4.setArtist(relatedArtist4);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Comments.bulkCreate(CommentsData);

    await Contests.bulkCreate(ContestsData);

    await Notifications.bulkCreate(NotificationsData);

    await Tracks.bulkCreate(TracksData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateCommentWithUser(),

      await associateCommentWithTrack(),

      // Similar logic for "relation_many"

      await associateNotificationWithUser(),

      await associateTrackWithArtist(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comments', null, {});

    await queryInterface.bulkDelete('contests', null, {});

    await queryInterface.bulkDelete('notifications', null, {});

    await queryInterface.bulkDelete('tracks', null, {});
  },
};
