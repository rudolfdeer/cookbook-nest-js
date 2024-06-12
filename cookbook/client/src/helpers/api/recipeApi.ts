import SERVER_URL from '../../constants/serverUrl';
import {
  IRecipe, IRecipeRequestBody,
} from '../../interfaces';

const base = `${SERVER_URL}/api`;
const recipesUrl = `${base}/recipes/`;

class RecipeApi {
  async getUsersCreatedRecipes(userId: number) {
    const recipes = await this.getAllRecipes();
    const filteredRecipes = recipes.filter((el: IRecipe) => el.UserId === userId);
    return filteredRecipes;
  }

  async getAllRecipes() {
    const response = await fetch(`${recipesUrl}`, {
      credentials: 'include',
    });
    const result = await response.json();
    return result;
  }

  async createRecipe(data: FormData) {
    const response = await fetch(`${recipesUrl}`, {
      method: 'POST',
      body: data,
      credentials: 'include',
    });

    const result = await response.json();
    return result;
  }

  async commentRecipe(recipeId: number, text: string) {
    const body = {
      text,
      date: new Date().toString(),
    };
    const response = await fetch(`${recipesUrl}${recipeId}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const result = await response.json();
    return result;
  }

  async updateRecipe(recipeId: number, data: IRecipeRequestBody) {
    const {
      title,
      description,
      directions,
      ingredients,
      views,
      likeUserIds,
    } = data;

    const body = {
      title,
      description,
      directions: directions.split(','),
      ingredients: ingredients.split(','),
      views,
      likeUserIds,
    };

    const response = await fetch(`${recipesUrl}${recipeId}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const result = await response.json();
    return result;
  }

  async deleteRecipe(id: number) {
    await fetch(`${recipesUrl}${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
  }

  async likeRecipe(recipeId: number) {
    const response = await fetch(`${recipesUrl}${recipeId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const result = await response.json();
    return result;
  }

  async updateRecipesImage(id: number, data: FormData) {
    const response = await fetch(`${recipesUrl}${id}/image`, {
      method: 'POST',
      body: data,
      credentials: 'include',
    });

    const result = await response.json();
    return result;
  }
}

export default new RecipeApi();
