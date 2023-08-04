const InvariantError = require('../../exceptions/InvariantError');
const AlbumPayloadSchema = require('./schema');

const AlbumValidator = {
  validateAlbumPayload: (payload) => {
    const validationResult = AlbumPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.message);
    }
  },
};

module.exports = AlbumValidator;
