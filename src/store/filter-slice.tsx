import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  filter: boolean;
  value: number[];
  genderType: string | null;
  categoryType: string | null;
  brandType: string | null;
}

const initialState: FilterState = {
  filter: false,
  value: [20, 37],
  genderType: null,
  categoryType: null,
  brandType: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<boolean>) => {
      state.filter = action.payload;
    },
    setValue: (state, action: PayloadAction<number[]>) => {
      state.value = action.payload;
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
  },
});

export const {
  setFilter,
  setValue,
  setGenderType,
  setCategoryType,
  setBrandType,
} = filterSlice.actions;
export default filterSlice.reducer;
