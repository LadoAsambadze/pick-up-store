import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filter-slice";

const store = configureStore({
  reducer: {
    filter: filterSlice,
    value: filterSlice,
    genderType: filterSlice,
    categoryType: filterSlice,
    brandType: filterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
