const { ExternalError } = require('./external.error');
const { InternalError } = require('./internal.error');
const { AuthError } = require('./auth.error');

export interface IError {
  status: number;
  message: string;
}

module.exports = {
  ExternalError,
  InternalError,
  AuthError,
};
