import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  filter: boolean;
  value: number[];
}

const initialState: FilterState = {
  filter: false,
  value: [20, 37],
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
  },
});

export const { setFilter, setValue } = filterSlice.actions;
export default filterSlice.reducer;
