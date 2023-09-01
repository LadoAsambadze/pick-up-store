import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Type {
  favourites: string[];
}

const initialState: Type = {
  favourites: [],
};

const favouriteSlice = createSlice({
  name: "favourites",
  initialState,

  reducers: {
    setFavourites: (state, action: PayloadAction<string>) => {
      state.favourites.push(action.payload);
    },
  },
});

export const { setFavourites } = favouriteSlice.actions;

export default favouriteSlice.reducer;
