import { configureStore } from '@reduxjs/toolkit';

// import reducers
import optionsReducer from './slices/optionsSlice';
import productsReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
    reducer: {
        options: optionsReducer,
        products: productsReducer,
        cart: cartReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
