import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import filterSlice from "./filter-slice";
import searchSlice from "./search-slice";
import loadingSlice from "./loading-slice";
import dataSlice from "./data-slice";

const rootReducer = combineReducers({
  filter: filterSlice,
  search: searchSlice,
  loading: loadingSlice,
  data: dataSlice,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["search", "loading", "data"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["persist/PERSIST"],
    },
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
