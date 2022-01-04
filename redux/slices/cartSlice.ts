import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICartItem {
    _id: string;
    name: string;
    image: string;
    price: number;
    discount: number;
    quantity: number;
    variant: string;
    size: string;
}

const initialState = {
    cart: <ICartItem[]>[],
    totalItems: 0,
    subTotal: 0,
};

function calculate(cart: ICartItem[]) {
    let totalItems = 0;
    let subTotal = 0;
    for (let item of cart) {
        totalItems = totalItems + item.quantity;
        subTotal =
            Math.round((subTotal + item.price * item.quantity) * 1e2) / 1e2;
    }

    return {
        totalItems,
        subTotal,
    };
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICartItem>) => {
            const isExist = state.cart.find(
                (item) => item._id === action.payload._id
            );
            // if product already exists in cart -> only plus quantity
            if (isExist) {
                isExist.quantity++;
            } else {
                state.cart = [...state.cart, action.payload];
            }

            const cal = calculate(state.cart);
            state.totalItems = cal.totalItems;
            state.subTotal = cal.subTotal;
        },
        setQuantity: (state, action) => {
            const product = state.cart.find(
                (product) => product._id === action.payload._id
            ) as ICartItem;
            product.quantity = action.payload.quantity * 1;

            const cal = calculate(state.cart);
            state.totalItems = cal.totalItems;
            state.subTotal = cal.subTotal;
        },
        removeItem: (state, action) => {
            console.log(action.payload);
            const items = state.cart.filter(
                (item) => item._id !== action.payload
            );
            state.cart = [...items];
            const cal = calculate(state.cart);
            state.totalItems = cal.totalItems;
            state.subTotal = cal.subTotal;
        },
    },
});

export const { addToCart, setQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
