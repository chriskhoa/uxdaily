import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { validateLogin, updateUser } from "../data/users";

export const loginThunk = createAsyncThunk(
  "users/login",
  async ({ email, password }) => {
    const user = await validateLogin(email, password);
    return user;
  }
);

export const updateUserThunk = createAsyncThunk(
  "users/update",
  async (user) => {
    const { id, ...userData } = user;
    const updatedUser = await updateUser(id, userData);
    return updatedUser;
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});
