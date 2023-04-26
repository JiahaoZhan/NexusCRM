import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { signUpAPI, signInAPI } from "../../utils";

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

export const signUp = createAsyncThunk(
    'user/signUp',
    async (parameters: { email: string, password: string, }, thunkAPI) => {
        try {
            const { data } = await signUpAPI({ email: parameters.email, password: parameters.password })

        } catch (error) {
            console.log(error)
            alert('Fail to signUp. Please try again')
        }
    })

export const signIn = createAsyncThunk(
    'user/signIn',
    async (parameters: { email: string, password: string, }, thunkAPI) => {
        try {
            const { data } = await signInAPI({ email: parameters.email, password: parameters.password })
            // console.log("***Token***", data.token)
            return data.token
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
            state.token = action.payload
            state.loading = false;
            state.error = null;
        },
        [signIn.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [signUp.pending.type]: (state) => {
            state.loading = true;
        },
        [signUp.fulfilled.type]: (state) => {
            state.loading = false;
            state.error = null;
        },
        [signUp.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    }
})

export const { logOut } = userSlice.actions