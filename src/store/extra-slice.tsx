import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Type {
  amount: number | null;
  auth: boolean;
}
const initialState: Type = {
  amount: null,
  auth: false,
};

const extraSlice = createSlice({
  name: "extra",
  initialState,

  reducers: {
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
  },
});
export const { setAmount, setAuth } = extraSlice.actions;
export default extraSlice.reducer;
