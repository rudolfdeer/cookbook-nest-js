import { Comment } from './user.repository';

export {};

const {
  RecipeLike, User, Recipe, RecipeComment,
} = require('../models');

export type NewRecipe = {
  title: string;
  description: string;
  directions: string;
  ingredients: string;
  time: number;
  image: Express.Multer.File;
};

export type UpdatedRecipe = {
  title: string;
  description: string;
  image: string;
  views?: number;
  directions: string[];
  ingredients: string[];
  likeUserIds?: number[];
};

const findAll = async () => {
  const recipes = await Recipe.findAll({
    include: [
      User,
      {
        model: RecipeLike,
      },
      {
        model: RecipeComment,
        include: User,
      },
    ],
  });

  recipes.forEach((el: any) => {
    if (el.image_data) {
      const photo = el.image_data.toString('base64');
      el.image_data = `data:${el.image_type};base64, ${photo}`;
    }
  });

  return recipes;
};

const findById = async (id: number) => {
  const recipe = await Recipe.findOne({
    where: {
      id,
    },
    include: [
      User,
      {
        model: RecipeComment,
        include: User,
      },
      {
        model: RecipeLike,
      },
    ],
  });

  return recipe;
};

const create = async (body: NewRecipe, id: number) => {
  const {
    title, description, directions, ingredients, time, image,
  } = body;
  const recipe = await Recipe.create(
    {
      title,
      description,
      directions: directions ? directions.split(',') : [],
      ingredients: ingredients ? ingredients.split(',') : [],
      time: Number(time),
      UserId: id,
    },
    {
      include: User,
    },
  );

  if (image) {
    await recipe.update({
      image: `images/${image.originalname}`,
    });
  }

  const recipeId = recipe.id;

  return recipeId;
};

const deleteById = async (id: number) => {
  const recipe = await Recipe.findOne({
    where: {
      id,
    },
  });
  return recipe.destroy();
};

const update = async (body: UpdatedRecipe, id: number) => {
  const {
    title,
    description,
    image,
    directions,
    ingredients,
    views,
    likeUserIds,
  } = body;

  const recipe = await Recipe.findOne({
    where: {
      id,
    },
  });

  const updatedRecipe = {
    title,
    description,
    image,
    views,
    directions,
    ingredients,
  };

  await recipe.setUsers(likeUserIds);

  return recipe.update(updatedRecipe, {
    include: RecipeComment,
  });
};

const uploadImage = async (id: number, image: Express.Multer.File) => {
  const recipe = await Recipe.findOne({
    where: {
      id,
    },
  });

  const updatedRecipe = {
    image: `images/${image.originalname}`,
  };

  return recipe.update(updatedRecipe);
};

const like = async (userId: number, id: number) => {
  const recipe = await Recipe.findOne({
    where: {
      id,
    },
    include: {
      model: RecipeComment,
      include: User,
    },
  });

  await recipe.addUsers(userId);

  return recipe;
};

const dislike = async (userId: number, id: number) => {
  const recipe = await Recipe.findOne({
    where: {
      id,
    },
    include: {
      model: RecipeComment,
      include: User,
    },
  });

  await recipe.removeUsers(userId);

  return recipe;
};

const createComment = async (
  body: Comment,
  recipeId: number,
  userId: number,
) => {
  const { text, date } = body;

  const comment = await RecipeComment.create(
    {
      text,
      date,
      UserId: userId,
      RecipeId: recipeId,
    },
    {
      include: [User, Recipe],
    },
  );

  return comment;
};

const recipeRepository = {
  findAll,
  create,
  deleteById,
  findById,
  update,
  uploadImage,
  createComment,
  like,
  dislike,
};

module.exports = {
  recipeRepository,
};
