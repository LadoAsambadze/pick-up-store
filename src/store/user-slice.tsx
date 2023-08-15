import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Type {
  username: string | null;
}

const initialState: Type = {
  username: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.username = action.payload;
    },
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
