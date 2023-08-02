import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  boolean: boolean;
}

const initialState: FilterState = {
  boolean: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<boolean>) => {
      state.boolean = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
