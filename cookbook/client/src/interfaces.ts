export interface IState {
  recipes: IRecipe[];
  cookbooks: ICookbook[];
  user: IUser | null;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  image: string;
  bio: string;
  Recipe_Saveds?: IRecipeSaved[];
  Cookbook_Saveds?: ICookbookSaved[];
}

export interface IRecipe {
  id: number;
  title: string;
  description: string;
  image: string;
  directions: string[];
  ingredients: string[];
  time: number;
  views: number;
  UserId: number;
  User: IUser;
  Recipe_Comments: IRecipeComment[];
  Recipe_Likes: IRecipeLike[];
}

export interface ICookbook {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  views: number;
  UserId: number;
  User: IUser;
  Recipe_Cookbooks: IRecipeCookbook[];
  Cookbook_Comments: ICookbookComment[];
  Cookbook_Likes: ICookbookLike[];
}

export interface IRecipeLike {
  RecipeId: number;
  UserId: number;
}

export interface IRecipeComment {
  id: number;
  text: string;
  date: string;
  RecipeId: number;
  UserId: number;
  User?: IUser;
}

export interface IRecipeSaved {
  RecipeId: number;
  UserId: number;
  Recipe?: IRecipe;
}

export interface IRecipeCookbook {
  RecipeId: number;
  CookbookId: number;
  Recipe: IRecipe;
}

export interface ICookbookLike {
  CookbookId: number;
  UserId: number;
}

export interface ICookbookSaved {
  CookbookId: number;
  UserId: number;
  Cookbook?: ICookbook;
}

export interface ICookbookComment {
  id: number;
  text: string;
  date: string;
  CookbookId: number;
  UserId: number;
  User?: IUser;
}

export interface IRecipeRequestBody {
  title: string;
  description: string;
  ingredients: string;
  directions: string;
  time?: number;
  views?:number;
  likeUserIds?: number[];
}

export interface ICookbookRequestBody {
  title: string;
  description: string;
  recipesIds: number[];
  tags?: string[];
  views?: number;
  likeUserIds?: number[];
  image?: File;
}

export interface IUserRequestBody {
  name?: string;
  photo?: string;
  bio?: string;
  savedRecipesIds?: number[];
  savedCookbooksIds?: number[];
}

export interface IAuthRequestBody {
  email: string;
  password: string;
}

export interface ISearchListItem {
  id: number;
  name: string;
}

export interface ISignUpForm {
  email: string;
  password: string;
  confirm: string;
}
