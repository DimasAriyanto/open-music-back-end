const autoBind = require('auto-bind');

class PlaylistsHandler {
  constructor(playlistsService, songsService, playlistsValidator, playlistSongsValidator) {
    this._playlistsService = playlistsService;
    this._songsService = songsService;
    this._playlistsValidator = playlistsValidator;
    this._playlistSongsValidator = playlistSongsValidator;

    autoBind(this);
  }

  async postPlaylistHandler(request, h) {
    this._playlistsValidator.validatePlaylistPayload(request.payload);
    const { name } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const playlistId = await this._playlistsService.addPlaylist({
      name, owner: credentialId,
    });

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistsHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const playlists = await this._playlistsService.getPlaylists(credentialId);
    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async getPlaylistByIdHandler(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(id, credentialId);
    const playlist = await this._playlistsService.getPlaylistById(id);

    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async deletePlaylistHandler(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(id, credentialId);
    await this._playlistsService.deletePlaylists(id);

    return {
      status: 'success',
      message: 'Playlists berhasil dihapus',
    };
  }

  async postSongToPlaylistHandler(request, h) {
    this._playlistSongsValidator.validatePlaylistSongPayload(request.payload);
    const { playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._songsService.verifySong(songId);
    const songPlaylistId = await this._playlistsService.addSongToPlaylist({
      playlistId, songId,
    });

    const response = h.response({
      status: 'success',
      message: 'Song berhasil ditambahkan pada playlist',
      data: {
        songPlaylistId,
      },
    });
    response.code(201);
    return response;
  }

  async getSongsInPlaylistHandler(request) {
    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    const playlist = await this._playlistsService.getSongsInPlaylist(playlistId);

    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async deleteSongFromPlaylistHandler(request) {
    this._playlistSongsValidator.validatePlaylistSongPayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { playlistId } = request.params;
    const { songId } = request.payload;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._songsService.verifySong(songId);
    await this._playlistsService.deleteSongFromPlaylists(songId, playlistId);

    return {
      status: 'success',
      message: 'Song berhasil dihapus',
    };
  }

  async getUsersByUsernameHandler(request) {
    const { username = '' } = request.query;
    const users = await this._playlistsService.getUsersByUsername(username);

    return {
      status: 'success',
      data: {
        users,
      },
    };
  }
}

module.exports = PlaylistsHandler;
