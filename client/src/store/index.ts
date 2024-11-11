import { configureStore } from "@reduxjs/toolkit";

export const store =configureStore({
    reducer:{

    }
});

// Type for the root state
export type RootState = ReturnType<typeof store.getState>;

// Type for the dispatch function
export type AppDispatch = typeof store.dispatch;