import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Type {
  search: string | null;
}

const initialState: Type = {
  search: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,

  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
