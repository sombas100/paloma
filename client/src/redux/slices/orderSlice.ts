import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Config/axiosInstance";

interface OrderItem {
    name: string;
    qty: number;
    price: number;
    product: string;
}

interface Order {
    _id: string;
    orderItems: OrderItem[];
    paymentMethod: string;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: string;
    isDelivered: boolean;
    deliveredAt?: string;
}

interface OrderState {
    orders: Order[];
    order: Order | null;
    loading: boolean;
    error: string| null;
}

const initialState: OrderState = {
    orders: [],
    order: null,
    loading: false,
    error: null,
};

export const createOrder: any = createAsyncThunk('orders/createOrder', async (order: Order) => {
    const { data } = await axiosInstance.post('/api/orders', order);
    return data;
});

export const fetchUserorders: any = createAsyncThunk('orders/fetchUserOrders', async () => {
    const { data } = await axiosInstance.get('/orders/myorders');
    return data;
})

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.orders.push(payload);
            })
            .addCase(createOrder.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message || 'Failed to create order';
            })
            .addCase(fetchUserorders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserorders.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.orders = payload;
            })
            .addCase(fetchUserorders.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message || 'Failed to fetch orders';
            });
    },
});

export default orderSlice.reducer;