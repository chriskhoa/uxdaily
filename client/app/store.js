// redux state management
import { configureStore } from "@reduxjs/toolkit";
import users from "../features/userSlice";

export default configureStore({
  reducer: {
    users,
  },
});
