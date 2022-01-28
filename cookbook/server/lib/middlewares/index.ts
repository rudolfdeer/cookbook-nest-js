const bodyParser = require('body-parser');
const { verifyAuthToken } = require('./auth.middleware');

const middlewares = {
  bodyParser,
  verifyAuthToken,
};

module.exports = {
  middlewares,
};
