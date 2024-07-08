import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    product: string;
    name: string;
    image: string;
    price: number;
    countInStock: number;
    qty: number;
}

interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product);

            if (existItem) {
                state.cartItems = state.cartItems.map(x => 
                    x.product === existItem.product ? item : x
                );
            } else {
                state.cartItems.push(item);
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(x => x.product !== action.payload);
        },
        updateCartItem: (state, action: PayloadAction<{ product: String; qty: number }>) => {
            const { product, qty } = action.payload;
            const existItem = state.cartItems.find(x => x.product === product);

            if (existItem) {
                state.cartItems = state.cartItems.map(x => 
                    x.product === existItem.product ? { ...x, qty } : x
                );
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
        }
    }
});

export const { addToCart, removeFromCart, updateCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


