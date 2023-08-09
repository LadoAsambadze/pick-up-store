import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import filterSlice from "./filter-slice";
import searchSlice from "./search-slice";
import createTransform from "redux-persist/es/createTransform";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    createTransform((inboundedState, key) => {
      if (key === "search") {
        return undefined;
      }
      return inboundedState;
    }),
  ],
};

const rootReducer = combineReducers({
  filter: filterSlice,
  search: searchSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
