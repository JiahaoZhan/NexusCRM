import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { addTaskAPI } from "../../utils";

export interface Task {
    title: String,
    gmt_expire: Number,
    content: String,
}

export interface TaskState {
    loading: boolean,
    tasks: Task[]
    error: string | null
}

const initialState: TaskState = {
    loading: false,
    tasks: [],
    error: null
}

export const addTask = createAsyncThunk(
    "task/addTask",
    async(parameters: {jwt: string | null, task: Task}, thunkAPI) => {
        try {
            addTaskAPI({jwt: parameters.jwt, task: parameters.task})
            .then(res=>{
                console.log(res)
                return res
            })               
        } catch (error) {
            console.log(error)
            alert('Fail to add task. Please try again')
        }
    }
)

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},
    extraReducers: {
        [addTask.pending.type]: (state) => {
            state.loading = true;
        },
        [addTask.fulfilled.type]: (state, action) => {
            state.tasks = action.payload
            state.loading = false;
            state.error = null;
        },
        [addTask.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})