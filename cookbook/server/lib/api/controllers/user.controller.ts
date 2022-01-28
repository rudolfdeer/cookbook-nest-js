import express from 'express';
import { IError } from '../../helpers/errors';

const { userService } = require('../services');
const { CODE_STATUSES } = require('../../constants/code-statuses');

const findAll = async (req: express.Request, res: express.Response) => {
  try {
    const response = await userService.findAll();
    res.status(CODE_STATUSES.OK).send(response);
  } catch (err) {
    const error = err as IError;
    res.status(error.status).send(error.message);
  }
};

const deleteById = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  try {
    await userService.deleteById(id);
    res.clearCookie('jwt');
    res.status(CODE_STATUSES.OK).send('user deleted');
  } catch (err) {
    res.status(CODE_STATUSES.SERVER_ERROR).send(`${err}`);
  }
};

const findById = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  try {
    const response = await userService.findById(id);
    res.status(CODE_STATUSES.OK).send(response);
  } catch (err) {
    const error = err as IError;
    res.status(error.status).send(error.message);
  }
};

const update = async (req: express.Request, res: express.Response) => {
  const photo = req.file;

  const user = req.body;
  const { id } = req.params;
  try {
    const response = await userService.update(user, id, photo);
    res.status(CODE_STATUSES.OK).send(response);
  } catch (err) {
    res.status(CODE_STATUSES.SERVER_ERROR).send(`${err}`);
  }
};

const updatePhoto = async (req: express.Request, res: express.Response) => {
  const photo = req.file;
  const { id } = req.params;

  try {
    const response = await userService.updatePhoto(id, photo);
    res.status(CODE_STATUSES.OK).send(response);
  } catch (err) {
    res.status(CODE_STATUSES.SERVER_ERROR).send(`${err}`);
  }
};

const signUp = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  try {
    const { token, response } = await userService.signUp({
      email,
      password,
    });
    res.cookie('jwt', token, { httpOnly: false });
    res.status(CODE_STATUSES.OK).send(response);
  } catch (err) {
    const error = err as IError;
    res.status(error.status).send(error.message);
  }
};

const signIn = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  try {
    const { token, response } = await userService.signIn({
      email,
      password,
    });
    res.cookie('jwt', token, { httpOnly: true });
    res.status(CODE_STATUSES.OK).send(response);
  } catch (err) {
    const error = err as IError;
    res.status(error.status).send(error.message);
  }
};

const signOut = async (req: express.Request, res: express.Response) => {
  try {
    console.log('1');
    res.clearCookie('jwt');
    res.status(CODE_STATUSES.OK).send('logged out');
  } catch (err) {
    const error = err as IError;
    res.status(error.status).send(error.message);
  }
};

const changeEmail = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const { token, response } = await userService.changeEmail(email, id);
    res.cookie('jwt', token, { httpOnly: true });
    res.status(CODE_STATUSES.OK).send(response);
  } catch (err) {
    const error = err as IError;
    res.status(error.status).send(error.message);
  }
};

const changePassword = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const response = await userService.changePassword(password, id);
    res.status(CODE_STATUSES.OK).send(response);
  } catch (err) {
    const error = err as IError;
    res.status(error.status).send(error.message);
  }
};

const userController = {
  findAll,
  deleteById,
  findById,
  update,
  updatePhoto,
  signUp,
  signIn,
  signOut,
  changeEmail,
  changePassword,
};

module.exports = {
  userController,
};
