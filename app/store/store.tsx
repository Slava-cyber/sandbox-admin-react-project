import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import newReducer from "./slice";

export const store = configureStore({
    reducer: {
        slice: newReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;