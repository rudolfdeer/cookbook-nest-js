import { Dispatch } from 'redux';
import userApi from '../../helpers/api/userApi';
import { IAuthRequestBody, IUserRequestBody } from '../../interfaces';
import userActions from '../actions/user';

export const signIn =
  (data: IAuthRequestBody) =>
  async (dispatch: Dispatch): Promise<void> => {
    const user = await userApi.signIn(data);

    dispatch(userActions.signIn(user));
  };

export const signUp =
  (data: IAuthRequestBody) =>
  async (dispatch: Dispatch): Promise<void> => {
    const user = await userApi.signUp(data);

    dispatch(userActions.signUp(user));
  };

export const signOut =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    await userApi.signOut();

    dispatch(userActions.signOut());
  };

export const deleteUser =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    await userApi.deleteUser();

    dispatch(userActions.delete());
  };

export const updateUser =
  (data: IUserRequestBody) =>
  async (dispatch: Dispatch): Promise<void> => {
    await userApi.updateUser(data);
    const user = await userApi.getLoggedInUser();

    dispatch(userActions.update(user));
  };

export const changePassword =
  (password: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    await userApi.changePassword(password);
    const user = await userApi.getLoggedInUser();

    dispatch(userActions.update(user));
  };

export const changeEmail =
  (email: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    await userApi.changeEmail(email);
    const user = await userApi.getLoggedInUser();

    dispatch(userActions.update(user));
  };

export const saveToUsersCookbooks =
  (cookbookId: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    const user = await userApi.getLoggedInUser();
    const { Cookbook_Saveds } = user;
    const savedCookbooksIds = Cookbook_Saveds.map((el) => el.CookbookId);
    if (savedCookbooksIds.indexOf(cookbookId) > -1) {
      dispatch(userActions.update(user));
    } else {
      savedCookbooksIds.push(cookbookId);
      await userApi.updateUser({ savedCookbooksIds });
      const updatedUser = await userApi.getLoggedInUser();
      dispatch(userActions.update(updatedUser));
    }
  };

export const saveToUsersRecipes =
  (recipeId: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    const user = await userApi.getLoggedInUser();
    const { Recipe_Saveds } = user;
    const savedRecipesIds = Recipe_Saveds.map((el) => el.RecipeId);
    if (savedRecipesIds.indexOf(recipeId) > -1) {
      dispatch(userActions.update(user));
    } else {
      savedRecipesIds.push(recipeId);
      await userApi.updateUser({ savedRecipesIds });
      const updatedUser = await userApi.getLoggedInUser();
      dispatch(userActions.update(updatedUser));
    }
  };

export const getLoggedInUser =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    const user = await userApi.getLoggedInUser();

    dispatch(userActions.update(user));
  };

export const updateUsersPhoto =
  (data: FormData) =>
  async (dispatch: Dispatch): Promise<void> => {
    const user = await userApi.updateUsersPhoto(data);

    dispatch(userActions.updatePhoto(user));
  };
