import {
  NewRecipe,
  UpdatedRecipe,
} from '../data-access/repositories/recipe.repository';
import { Comment } from '../data-access/repositories/user.repository';

export {};

const { recipeRepository } = require('../data-access/repositories');
const { MESSAGES } = require('../../constants/messages');
const { CODE_STATUSES } = require('../../constants/code-statuses');
const { AuthError } = require('../../helpers/errors');

const findAll = async () => {
  const response = await recipeRepository.findAll();
  return response;
};

const create = async (body: NewRecipe, userId: number) => {
  const id = await recipeRepository.create(body, userId);
  const response = await recipeRepository.findById(id);
  return response;
};

const deleteById = async (recipeId: number, userId: number) => {
  const recipe = await recipeRepository.findById(recipeId);

  if (recipe.UserId !== userId) {
    throw new AuthError({
      status: CODE_STATUSES.FORBIDDEN,
      message: MESSAGES.AUTH.ERROR.OTHER_USER,
    });
  }

  await recipeRepository.deleteById(recipeId);
};

const findById = async (id: number) => {
  const response = await recipeRepository.findById(id);
  return response;
};

const update = async (
  body: UpdatedRecipe,
  recipeId: number,
  userId: number,
) => {
  const recipe = await recipeRepository.findById(recipeId);

  if (recipe.UserId !== userId) {
    throw new AuthError({
      status: CODE_STATUSES.FORBIDDEN,
      message: MESSAGES.AUTH.ERROR.OTHER_USER,
    });
  }

  await recipeRepository.update(body, recipeId);
  const response = await recipeRepository.findById(recipeId);

  return response;
};

const uploadImage = async (
  recipeId: number,
  image: File,
) => {
  await recipeRepository.uploadImage(recipeId, image);
  const response = await recipeRepository.findById(recipeId);

  return response;
};

interface IUser {
  id: number;
}

const like = async (
  userId: number,
  recipeId: number,
) => {
  const recipe = await recipeRepository.findById(recipeId);
  const likeUsers = await recipe.getUsers();
  const likeUserIds = likeUsers.map((el: IUser) => el.id);

  if (likeUserIds.indexOf(userId) === -1) {
    await recipeRepository.like(userId, recipeId);
  } else {
    await recipeRepository.dislike(userId, recipeId);
  }

  const response = recipeRepository.findById(recipeId);
  return response;
};

const createComment = async (
  body: Comment,
  recipeId: number,
  userId: number,
) => {
  const response = await recipeRepository.createComment(body, recipeId, userId);
  return response;
};

const recipeService = {
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
  recipeService,
};
