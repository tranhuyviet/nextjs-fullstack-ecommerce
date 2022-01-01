// category, variant, size store
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICategory {
    _id?: string;
    name: string;
    global?: string;
}

export interface IVariant {
    _id?: string;
    name: string;
    colorHex: string;
    global?: string;
}

export interface ISize {
    _id?: string;
    name: string;
    global?: string;
}

export interface IProductFilter {
    page: number;
    limit: number;
    name?: string;
    category?: string;
    variant?: string;
    size?: string;
}

interface IOptions {
    categories: ICategory[];
    variants: IVariant[];
    sizes: ISize[];
    filter: IProductFilter;
}

const initialState: IOptions = {
    categories: [],
    variants: [],
    sizes: [],
    filter: {
        page: 1,
        limit: 9,
        name: '',
        category: '',
        variant: '',
        size: '',
    },
};

const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        updateCategory: (state, action) => {
            const category = state.categories.find(
                (category) => category._id === action.payload._id
            );
            if (category) category.name = action.payload.name;
        },
        setVariants: (state, action) => {
            state.variants = action.payload;
        },
        updateVariant: (state, action) => {
            const variant = state.variants.find(
                (variant) => variant._id === action.payload._id
            );
            if (variant) {
                variant.name = action.payload.name;
                variant.colorHex = action.payload.colorHex;
            }
        },
        setSizes: (state, action) => {
            state.sizes = action.payload;
        },
        updateSize: (state, action) => {
            const size = state.sizes.find(
                (size) => size._id === action.payload._id
            );
            if (size) size.name = action.payload.name;
        },
        setFilter: (state, action) => {
            console.log('action payload:', action.payload);

            if (action.payload.category)
                state.filter.category = action.payload.category;
            else state.filter.category = '';

            if (action.payload.variant)
                state.filter.variant = action.payload.variant;
            else state.filter.variant = '';

            if (action.payload.size) state.filter.size = action.payload.size;
            else state.filter.size = '';

            // action.payload.category
            //     ? (state.filter.category = action.payload.category)
            //     : (state.filter.category = undefined);

            // action.payload.variant
            //     ? (state.filter.variant = action.payload.variant)
            //     : (state.filter.variant = undefined);

            // action.payload.size
            //     ? (state.filter.size = action.payload.size)
            //     : (state.filter.size = undefined);

            // if (action.payload.category === '') {
            //     state.filter = { ...state.filter, category: '' };
            // } else {
            //     state.filter = {
            //         ...state.filter,
            //         category: action.payload.category,
            //     };
            // }
            // if (action.payload.variant)
            //     state.filter.variant = action.payload.variant;
            // if (action.payload.size) state.filter.size = action.payload.size;
            // else state.filter.category = '';
            // if (action.payload.variant)
            //     state.filter.variant = action.payload.variant;
            // if (action.payload.size) state.filter.size = action.payload.size;
        },
    },
});

export const {
    setCategories,
    updateCategory,
    setVariants,
    updateVariant,
    setSizes,
    updateSize,
    setFilter,
} = optionsSlice.actions;
export default optionsSlice.reducer;
