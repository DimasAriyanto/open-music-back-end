const autoBind = require('auto-bind');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const {
      title = 'untitled', year, performer, genre, duration, albumId,
    } = request.payload;

    const songId = await this._service.addSong({
      title, year, performer, genre, duration, albumId,
    });

    const response = h.response({
      status: 'success',
      message: 'Song berhasil ditambahkan',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  }

  async getSongsHandler() {
    const songs = await this._service.getSongs();
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(request) {
    const { id } = request.params;
    const song = await this._service.getSongById(id);

    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  async putSongByIdHandler(request) {
    this._validator.validateSongPayload(request.payload);
    const { id } = request.params;
    const {
      title, year, performer, genre, duration,
    } = request.payload;

    await this._service.editSongById(id, {
      title, year, performer, genre, duration,
    });

    return {
      status: 'success',
      message: 'Song berhasil diperbarui',
    };
  }

  async deleteSongByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteSongById(id);

    return {
      status: 'success',
      message: 'Song berhasil dihapus',
    };
  }

  async getSongsByTitleHandler(request) {
    const { title = '' } = request.query;
    const songs = await this._service.getSongsByTitle(title);

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongsByPerformerHandler(request) {
    const { performer = '' } = request.query;
    const songs = await this._service.getSongsByPerformer(performer);

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongsByTitleAndPerformerHandler(request) {
    const { title = '', performer = '' } = request.query;
    const songs = await this._service.getSongsByTitleAndPerformer(title, performer);

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }
}

module.exports = SongsHandler;
