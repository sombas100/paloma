import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Config/axiosInstance";
import { Product } from "../../types";

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

export const fetchProducts: any = createAsyncThunk<Product[]>(
    'products/fetchProducts',
    async () => {
        try {
            const { data } = await axiosInstance.get('/products');
            return data;
        } catch (error) {
            throw Error('Failed to fetch products');
        }
    }
);

export const fetchProductById: any = createAsyncThunk<Product, string>(
    'products/fetchProductById',
    async (id) => {
        try {
            const { data } = await axiosInstance.get(`/products/${id}`);
            return data;
        } catch (error) {
            throw Error('Failed to fetch product');
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                // Update a single product in the products array
                const index = state.products.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch product';
            });
    },
});

export const selectShoes = (state: ProductState) => state.products.slice(24, 34);
export const selectAccessories = (state: ProductState) => state.products.slice(34, 44);

export default productSlice.reducer;
