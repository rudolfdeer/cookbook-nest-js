export {};

const { CODE_STATUSES } = require('../../constants/code-statuses');
const { MESSAGES } = require('../../constants/messages');

class ExternalError {
  message: string;

  status: number;

  constructor({
    message = MESSAGES.SERVER.ERROR.BASE_ERROR,
    status = CODE_STATUSES.SERVER_ERROR,
  } = {}) {
    this.message = message;
    this.status = status;
  }
}

module.exports = {
  ExternalError,
};
