import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  filter: boolean;
  priceAmount: number[];
  genderType: string[];
  categoryType: string[];
  brandType: string | null;
  sizeType: string[];
  sortType: string | null;
}

const initialState: FilterState = {
  filter: false,
  priceAmount: [0, 100],
  genderType: [],
  categoryType: [],
  brandType: null,
  sizeType: [],
  sortType: null,
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
      const selectedGender = action.payload;
      const index = state.genderType.indexOf(selectedGender);

      if (index !== -1) {
        state.genderType.splice(index, 1);
      } else {
        state.genderType.push(selectedGender);
      }
    },
    setCategoryType: (state, action: PayloadAction<string>) => {
      const selectedCategory = action.payload;
      const index = state.categoryType.indexOf(selectedCategory);
      if (index !== -1) {
        state.categoryType.splice(index, 1);
      } else {
        state.categoryType.push(selectedCategory);
      }
    },
    setBrandType: (state, action: PayloadAction<string>) => {
      state.brandType = action.payload;
    },
    setSizeType: (state, action: PayloadAction<string>) => {
      const selectedSize = action.payload;
      if (state.sizeType.includes(selectedSize)) {
        state.sizeType = state.sizeType.filter((size) => size !== selectedSize);
      } else {
        state.sizeType.push(selectedSize);
      }
    },
    setSortType: (state, action: PayloadAction<string>) => {
      state.sortType = action.payload;
    },
    resetFilter: () => initialState,
  },
});

export const {
  setFilter,
  setPriceAmount,
  setGenderType,
  setCategoryType,
  setBrandType,
  setSizeType,
  resetFilter,
  setSortType,
} = filterSlice.actions;
export default filterSlice.reducer;
