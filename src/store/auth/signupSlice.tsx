import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SignupState } from "../type";
import { RootState } from "..";
import { useSelector } from "react-redux";
import { apiUrl } from "../../config/constants";
const initialState: SignupState = {
  token: "",
  loading: false,
  error: "",
};

interface signUpBody {
  username: string;
  email: string;
  password: string;
}

export const fetchAsyncSignUp = createAsyncThunk(
  "users/fetchAsyncSignUp",
  async (body: signUpBody) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/signup`, body);
      console.log(res.data);
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

// export const getUserWithStoredToken = createAsyncThunk(
//   "users/getUserWithStoredToken",
//   async () => {
//     // get token from the state

//     const token = useSelector(getToken);

//     // if we have no token, stop
//     if (token === null) return;

//     try {
//       // if we do have a token,
//       // check wether it is still valid or if it is expired
//       const response = await axios.get(`${apiUrl}/auth/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//     } catch (e) {
//       if (e.response) {
//         console.log(e.response.message);
//       } else {
//         console.log(e);
//       }
//     }
//   }
// );

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncSignUp.pending, (state) => {
      console.log("pending");
      state.loading = true;
    });
    builder.addCase(fetchAsyncSignUp.fulfilled, (state, { payload }) => {
      console.log("Fetching Sucessfully");
      console.log(payload);

      if (!payload.succes) {
        state.error = payload.data;
        state.loading = false;
      } else {
        state.token = payload.data.token;
        console.log("succes");
        state.loading = false;
      }
    });
    builder.addCase(fetchAsyncSignUp.rejected, (state, action) => {
      console.log("Fetch was rejected");
      state.loading = false;
    });
  },
});

export default signupSlice.reducer;
export const getError = (state: RootState) => state.newUsers;
export const getToken = (state: RootState) => state.newUsers.token;
