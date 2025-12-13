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
  async (user) => {
    const { id, ...userData } = user;
    const updatedUser = await updateUser(id, userData);
    return updatedUser;
  }
);

export const deleteUserThunk = createAsyncThunk(
  "users/delete",
  async (user) => {
    const { id } = user;
    await deleteUser(id);
  }
);

export const addMistakeThunk = createAsyncThunk(
  "users/addMistake",
  async ({ userId, exerciseId, lessonId }) => {
    const updatedUser = await addMistake(userId, exerciseId, lessonId);
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
    builder.addCase(deleteUserThunk.fulfilled, (state, action) => {
      state.user = null;
    });
    builder.addCase(addMistakeThunk.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;
