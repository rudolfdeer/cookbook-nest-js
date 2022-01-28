import express from 'express';
import { IError } from '../../helpers/errors';

const { cookbookService } = require('../services');
const { CODE_STATUSES } = require('../../constants/code-statuses');

const findAll = async (req: express.Request, res: express.Response) => {
  try {
    const response = await cookbookService.findAll();
    res.status(CODE_STATUSES.OK).send(response);
  } catch (err) {
    res.status(CODE_STATUSES.SERVER_ERROR).send(`${err}`);
  }
};

const create = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const cookbook = {
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
    recipesIds: req.body.recipesIds,
    image: req.file,
  };

  try {
    const response = await cookbookService.create(cookbook, id);
    res.status(CODE_STATUSES.OK).send(response);
  } catch (err) {
    res.status(CODE_STATUSES.SERVER_ERROR).send(`${err}`);
  }
};

const deleteById = async (req: express.Request, res: express.Response) => {
  const { id, target } = req.params;
  try {
    await cookbookService.deleteById(id, target);
    res.status(CODE_STATUSES.OK).send('cookbook deleted');
  } catch (err) {
    const error = err as IError;
    res.status(error.status).send(error.message);
  }
};

const findById = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  try {
    const response = await cookbookService.findById(id);
    res.status(CODE_STATUSES.OK).send(response);
  } catch (err) {
    res.status(CODE_STATUSES.SERVER_ERROR).send(`${err}`);
  }
};

const update = async (req: express.Request, res: express.Response) => {
  const cookbook = req.body;
  const { target, id } = req.params;
  try {
    const response = await cookbookService.update(cookbook, target, id);
    res.status(CODE_STATUSES.OK).send(response);
  } catch (err) {
    const error = err as IError;
    res.status(error.status).send(error.message);
  }
};

const uploadImage = async (req: express.Request, res: express.Response) => {
  const image = req.file;
  const { target } = req.params;

  try {
    const response = await cookbookService.uploadImage(target, image);
    res.status(CODE_STATUSES.OK).send(response);
  } catch (err) {
    res.status(CODE_STATUSES.SERVER_ERROR).send(`${err}`);
  }
};

const like = async (req: express.Request, res: express.Response) => {
  const { target, id } = req.params;
  try {
    const response = await cookbookService.like(id, target);
    res.status(CODE_STATUSES.OK).send(response);
  } catch (err) {
    const error = err as IError;
    res.status(error.status).send(error.message);
  }
};

const createComment = async (req: express.Request, res: express.Response) => {
  const comment = req.body;
  const { id, target } = req.params;
  try {
    const response = await cookbookService.createComment(comment, target, id);
    res.status(CODE_STATUSES.OK).send(response);
  } catch (err) {
    res.status(CODE_STATUSES.SERVER_ERROR).send(`${err}`);
  }
};

const cookbookController = {
  findAll,
  create,
  deleteById,
  findById,
  update,
  uploadImage,
  createComment,
  like,
};

module.exports = {
  cookbookController,
};
