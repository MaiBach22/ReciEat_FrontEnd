export const SET_RECIPES = "SET_RECIPES";
export const SELECTED_RECIPE = "SELECTED_RECIPE";

export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const SET_ALERT = "SET_ALERT";

export interface Recipes {
  title: string;
  imgUrl: string;
  id: any;
  likes: number;
  preptime: string;
  cooktime: string;
  serving: string;
  tags: Tags[];
}

interface Tags {
  title: string;
  id: any;
}

interface Instructions {
  id: any;
  content: string;
}

interface Ingredients {
  id: any;
  amount: string;
  measure: string;
  text: string;
}

interface NewIngredients {
  amount: string;
  measure: string;
  text: string;
}

interface Comments {
  username: string;
  content: string;
}

export interface RecipeData extends Recipes {
  title: string;
  imgUrl: string;
  id: any;
  likes: number;
  preptime: string;
  cooktime: string;
  serving: string;
  tags: Tags[];
  ingredients: Ingredients[];
  instructions: Instructions[];
  comments: Comments[];
}

export interface RecipeNew {
  title: string;
  imgUrl: string;
  id: any;
  likes: number;
  preptime: string;
  cooktime: string;
  serving: string;
  recipetags: Tags[];
  ingredients: Ingredients[];
  instructions: Instructions[];
  comments: Comments[];
}

export interface TagData {
  id: any;
  title: string;
  recipes: Recipes[];
}

export interface RecipeError {
  cod: string;
  message: string;
}

export interface UserLogin {
  id: any;
  email?: string;
  username: string;
  token: any;
  loading: boolean;
  error: string;
}

export interface SignupState {
  token: string;
  loading: boolean;
  error: string;
}

export interface RecipeState {
  data: Recipes[];
  loading: boolean;
  error: string;
  selectedRecipe: RecipeData;
  searchResult: RecipeData[];
  selectedTags: TagData;
  newRecipe: RecipeNew;
  tags: Tags[];
}

interface SetRecipeAction {
  type: typeof SET_RECIPES;
  payload: RecipeData[];
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

export type RecipeAction = SetRecipeAction | SetLoadingAction | SetErrorAction;

export interface AlertAction {
  type: typeof SET_ALERT;
  payload: string;
}

export interface AlertState {
  message: string;
}
