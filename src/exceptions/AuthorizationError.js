const ClintError = require('./ClientError');

class AuthorizationError extends ClintError {
  constructor(message) {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

module.exports = AuthorizationError;
