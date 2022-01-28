export {};

const {
  User,
  RecipeSaved,
  CookbookSaved,
  Recipe,
  Cookbook,
  RecipeCookbook,
  RecipeLike,
  RecipeComment,
  CookbookComment,
  CookbookLike,
} = require('../models');

export type UpdatedUser = {
  name?: string;
  photo?: string;
  bio?: string;
  savedRecipesIds?: number[];
  savedCookbooksIds?: number[];
};

export type NewUser = {
  email: string;
  password: string;
};

export type Comment = {
  text: string;
  date: string;
};

const findAll = async () => {
  const users = User.findAll({
    attributes: { exclude: ['password', 'bio', 'email'] },
  });

  return users;
};

const findById = async (id: number) => {
  const user = await User.findOne({
    where: {
      id,
    },
    include: [
      {
        model: RecipeSaved,
        include: {
          model: Recipe,
          include: [{
            model: User,
          }, RecipeLike, RecipeComment],
        },
      },
      {
        model: CookbookSaved,
        include: {
          model: Cookbook,
          include: [
            {
              model: User,
            }, CookbookComment, CookbookLike,
            {
              model: RecipeCookbook,
              include: {
                model: Recipe,
                include: [
                  {
                    model: User,
                  },
                  {
                    model: RecipeComment,
                  },
                  {
                    model: RecipeLike,
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  });

  return user;
};

const deleteById = async (id: number) => {
  const user = await User.findOne({
    where: {
      id,
    },
  });
  return user.destroy();
};

const update = async (body: UpdatedUser, id: number) => {
  const user = await User.findOne({
    where: {
      id,
    },
  });

  if (body.name && body.bio) {
    const {
      name, bio,
    } = body;

    const updatedUser = {
      name,
      bio,
    };

    await user.update(updatedUser);
  }

  if (body.savedCookbooksIds) {
    await user.setCookbooks(body.savedCookbooksIds);
  }

  if (body.savedRecipesIds) {
    await user.setRecipes(body.savedRecipesIds);
  }

  const result = await User.findOne({
    where: {
      id,
    },
    include: [RecipeSaved, CookbookSaved],
  });

  const photo = result.image_data.toString('base64');
  result.image_data = `data:${result.image_type};base64, ${photo}`;
  return result;
};

const updatePhoto = async (id: number, photo: Express.Multer.File) => {
  const user = await User.findOne({
    where: {
      id,
    },
  });

  const updatedUser = {
    image: `images/${photo.originalname}`,
  };

  await user.update(updatedUser);

  const result = await User.findOne({
    where: {
      id,
    },
    include: [RecipeSaved, CookbookSaved],
  });

  return result;
};

const create = async (body: NewUser) => {
  const { email, password } = body;

  const user = await User.create({
    email,
    password,
  });
  return user;
};

const findByEmail = async (email: string) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  return user;
};

const changeEmail = async (email: string, id: number) => {
  const user = await User.findOne({
    where: {
      id,
    },
  });

  await user.update({
    email,
  });

  return user;
};

const changePassword = async (password: string, id: number) => {
  const user = await User.findOne({
    where: {
      id,
    },
  });

  await user.update({
    password,
  });

  return user;
};

const userRepository = {
  deleteById,
  findAll,
  findById,
  update,
  updatePhoto,
  create,
  findByEmail,
  changeEmail,
  changePassword,
};

module.exports = {
  userRepository,
};
