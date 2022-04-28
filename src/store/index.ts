import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type RootState = ReturnType<typeof rootReducer>;

const Store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof Store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default Store;
