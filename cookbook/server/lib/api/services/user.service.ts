import { UpdatedUser } from '../data-access/repositories/user.repository';

export {};

const { userRepository } = require('../data-access/repositories');
const { authUtils } = require('../../utils/auth.util');
const { MESSAGES } = require('../../constants/messages');
const { CODE_STATUSES } = require('../../constants/code-statuses');
const { AuthError } = require('../../helpers/errors');

type Auth = {
  email: string;
  password: string;
};

const deleteById = async (id: number) => {
  await userRepository.deleteById(id);
};

const findAll = async () => {
  const response = await userRepository.findAll();
  return response;
};

const findById = async (id: number) => {
  const response = await userRepository.findById(id);
  return response;
};

const update = async (body: UpdatedUser, id: number) => {
  await userRepository.update(body, id);

  const response = await userRepository.findById(id);

  return response;
};

const updatePhoto = async (id: number, photo: File) => {
  await userRepository.updatePhoto(id, photo);

  const response = await userRepository.findById(id);

  return response;
};

const signUp = async (body: Auth) => {
  const { email, password } = body;

  const user = await userRepository.findByEmail(email);

  if (user?.email === email) {
    throw new AuthError({ message: MESSAGES.AUTH.ERROR.EMAIL_EXISTS });
  }

  if (!user) {
    const encryptedPassword = authUtils.encryptPassword(password);

    let createdUser = await userRepository.create({
      email,
      password: encryptedPassword,
    });
    createdUser = createdUser.toJSON();

    const response = await userRepository.findById(createdUser.id);

    const token = authUtils.generateAuthToken({
      email: createdUser.email,
      id: createdUser.id,
    });

    return {
      response,
      token,
    };
  }
};

const signIn = async (body: Auth) => {
  const { email, password } = body;
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new AuthError({ message: MESSAGES.AUTH.ERROR.EMAIL_NOT_EXIST });
  }

  const isPasswordMatched = authUtils.comparePasswords(password, user.password);

  if (!isPasswordMatched) {
    throw new AuthError({ message: MESSAGES.AUTH.ERROR.WRONG_PASSWORD });
  }

  const response = await userRepository.findById(user.id);

  const token = authUtils.generateAuthToken({ email: user.email, id: user.id });

  return {
    response,
    token,
  };
};

const changeEmail = async (email: string, id: number) => {
  const userWithSameEmail = await userRepository.findByEmail(email);

  if (userWithSameEmail) {
    throw new AuthError({
      status: CODE_STATUSES.FORBIDDEN,
      message: MESSAGES.AUTH.ERROR.EMAIL_EXISTS,
    });
  }

  await userRepository.changeEmail(email, id);

  const response = await userRepository.findById(id);

  const token = authUtils.generateAuthToken({
    email: response.email,
    id: response.id,
  });

  return {
    response,
    token,
  };
};

const changePassword = async (password: string, id: number) => {
  if (!password) {
    throw new AuthError({
      status: CODE_STATUSES.FORBIDDEN,
      message: 'No password provided.',
    });
  }
  const encryptedPassword = authUtils.encryptPassword(password);

  const response = await userRepository.changePassword(encryptedPassword, id);

  return response;
};

const userService = {
  findAll,
  deleteById,
  findById,
  update,
  updatePhoto,
  signIn,
  signUp,
  changeEmail,
  changePassword,
};

module.exports = {
  userService,
};
