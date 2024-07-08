import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Config/axiosInstance";

interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    token: string;
}

interface UserState {
    userInfo: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    userInfo: null,
    loading: false,
    error: null,
};

export const login: any = createAsyncThunk('user/login', async ({ email, password }: { email: string; password: string }) => {
    const { data } = await axiosInstance.post('/users/login', { email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
});

export const register: any = createAsyncThunk('user/register', async ({ name, email, password}: { name: string; email: string; password: string }) => {
    const { data } = await axiosInstance.post('/users/register', { name, email, password })
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
        })
        .addCase(login.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message || 'Failed to register user'
        });
    },
});

export default userSlice.reducer;