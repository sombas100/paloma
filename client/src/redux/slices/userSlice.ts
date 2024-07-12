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

export const login: any = createAsyncThunk('user/login', async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post('/users/login', { email, password });
        localStorage.setItem('userInfo', JSON.stringify(data));
        return data; 
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            return rejectWithValue('Invalid Credentials')
        }
        return rejectWithValue(error.message);
    }
});

export const register: any = createAsyncThunk('user/register', async ({ name, email, password}: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post('/users/register', { 
            name, 
            email, 
            password,
            isAdmin: false 
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
        return data;
    } catch (error: any) {
        if (error.response) {
            return rejectWithValue(error.response.data.message || 'Registration failed')
        }
        return rejectWithValue(error.message)
    }
    
});

export const logout: any = createAsyncThunk('user/logout', async () => {
    localStorage.removeItem('userInfo');
    return null;
})

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
        .addCase(login.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload as string;
        })
        .addCase(logout.fulfilled, (state) => {
            state.userInfo = null;
        })
        .addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(register.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
        })
        .addCase(register.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload as string;
        })
    },
});

export default userSlice.reducer;