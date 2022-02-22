import ACTION_TYPES from '../../constants/actionTypes';
import { IRecipe, IUser } from '../../interfaces';

class RecipeActions {
  getAll(recipes: IRecipe[]) {
    return {
      type: ACTION_TYPES.RECIPES_GET_ALL,
      payload: {
        recipes,
      },
    };
  }

  sort(recipes: IRecipe[], order: string) {
    return {
      type: ACTION_TYPES.RECIPES_SORT,
      payload: {
        recipes,
        order,
      },
    };
  }

  filter(recipes: IRecipe[], cookingTime: number) {
    return {
      type: ACTION_TYPES.RECIPES_FILTER,
      payload: {
        recipes,
        cookingTime,
      },
    };
  }

  getCreatedRecipes(recipes: IRecipe[]) {
    return {
      type: ACTION_TYPES.RECIPES_GET_USERS_CREATED,
      payload: {
        recipes,
      },
    };
  }

  getUsersSaved(user: IUser) {
    return {
      type: ACTION_TYPES.RECIPES_GET_USERS_SAVED,
      payload: {
        user,
      },
    };
  }

  createComment(recipes: IRecipe[]) {
    return {
      type: ACTION_TYPES.RECIPES_CREATE_COMMENT,
      payload: {
        recipes,
      },
    };
  }

  create(recipes: IRecipe[], userId: number) {
    return {
      type: ACTION_TYPES.RECIPES_CREATE,
      payload: {
        recipes,
        userId,
      },
    };
  }

  update(recipes: IRecipe[], userId: number) {
    return {
      type: ACTION_TYPES.RECIPES_MODIFY,
      payload: {
        recipes,
        userId,
      },
    };
  }

  like(recipes: IRecipe[]) {
    return {
      type: ACTION_TYPES.RECIPES_LIKE,
      payload: {
        recipes,
      },
    };
  }

  delete(recipes: IRecipe[], userId: number) {
    return {
      type: ACTION_TYPES.RECIPES_DELETE,
      payload: {
        recipes,
        userId,
      },
    };
  }
}

export default new RecipeActions();
