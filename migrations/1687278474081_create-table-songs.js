/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      notNull: true,
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
    album_id: {
      type: 'VARCHAR(50)',
      notNUll: true,
    },
  });

  pgm.addConstraint('songs', 'fk_songs.album_id_albums.id', 'FOREIGN KEY(album_id) REFERENCES albums(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('songs');
};
