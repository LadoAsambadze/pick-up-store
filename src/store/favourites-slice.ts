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
    removeFavourite: (state, action: PayloadAction<string>) => {
      const index = state.favourites.indexOf(action.payload);
      if (index !== -1) {
        state.favourites.splice(index, 1);
      }
    },
  },
});

export const { setFavourites, removeFavourite } = favouriteSlice.actions;

export default favouriteSlice.reducer;
