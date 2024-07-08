import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import cartReducer from './slices/cartSlice';



export const store: any = configureStore({
    reducer: {
        productReducer: productReducer,
        user: userReducer,
        order: orderReducer,
        cart:  cartReducer
    }, 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;