import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  validateLogin,
  updateUser,
  deleteUser,
  addMistake,
} from "../data/users";

export const loginThunk = createAsyncThunk(
  "users/login",
  async ({ email, password }) => {
    const user = await validateLogin(email, password);
    return user;
  }
);

export const updateUserThunk = createAsyncThunk(
  "users/update",
  async ({ user, token }) => {
    const { id, ...userData } = user;
    const updatedUser = await updateUser(id, userData, token);
    return updatedUser;
  }
);

export const deleteUserThunk = createAsyncThunk(
  "users/delete",
  async ({ user, token }) => {
    const { id } = user;
    await deleteUser(id, token);
  }
);

export const addMistakeThunk = createAsyncThunk(
  "users/addMistake",
  async ({ userId, exerciseId, lessonId, token }) => {
    const updatedUser = await addMistake(userId, exerciseId, lessonId, token);
    return updatedUser;
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      // Preserve JWT token when updating user
      state.user = { ...action.payload, jwt: state.user.jwt };
    });
    builder.addCase(deleteUserThunk.fulfilled, (state, action) => {
      state.user = null;
    });
    builder.addCase(addMistakeThunk.fulfilled, (state, action) => {
      // Preserve JWT token when adding mistake
      state.user = { ...action.payload, jwt: state.user.jwt };
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
