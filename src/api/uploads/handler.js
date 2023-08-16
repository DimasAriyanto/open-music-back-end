const autoBind = require('auto-bind');

class UploadsHandler {
  constructor(uploadsService, albumsService, validator) {
    this._uploadsService = uploadsService;
    this._albumsService = albumsService;
    this._validator = validator;

    autoBind(this);
  }

  async postUploadCoverAlbumHandler(request, h) {
    const { albumId } = request.params;
    await this._albumsService.verifyAlbum(albumId);

    const { cover } = request.payload;
    this._validator.validateCoverHeaders(cover.hapi.headers);

    await this._uploadsService.writeFile(cover, cover.hapi, albumId);

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
    });
    response.code(201);
    return response;
  }
}

module.exports = UploadsHandler;
