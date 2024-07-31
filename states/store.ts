import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from "./Drawer-controller";
import LoadingReducer from "./LoadingSlice";
import TaskDataReducer from "./TasksDataSlice";
import UserSlice from "./UserSlice";
export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    loading: LoadingReducer,
    tasksData: TaskDataReducer,
    userState: UserSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
