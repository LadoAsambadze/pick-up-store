import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Type {
  loading: boolean;
}

const initialState: Type = {
  loading: true,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,

  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
