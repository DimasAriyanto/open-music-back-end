const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylistHandler,
    options: {
      auth: 'open_music_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.getPlaylistsHandler,
    options: {
      auth: 'open_music_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}',
    handler: handler.getPlaylistByIdHandler,
    options: {
      auth: 'open_music_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: handler.deletePlaylistHandler,
    options: {
      auth: 'open_music_jwt',
    },
  },
  {
    method: 'POST',
    path: '/playlists/{playlistId}/songs',
    handler: handler.postSongToPlaylistHandler,
    options: {
      auth: 'open_music_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{playlistId}/songs',
    handler: handler.getSongsInPlaylistHandler,
    options: {
      auth: 'open_music_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}/songs',
    handler: handler.deleteSongFromPlaylistHandler,
    options: {
      auth: 'open_music_jwt',
    },
  },
  {
    method: 'GET',
    path: '/users',
    handler: handler.getUsersByUsernameHandler,
  },
];

module.exports = routes;
