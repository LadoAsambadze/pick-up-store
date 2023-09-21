import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Type {
  activeOrders: activeOrdersType[];
  sentOrders: sentOrdersType[];
}

const initialState: Type = {
  activeOrders: [],
  sentOrders: [],
};

const orders = createSlice({
  name: "orders",
  initialState,

  reducers: {
    setActiveOrders: (state, action: PayloadAction<activeOrdersType[]>) => {
      state.activeOrders = action.payload;
    },
    setSentOrders: (state, action: PayloadAction<sentOrdersType[]>) => {
      state.sentOrders = action.payload;
    },
  },
});

export const { setActiveOrders, setSentOrders } = orders.actions;
export default orders.reducer;

interface activeOrdersType {
  user: string;
  orderItems: OrderItem[];
  createdAt: string;
}
interface OrderItem {
  name: string;
  size: string;
  amount: string | number;
  price: number;
  image: string;
  purchase_id: string;
  fullName: string;
  city: string;
  address: string;
  phoneNumber: number;
}

interface sentOrdersType {
  user: string;
  orderItems: OrderItem[];
  createdAt: string;
}
