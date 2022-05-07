import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../../config/constants";
import { RootState } from "../..";
import { RecipeState } from "../../type";

interface Ingredient {
  id: string;
  amount: string;
  measure: string;
  text: string;
}

interface Instruction {
  id: string;
  content: string;
}

interface Tags {
  tagId: string;
}

interface body {
  title: string;
  imgUrl: string;
  preptime: string;
  cooktime: string;
  serving: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  recipetags: Tags[];
}

export const fetchAsyncRecipes = createAsyncThunk(
  "recipes/fetchAsyncRecipes",
  async () => {
    const res = await axios.get(`${apiUrl}/recipes`);
    return res.data;
  }
);

export const fetchAsyncTags = createAsyncThunk(
  "recipes/fetchAsyncTags",
  async () => {
    const res = await axios.get(`${apiUrl}/recipes/tags`);

    return res.data;
  }
);

export const fetchAsyncRecipeDetail = createAsyncThunk(
  "recipes/fetchAsyncRecipeDetail",
  async (id: any) => {
    const res = await axios.get(`${apiUrl}/recipes/${id}`);
    return res.data;
  }
);

export const fetchAsyncLikes = createAsyncThunk(
  "recipes/fetchAsyncLikes",
  async (like: number, thunkApi) => {
    const state: any = thunkApi.getState();
    console.log("state", state);
    // const token = state.user.token;
    // const likestate:number = state.recipes.selectedRecipe.likes;

    const id = state.recipes.selectedRecipe.id;
    console.log("hello");
    try {
      const res = await axios.patch(`${apiUrl}/recipes/${id}`, {
        likes: like,
      });
      console.log("like", res.data.likes);

      thunkApi.dispatch(addLikes(res.data.likes));

      return res.data;
    } catch (e: any) {
      console.log(e.message);
    }
  }
);

