import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface UserIdState {
  userId: string;
  name: string;
}
const initialState: UserIdState = {
  userId: "",
  name: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (
      state,
      action: PayloadAction<{ name: string; userId: string }>
    ) => {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
    },
  },
});
export const { setUserId } = userSlice.actions;
export default userSlice.reducer;
