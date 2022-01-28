import { Comment } from './user.repository';

const db = require('../models');

export {};

const {
  Cookbook,
  CookbookLike,
  User,
  Recipe,
  RecipeCookbook,
  RecipeLike,
  RecipeComment,
  CookbookComment,
} = db;

export type NewCookbook = {
  title: string;
  description: string;
  tags: string;
  recipesIds?: string;
  image?: Express.Multer.File;
};

export type UpdatedCookbook = {
  title: string;
  description: string;
  image: string;
  views: number;
  recipesIds?: number[];
  likeUserIds?: number[];
};

const findAll = async () => {
  const cookbooks = await Cookbook.findAll({
    include: [
      User,
      {
        model: CookbookLike,
      },
      {
        model: CookbookComment,
        include: User,
      },
      {
        model: RecipeCookbook,
        include: {
          model: Recipe,
          include: [
            User,
            {
              model: RecipeLike,
            },
            {
              model: RecipeComment,
              include: {
                model: User,
              },
            },
          ],
        },
      },
    ],
  });

  return cookbooks;
};

const findById = async (id: number) => {
  const cookbook = await Cookbook.findOne({
    where: {
      id,
    },
    include: [
      User,
      {
        model: RecipeCookbook,
        include: {
          model: Recipe,
          include: [
            User,
            {
              model: RecipeLike,
            },
            {
              model: RecipeComment,
              include: {
                model: User,
              },
            },
          ],
        },
      },
      {
        model: CookbookComment,
        include: User,
      },
      {
        model: CookbookLike,
      },
    ],
  });

  return cookbook;
};

const create = async (body: NewCookbook, userId: number) => {
  const {
    title, description, tags, recipesIds, image,
  } = body;

  const cookbook = await Cookbook.create(
    {
      title,
      description,
      tags: tags ? tags.split(',') : [],
      UserId: userId,
    },
    {
      include: User,
    },
  );

  if (image) {
    await cookbook.update({
      image: `images/${image.originalname}`,
    });
  }

  const ids = recipesIds ? recipesIds.split(',').map((el) => Number(el)) : [];
  await cookbook.setRecipes(ids);

  const cookbookId = cookbook.id;

  return cookbookId;
};

const deleteById = async (id: number) => {
  const cookbook = await Cookbook.findOne({
    where: {
      id,
    },
  });
  return cookbook.destroy();
};

const update = async (body: UpdatedCookbook, id: number) => {
  const {
    title, description, image, views, recipesIds,
  } = body;

  const cookbook = await Cookbook.findOne({
    where: {
      id,
    },
  });

  const updatedCookbook = {
    title,
    description,
    image,
    views,
  };

  cookbook.setRecipes(recipesIds);

  return cookbook.update(updatedCookbook, {
    include: CookbookComment,
  });
};

const uploadImage = async (id: number, image: Express.Multer.File) => {
  const cookbook = await Cookbook.findOne({
    where: {
      id,
    },
  });

  const updatedCookbook = {
    image: `images/${image.originalname}`,
  };

  return cookbook.update(updatedCookbook);
};

const like = async (userId: number, id: number) => {
  const cookbook = await Cookbook.findOne({
    where: {
      id,
    },
    include: {
      model: CookbookComment,
      include: User,
    },
  });

  await cookbook.addUsers(userId);

  return cookbook;
};

const dislike = async (userId: number, id: number) => {
  const cookbook = await Cookbook.findOne({
    where: {
      id,
    },
    include: {
      model: CookbookComment,
      include: User,
    },
  });

  await cookbook.removeUsers(userId);

  return cookbook;
};

const createComment = async (
  body: Comment,
  cookbookId: number,
  userId: number,
) => {
  const { text, date } = body;
  const comment = await CookbookComment.create(
    {
      text,
      date,
      UserId: userId,
      CookbookId: cookbookId,
    },
    {
      include: [User, Cookbook],
    },
  );
  await comment.setUser(userId);
  await comment.setCookbook(cookbookId);

  return comment;
};

const cookbookRepository = {
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
  cookbookRepository,
};
