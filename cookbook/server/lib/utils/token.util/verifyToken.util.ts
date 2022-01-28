const jwt = require('jsonwebtoken');

const { TOKEN } = require('../../constants/auth');

const verifyToken = (token: string) => jwt.verify(token, TOKEN.SECRET);

module.exports = {
  verifyToken,
};
