import { configureStore,ThunkAction, Action  } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";

export const store =configureStore({
    reducer:{
        user: userReducer,
    }
});

// Type for the root state
export type RootState = ReturnType<typeof store.getState>;

// Type for the dispatch function
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;