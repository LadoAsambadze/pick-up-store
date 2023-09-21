import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Type {
  activeOrders: string[];
  sentOrders: string[];
}

const initialState: Type = {
  activeOrders: [],
  sentOrders: [],
};

const orders = createSlice({
  name: "orders",
  initialState,

  reducers: {
    setActiveOrders: (state, action: PayloadAction<string[]>) => {
      state.activeOrders = action.payload;
    },
    setSentOrders: (state, action: PayloadAction<string[]>) => {
      state.sentOrders = action.payload;
    },
  },
});

export const { setActiveOrders, setSentOrders } = orders.actions;
export default orders.reducer;
