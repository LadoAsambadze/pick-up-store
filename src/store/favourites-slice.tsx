import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Type {
  favourites: [];
}

const initialState: Type = {
  favourites: [],
};

const favouriteSlice = createSlice({
  name: "favourites",
  initialState,

  reducers: {
    setFavourites: (state, action: PayloadAction<[]>) => {
      state.favourites = action.payload;
    },
  },
});

export const { setFavourites } = favouriteSlice.actions;

export default favouriteSlice.reducer;
