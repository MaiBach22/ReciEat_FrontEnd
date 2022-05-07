import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { apiUrl } from "../../config/constants";
import { UserLogin } from "../type";

const initialState: UserLogin = {
  id: "",
  email: "",
  username: "",
  token: localStorage.getItem("token"),
  loading: false,
  error: "",
};

interface logInBody {
  email: string;
  password: string;
}

export const fetchAsyncLogIn = createAsyncThunk(
  "users/fetchAsyncLogIn",
  async (body: logInBody, thunkApi) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/login`, body);
      console.log("login", res.data);

      thunkApi.dispatch(loginSuccess(res.data));
      return { data: res.data, succes: true };
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

export const fetchAsyncUserWithStoredToken = createAsyncThunk(
  "users/fetchAsyncUserWithStoredToken",
  async (dispatch, thunkApi) => {
    const state: any = thunkApi.getState();
    console.log("state in Check", state);
    const token = selectToken(state);
    console.log("tokenstate", token);
    if (token === "" || null) return;
    try {
      const res = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      thunkApi.dispatch(tokenStillValid(res.data));

      return { data: res.data, succes: true };
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state, { payload }) => {
      localStorage.setItem("token", payload.token);
      // console.log("payload", payload.token);
      return { ...state, ...payload };
    },
    tokenStillValid: (state, { payload }) => {
      return { ...state, ...payload };
    },
    logOut: () => {
      localStorage.removeItem("token");
      return { ...initialState, token: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogIn.pending, (state) => {
      console.log("pending");
      state.loading = true;
    });
    builder.addCase(fetchAsyncLogIn.fulfilled, (state, { payload }) => {
      console.log("Fetching Sucessfully");
      console.log(payload);

      if (!payload.succes) {
        state.error = payload.data;
        state.loading = false;
      } else {
        state.username = payload.data.username;
        console.log("succes");
        state.loading = false;
      }
    });
  },
});

export default loginSlice.reducer;
export const { loginSuccess } = loginSlice.actions;
export const { tokenStillValid } = loginSlice.actions;
export const { logOut } = loginSlice.actions;
export const selectUser = (state: RootState) => state.user;

export const selectToken = (state: RootState) => state.user.token;
export const selectUsername = (state: RootState) => state.user.username;