export const fetchAsyncComments = createAsyncThunk(
  "recipes/fetchAsyncComments",
  async (comment: string, thunkApi) => {
    const state: any = thunkApi.getState();
    console.log("state", state);
    const token = state.user.token;
    const username: string = state.user.username;

    const id = state.recipes.selectedRecipe.id;
    console.log("hello");
    try {
      const res = await axios.post(
        `${apiUrl}/${id}/comment`,
        {
          username: username,
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("end", res.data.comment);

      thunkApi.dispatch(addComments(res.data.comment));

      return res.data;
    } catch (e: any) {
      console.log(e.message);
    }
  }
);

export const fetchAsyncTagsDetail = createAsyncThunk(
  "recipes/fetchAsyncTagsDetail",
  async (id: any) => {
    const res = await axios.get(`${apiUrl}/tags/${id}`);
    return res.data;
  }
);

export const fetchAsyncNewRecipe = createAsyncThunk(
  "recipes/fetchAsyncNewRecipe",
  async (bodynewrecipe: body, thunkApi) => {
    const state: any = thunkApi.getState();
    console.log("state", state);
    const token = state.user.token;
    const userId: string = state.user.userId;

    //const ingredients: Array<Ingredientsrecipe> = state.recipes.newIngredients;
    try {
      console.log("end", bodynewrecipe.title);
      const res = await axios.post(
        `${apiUrl}/recipes/postrecipe`,
        {
          title: bodynewrecipe.title,
          imgUrl: bodynewrecipe.imgUrl,
          preptime: bodynewrecipe.preptime,
          cooktime: bodynewrecipe.cooktime,
          serving: bodynewrecipe.serving,
          ingredients: bodynewrecipe.ingredients,
          instructions: bodynewrecipe.instructions,
          userId: userId,
          recipetags: bodynewrecipe.recipetags,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("end1", bodynewrecipe);
      thunkApi.dispatch(addRecipe(res.data));
      return res.data;
    } catch (error: any) {
      if (error.response) {
        console.log("Error in thunk");
        return { data: error.response.data, succes: false };
      } else {
        throw error;
      }
    }
  }
);

const initialState: RecipeState = {
  data: [
    {
      title: "",
      imgUrl: "",
      id: 0,
      likes: 0,
      preptime: "",
      cooktime: "",
      serving: "",
      tags: [],
    },
  ],
  loading: false,
  error: "",
  selectedRecipe: {
    title: "",
    imgUrl: "",
    id: 0,
    likes: 0,
    preptime: "",
    cooktime: "",
    serving: "",
    tags: [],
    ingredients: [],
    instructions: [],
    comments: [{ username: "", content: "" }],
  },
  selectedTags: {
    id: 0,
    title: "",
    recipes: [
      {
        title: "",
        imgUrl: "",
        id: 0,
        likes: 0,
        preptime: "",
        cooktime: "",
        serving: "",
        tags: [],
      },
    ],
  },
  searchResult: [],
  newRecipe: {
    title: "",
    imgUrl: "",
    id: 0,
    likes: 0,
    preptime: "",
    cooktime: "",
    serving: "",
    ingredients: [],
    instructions: [],
    recipetags: [],
    comments: [{ username: "", content: "" }],
  },
  tags: [
    {
      id: 0,
      title: "",
    },
  ],
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    listingRecipes: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    },
    listingResult: (state, { payload }) => {
      state.searchResult = payload;
      state.loading = false;
    },
    removeListing: (state) => {
      state.data = [];
      state.loading = false;
    },
    addLikes: (state, { payload }) => {
      state.selectedRecipe.likes = payload;
    },
    addComments: (state, { payload }) => {
      state.selectedRecipe.comments.push(payload);
    },
    addRecipe: (state, { payload }) => {
      state.newRecipe = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncRecipes.pending, () => {
      console.log("pending");
    });
    builder.addCase(fetchAsyncRecipes.fulfilled, (state, { payload }) => {
      console.log("Fetched Sucessfully");
      return { ...state, data: payload };
    });
    builder.addCase(fetchAsyncRecipes.rejected, () => {
      console.log("Fetched Unsucessfully");
    });
    builder.addCase(fetchAsyncRecipeDetail.fulfilled, (state, { payload }) => {
      console.log("Fetched Sucessfully");
      console.log("d", payload);
      return { ...state, selectedRecipe: payload };
    });

    builder.addCase(fetchAsyncTagsDetail.fulfilled, (state, { payload }) => {
      console.log("Fetched Sucessfully");
      return { ...state, selectedTags: payload };
    });
    builder.addCase(fetchAsyncNewRecipe.fulfilled, (state, { payload }) => {
      console.log("Fetched Sucessfully");
      return { ...state, newRecipe: payload };
    });
    builder.addCase(fetchAsyncTags.fulfilled, (state, { payload }) => {
      console.log("Fetched Sucessfully");
      return { ...state, tags: payload };
    });
  },
});

export const { listingRecipes } = recipeSlice.actions;
export const { listingResult } = recipeSlice.actions;
export const { addLikes } = recipeSlice.actions;
export const { addComments } = recipeSlice.actions;
export const { addRecipe } = recipeSlice.actions;
export const { removeListing } = recipeSlice.actions;

export const getAllReciTags = (state: RootState) =>
  state.recipes.selectedTags.recipes;

export const getTagsRec = (state: RootState) => state.recipes.selectedTags;

export const getAllRecipes = (state: RootState) => state.recipes.data;
export const getRecipeDetail = (state: RootState) =>
  state.recipes.selectedRecipe;

export const getIngredients = (state: RootState) =>
  state.recipes.selectedRecipe.ingredients;

export const getInstructions = (state: RootState) =>
  state.recipes.selectedRecipe.instructions;

export const getTags = (state: RootState) => state.recipes.selectedRecipe.tags;
export const getComments = (state: RootState) =>
  state.recipes.selectedRecipe.comments;

export const getResult = (state: RootState) => state.recipes.searchResult;
export const getLikes = (state: RootState) =>
  state.recipes.selectedRecipe.likes;
export const getAllTags = (state: RootState) => state.recipes.tags;
export default recipeSlice.reducer;
