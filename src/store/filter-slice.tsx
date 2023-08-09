import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  filter: boolean;
  priceAmount: number[];
  genderType: string | null;
  categoryType: string | null;
  brandType: string | null;
  sizeType: string | null;
}

const initialState: FilterState = {
  filter: false,
  priceAmount: [0, 100],
  genderType: null,
  categoryType: null,
  brandType: null,
  sizeType: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<boolean>) => {
      state.filter = action.payload;
    },
    setPriceAmount: (state, action: PayloadAction<number[]>) => {
      state.priceAmount = action.payload;
    },
    setGenderType: (state, action: PayloadAction<string>) => {
      state.genderType = action.payload;
    },
    setCategoryType: (state, action: PayloadAction<string>) => {
      state.categoryType = action.payload;
    },
    setBrandType: (state, action: PayloadAction<string>) => {
      state.brandType = action.payload;
    },
    setSizeType: (state, action: PayloadAction<string>) => {
      state.sizeType = action.payload;
    },
  },
});

export const {
  setFilter,
  setPriceAmount,
  setGenderType,
  setCategoryType,
  setBrandType,
  setSizeType,
} = filterSlice.actions;
export default filterSlice.reducer;
