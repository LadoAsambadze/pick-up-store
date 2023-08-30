import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Type {
  userinfo: object | null;
}

const initialState: Type = {
  userinfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<object | null>) => {
      state.userinfo = action.payload;
    },
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
