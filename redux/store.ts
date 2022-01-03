import { configureStore } from '@reduxjs/toolkit';

// import reducers
import optionsReducer from './slices/optionsSlice';
import productsReducer from './slices/productSlice';

export const store = configureStore({
    reducer: {
        options: optionsReducer,
        products: productsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
