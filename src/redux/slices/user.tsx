import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export interface UserState {
    loading: boolean,
    error: string | null;
    token: string | null;
}

const initialState: UserState = {
    loading: false,
    error: null,
    token: null,
}

export const signIn = createAsyncThunk(
   'user/signIn',
    async (parameters: { email: string, password: string,}, thunkAPI) => {
        try {
            const { data } = await axios.post(
                "http://localhost:8088/auth/signIn", {
                    email: parameters.email,
                    password: parameters.password
                }
            )                      
            return data.resData.token
        } catch (error) {
            console.log(error)
            alert('Fail to sign in. Please try again')
        }
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logOut: (state) => {
            state.token = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: {
        [signIn.pending.type]: (state) => {
            state.loading = true;
        },
        [signIn.fulfilled.type]: (state, action) => {
            console.log(action)
            state.token = action.payload;
            state.loading = false;
            state.error = null;
        },
        [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})

export const { logOut } = userSlice.actions