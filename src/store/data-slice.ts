import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Type {
  data: Item[];
}

const initialState: Type = {
  data: [],
};
const dataSlice = createSlice({
  name: "data",
  initialState,

  reducers: {
    setData: (state, action: PayloadAction<Item[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;

interface Item {
  _id: string;
  type: string;
  gender: string;
  category: string;
  price: number;
  brand: string;
  name: string;
  itemList: {
    own_id: string;
    color: string;
    urls: string[];
    size: {
      size: string;
      quantityt: number;
    };
  }[];
  new: boolean;
}
