import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import MentalReducer from "@/features/MentalSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import TemporaryReducer from "@/features/TemporarySlice";
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

const reducers = combineReducers({
  mental: MentalReducer,
  temporary:TemporaryReducer

})
const persistReducers = persistReducer(
  {
    key: 'account',
    storage,
    blacklist:["temporary"]
  },
  reducers,
  
)
const store = configureStore({
  reducer: persistReducers,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    
});
export const persister = persistStore(store);

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

