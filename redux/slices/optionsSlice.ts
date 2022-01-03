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
            state.filter.page = action.payload.page;

            state.filter.limit = action.payload.limit;

            if (action.payload.category)
                state.filter.category = action.payload.category;
            else state.filter.category = '';

            if (action.payload.variant)
                state.filter.variant = action.payload.variant;
            else state.filter.variant = '';

            if (action.payload.size) state.filter.size = action.payload.size;
            else state.filter.size = '';

            if (action.payload.name) state.filter.name = action.payload.name;
            else state.filter.name = '';
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
