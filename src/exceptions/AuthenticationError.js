const ClintError = require('./ClientError');

class AuthenticationError extends ClintError {
  constructor(message) {
    super(message, 401);
    this.name = 'AuthenticationsError';
  }
}

module.exports = AuthenticationError;
