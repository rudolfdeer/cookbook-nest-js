import {
  NewCookbook,
  UpdatedCookbook,
} from '../data-access/repositories/cookbook.repository';
import { Comment } from '../data-access/repositories/user.repository';

export {};

const { cookbookRepository } = require('../data-access/repositories');
const { MESSAGES } = require('../../constants/messages');
const { CODE_STATUSES } = require('../../constants/code-statuses');
const { AuthError } = require('../../helpers/errors');

const findAll = async () => {
  const response = await cookbookRepository.findAll();
  return response;
};

const create = async (body: NewCookbook, userId: number) => {
  const id = await cookbookRepository.create(body, userId);
  const response = await cookbookRepository.findById(id);
  return response;
};

const deleteById = async (userId: number, cookbookId: number) => {
  const cookbook = await cookbookRepository.findById(cookbookId);

  if (cookbook.UserId !== userId) {
    throw new AuthError({
      status: CODE_STATUSES.FORBIDDEN,
      message: MESSAGES.AUTH.ERROR.OTHER_USER,
    });
  }

  await cookbookRepository.deleteById(cookbookId);
};

const findById = async (id: number) => {
  const response = await cookbookRepository.findById(id);
  return response;
};

const update = async (
  body: UpdatedCookbook,
  cookbookId: number,
  userId: number,
) => {
  const cookbook = await cookbookRepository.findById(cookbookId);

  if (cookbook.UserId !== userId) {
    throw new AuthError({
      status: CODE_STATUSES.FORBIDDEN,
      message: MESSAGES.AUTH.ERROR.OTHER_USER,
    });
  }

  await cookbookRepository.update(body, cookbookId);
  const response = cookbookRepository.findById(cookbookId);
  return response;
};

const uploadImage = async (
  cookbookId: number,
  image: File,
) => {
  await cookbookRepository.uploadImage(cookbookId, image);
  const response = await cookbookRepository.findById(cookbookId);

  return response;
};

interface IUser {
  id: number;
}

const like = async (
  userId: number,
  cookbookId: number,
) => {
  const cookbook = await cookbookRepository.findById(cookbookId);
  const likeUser = await cookbook.getUsers();
  const likeUserIds = likeUser.map((el: IUser) => el.id);

  if (likeUserIds.indexOf(userId) === -1) {
    await cookbookRepository.like(userId, cookbookId);
  } else {
    await cookbookRepository.dislike(userId, cookbookId);
  }

  const response = cookbookRepository.findById(cookbookId);
  return response;
};

const createComment = async (
  body: Comment,
  cookbookId: number,
  userId: number,
) => {
  const response = await cookbookRepository.createComment(
    body,
    cookbookId,
    userId,
  );
  return response;
};

const cookbookService = {
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
  cookbookService,
};
