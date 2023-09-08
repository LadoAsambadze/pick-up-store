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
import userSlice from "./user-slice";
import extraSlice from "./extra-slice";
import favouritesSlice from "./favourites-slice";
import { deleteCookie } from "cookies-next";

const rootReducer = combineReducers({
  filter: filterSlice,
  search: searchSlice,
  loading: loadingSlice,
  data: dataSlice,
  user: userSlice,
  extra: extraSlice,
  favourites: favouritesSlice,
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

const EXPIRATION_TIME_IN_MINUTES = 1;
const expirationDate = new Date(
  new Date().getTime() + EXPIRATION_TIME_IN_MINUTES * 60 * 1000
);
localStorage.setItem("expirationDate", expirationDate.toString());

const storedExpirationDate = localStorage.getItem("expirationDate");
if (storedExpirationDate) {
  const currentDate = new Date();
  if (currentDate > new Date(storedExpirationDate)) {
    deleteCookie("token");
    persistor.pause();
    persistor.flush().then(() => {
      persistor.purge().then(() => {});
    });
  }
}

export default store;
