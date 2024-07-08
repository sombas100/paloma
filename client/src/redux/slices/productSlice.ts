import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Config/axiosInstance";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
}

interface ProductState {
    products: Product[];
    product: Product | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    product: null,
    loading: false,
    error: null,
};

export const fetchProducts: any = createAsyncThunk('products/fetchProducts', async () => {
    const { data } = await axiosInstance.get('/products');
    return data;
});

export const fetchProductById: any = createAsyncThunk('products/fetchProductById', async (id: string) => {
    const { data } = await axiosInstance.get(`/products/${id}`);
    return data;
});

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
        .addCase(fetchProducts.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.products = payload;
        })
        .addCase(fetchProducts.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message || 'Failed to fetch products';
        })
        .addCase(fetchProductById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductById.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.product = payload;
        })
        .addCase(fetchProductById.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message || 'Failed to fetch product';
        })
    }
})

export default productSlice.reducer;