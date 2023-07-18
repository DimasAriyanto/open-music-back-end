/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      notNUll: true,
    },
    title: {
      type: 'VARCHAR(255)',
      notNUll: true,
    },
    year: {
      type: 'INTEGER',
      notNUll: true,
    },
    performer: {
      type: 'VARCHAR(255)',
      notNUll: true,
    },
    genre: {
      type: 'VARCHAR(255)',
      notNUll: true,
    },
    duration: {
      type: 'INTEGER',
      notNUll: true,
    },
    albumId: {
      type: 'VARCHAR(50)',
      notNUll: true,
    },
  });

  pgm.addConstraint('songs', 'fk_songs_albums', {
    foreignKeys: {
      columns: 'albumId',
      references: 'albums(id)',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint('songs', 'fk_songs_albums');
  pgm.dropTable('songs');
};
