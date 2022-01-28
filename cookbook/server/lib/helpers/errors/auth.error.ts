export {};

const { MESSAGES } = require('../../constants/messages');
const { CODE_STATUSES } = require('../../constants/code-statuses');

const { ExternalError } = require('./external.error');

class AuthError extends ExternalError {
  constructor({ message = MESSAGES.AUTH.ERROR.BASE_ERROR, status = CODE_STATUSES.UNAUTHORISED } = {}) {
    super({ message, status });
  }
}

module.exports = {
  AuthError,
};
