import { configureStore } from '@reduxjs/toolkit';

// import reducers
import optionsReducer from './slices/optionsSlice';

export const store = configureStore({
    reducer: {
        options: optionsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
