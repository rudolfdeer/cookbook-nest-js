import express from 'express';

const { tokenUtils } = require('../utils/token.util');
const { CODE_STATUSES } = require('../constants/code-statuses');
const { MESSAGES } = require('../constants/messages');

const verifyAuthToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (!req.cookies.jwt) {
    console.log('no token');
    res.status(CODE_STATUSES.UNAUTHORISED).send('No token provided.');
  }

  const token = req.cookies.jwt;

  let target;
  if (req.params.id) {
    target = req.params.id;
  }

  try {
    const userPayload = tokenUtils.verifyToken(token);
    req.params = target
      ? {
        ...userPayload,
        token,
        target,
      }
      : {
        ...userPayload,
        token,
      };

    next();
  } catch (err) {
    res.status(CODE_STATUSES.UNAUTHORISED).send(MESSAGES.AUTH.ERROR.UNAUTHORISED);
  }
};

module.exports = {
  verifyAuthToken,
};
