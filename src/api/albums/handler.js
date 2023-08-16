const autoBind = require('auto-bind');

class AlbumsHandler {
  constructor(albumsService, usersService, validator) {
    this._albumsService = albumsService;
    this._usersService = usersService;
    this._validator = validator;

    autoBind(this);
  }

  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { name = 'untitled', year } = request.payload;

    const albumId = await this._albumsService.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  async getAlbumsHandler() {
    const albums = await this._albumsService.getAlbums();
    return {
      status: 'success',
      data: {
        albums,
      },
    };
  }

  async getAlbumByIdHandler(request) {
    const { id } = request.params;
    const album = await this._albumsService.getAlbumById(id);

    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  async putAlbumByIdHandler(request) {
    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;
    const { name, year } = request.payload;

    await this._albumsService.editAlbumById(id, { name, year });

    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
    };
  }

  async deleteAlbumByIdHandler(request) {
    const { id } = request.params;
    await this._albumsService.deleteAlbumById(id);

    return {
      status: 'success',
      message: 'Album berhasil dihapus',
    };
  }

  async postLikeAlbumHandler(request, h) {
    const { albumId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    const userId = await this._usersService.verifyUser(credentialId);
    await this._albumsService.verifyAlbum(albumId);

    await this._albumsService.addLike({ userId, albumId });

    const response = h.response({
      status: 'success',
      message: 'Like berhasil ditambahkan',
    });
    response.code(201);
    return response;
  }

  async getLikeAlbumHandler(request, h) {
    const { albumId } = request.params;
    await this._albumsService.verifyAlbum(albumId);

    const totalLikes = await this._albumsService.countTotalLikes(albumId);

    const response = h.response({
      status: 'success',
      data: {
        likes: totalLikes,
      },
    });

    response.header('X-Data-Source', 'cache');

    return response;
  }

  async deleteLikeAlbumHandler(request) {
    const { albumId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    const userId = await this._usersService.verifyUser(credentialId);
    await this._albumsService.verifyAlbum(albumId);

    await this._albumsService.removeLike({ userId, albumId });

    return {
      status: 'success',
      message: 'Like berhasil dihapus',
    };
  }
}

module.exports = AlbumsHandler;
