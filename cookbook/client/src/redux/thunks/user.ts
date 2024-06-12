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

export const deleteuser =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    await userApi.deleteuser();

    dispatch(userActions.delete());
  };

export const updateuser =
  (data: IUserRequestBody) =>
  async (dispatch: Dispatch): Promise<void> => {
    await userApi.updateuser(data);
    const user = await userApi.getLoggedInuser();

    dispatch(userActions.update(user));
  };

export const changePassword =
  (password: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    await userApi.changePassword(password);
    const user = await userApi.getLoggedInuser();

    dispatch(userActions.update(user));
  };

export const changeEmail =
  (email: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    await userApi.changeEmail(email);
    const user = await userApi.getLoggedInuser();

    dispatch(userActions.update(user));
  };

export const saveTousersCookbooks =
  (cookbookId: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    const user = await userApi.getLoggedInuser();
    const { Cookbook_Saveds } = user;
    const savedCookbooksIds = Cookbook_Saveds.map((el) => el.CookbookId);
    if (savedCookbooksIds.indexOf(cookbookId) > -1) {
      dispatch(userActions.update(user));
    } else {
      savedCookbooksIds.push(cookbookId);
      await userApi.updateuser({ savedCookbooksIds });
      const updateduser = await userApi.getLoggedInuser();
      dispatch(userActions.update(updateduser));
    }
  };

export const saveTousersRecipes =
  (recipeId: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    const user = await userApi.getLoggedInuser();
    const { Recipe_Saveds } = user;
    const savedRecipesIds = Recipe_Saveds.map((el) => el.RecipeId);
    if (savedRecipesIds.indexOf(recipeId) > -1) {
      dispatch(userActions.update(user));
    } else {
      savedRecipesIds.push(recipeId);
      await userApi.updateuser({ savedRecipesIds });
      const updateduser = await userApi.getLoggedInuser();
      dispatch(userActions.update(updateduser));
    }
  };

export const getLoggedInuser =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    const user = await userApi.getLoggedInuser();

    dispatch(userActions.update(user));
  };

export const updateusersPhoto =
  (data: FormData) =>
  async (dispatch: Dispatch): Promise<void> => {
    const user = await userApi.updateusersPhoto(data);

    dispatch(userActions.updatePhoto(user));
  };
