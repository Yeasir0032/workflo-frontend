import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DrawerState {
  isOpen: boolean;
  status: TaskStatus;
  editData?: {
    priority: Priority;
    index: number;
    title: string;
    details: string;
    createdAt: number;
    deadline: string;
  };
}
const initialState: DrawerState = {
  isOpen: false,
  status: "",
};
export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer(
      state,
      action: PayloadAction<{
        status: TaskStatus;
        editData?: {
          priority: Priority;
          title: string;
          index: number;
          details: string;
          createdAt: number;
          deadline: string;
        };
      }>
    ) {
      state.isOpen = true;
      if (action) state.status = action.payload.status;
      if (action.payload.editData) state.editData = action.payload.editData;
    },
    closeDrawer(state) {
      state.isOpen = false;
    },
    toggleDrawer(state) {
      state.isOpen = !state.isOpen;
    },
    createTask(state, action: PayloadAction<TaskItem>) {
      //TODO: Handle adding task here
    },
  },
});
export const { openDrawer, closeDrawer, toggleDrawer, createTask } =
  drawerSlice.actions;
export default drawerSlice.reducer;
