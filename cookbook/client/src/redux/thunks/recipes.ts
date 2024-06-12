import { Dispatch } from 'redux';
import recipeApi from '../../helpers/api/recipeApi';
import userApi from '../../helpers/api/userApi';
import { IRecipeRequestBody } from '../../interfaces';
import recipeActions from '../actions/recipe';

export const getAllRecipes =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    const recipes = await recipeApi.getAllRecipes();
    dispatch(recipeActions.getAll(recipes));
  };

export const sortRecipes =
  (order: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    const recipes = await recipeApi.getAllRecipes();
    dispatch(recipeActions.sort(recipes, order));
  };

export const filterRecipes =
  (cookingTime: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    const recipes = await recipeApi.getAllRecipes();
    dispatch(recipeActions.filter(recipes, cookingTime));
  };

export const getusersCreatedRecipes =
  (userId: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    const recipes = await recipeApi.getusersCreatedRecipes(userId);
    dispatch(recipeActions.getCreatedRecipes(recipes));
  };

export const getusersSavedRecipes =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    const user = await userApi.getLoggedInuser();

    dispatch(recipeActions.getusersSaved(user));
  };

export const createComment =
  (recipeId: number, text: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    await recipeApi.commentRecipe(recipeId, text);

    const recipes = await recipeApi.getAllRecipes();

    dispatch(recipeActions.createComment(recipes));
  };

export const createRecipe =
  (data: FormData, userId: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    await recipeApi.createRecipe(data);

    const recipes = await recipeApi.getAllRecipes();

    dispatch(recipeActions.create(recipes, userId));
  };

export const modifyRecipe =
  (recipeId: number, data: IRecipeRequestBody, userId: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    await recipeApi.updateRecipe(recipeId, data);
    const recipes = await recipeApi.getAllRecipes();

    dispatch(recipeActions.update(recipes, userId));
  };

export const updateRecipesImage =
  (recipeId: number, data: FormData, userId: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    await recipeApi.updateRecipesImage(recipeId, data);
    const recipes = await recipeApi.getAllRecipes();

    dispatch(recipeActions.update(recipes, userId));
  };

export const deleteRecipe =
  (recipeId: number, userId: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    await recipeApi.deleteRecipe(recipeId);
    const recipes = await recipeApi.getAllRecipes();

    dispatch(recipeActions.delete(recipes, userId));
  };

export const likeRecipe =
  (recipeId: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    await recipeApi.likeRecipe(recipeId);
    const recipes = await recipeApi.getAllRecipes();

    dispatch(recipeActions.like(recipes));
  };
