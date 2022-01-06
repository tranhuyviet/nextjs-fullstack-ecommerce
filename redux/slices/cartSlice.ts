import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import cookie from 'js-cookie'

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

export interface ICart {
    cart: ICartItem[],
    totalItems: number,
    subTotal: number
}

// const cartSaved = JSON.parse(cookie.get('ecommerceCart') as string) as ICart

const initialState: ICart = {
    cart: [],
    totalItems: 0,
    subTotal:0,
};

// const initialState = JSON.parse(cookie.get('ecommerceCart') as string) || initialStateTemp
// console.log(JSON.parse(cookie.get('ecommerceCart') as string))

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
            cookie.set('ecommerceCart', JSON.stringify(state), {expires: 30})
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
            cookie.set('ecommerceCart', JSON.stringify(state), {expires: 30})
        },
        initialCart: (state, action) => {
            if(action.payload){
                state.cart = action.payload.cart
                state.totalItems = action.payload.totalItems
                state.subTotal = action.payload.subTotal
            }
        }
    },
});

export const { addToCart, setQuantity, removeItem ,initialCart} = cartSlice.actions;
export default cartSlice.reducer;
