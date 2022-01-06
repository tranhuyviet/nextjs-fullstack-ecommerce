import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
    banned: boolean;
    email: string;
    image?: string;
    name: string;
    role: string;
    token: string;
    _id: string;
    createdAt: string;
}

const initialState = {
    user: <IUser>{},
    isLoggedIn: false,
    isCheckout: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            // state.user = null;
            // state.isLoggedIn = false;
            // state.isCheckout = false;
            state = initialState
        },
        setCheckout: (state, action) => {
            state.isCheckout = action.payload;
        },
    },
});

export const { login, logout, setCheckout } = authSlice.actions;
export default authSlice.reducer;
