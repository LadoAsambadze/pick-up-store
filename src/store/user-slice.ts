import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserInfo {
  user: string;
}

interface Type {
  userinfo: UserInfo | null;
}

const initialState: Type = {
  userinfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo | null>) => {
      state.userinfo = action.payload;
    },
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
