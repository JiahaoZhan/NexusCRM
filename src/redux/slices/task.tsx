import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { addTaskAPI, editTaskAPI, deleteTaskAPI, updateMarkAPI, updateTaskStatusAPI } from "../../utils";
import { queryTaskListAPI } from "../../utils";

const params = {
    pageNum: 1,
    pageSize: 10,
    status: null
}

export interface Task {
    id: string,
    title: string,
    content: string,
    gmt_expire: number,
    status: string,
    important: boolean
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

export const updateTaskMark = createAsyncThunk(
    "task/updateTaskMark",
    async (parameters: {jwt: string | null, id: string, index: number, important: boolean}, thunkAPI) => {
        try {
            const res = await updateMarkAPI({jwt: parameters.jwt, id: parameters.id, index: parameters.index, important:parameters.important})
            return res
        } catch (error) {
            console.log(error)
            alert('Fail to update task. Please try again')
        }
    }
)

export const getAllTasks = createAsyncThunk(
    "task/getAllTasks",
    async (parameters: { jwt: string, pageNo: number, pageSize: number }, thunkAPI) => {
        try {
            const res = await queryTaskListAPI({ jwt: parameters.jwt, pageNo: parameters.pageNo, pageSize: parameters.pageSize })
            return res
        } catch (error) {
            console.log(error)
            alert('Fail to add task. Please try again')
        }
    }
)

export const deleteTask = createAsyncThunk(
    "task/deleteTask",
    async (parameters: { jwt: string | null, id: string }, thunkAPI) => {
        try {
            const res = deleteTaskAPI({ jwt: parameters.jwt, id: parameters.id })
            return res
        } catch (error) {
            console.log(error)
            alert('Fail to add task. Please try again')
        }
    }
)

export const editTask = createAsyncThunk(
    "task/editTask",
    async (parameters: { jwt: string | null, task: Task }, thunkAPI) => {
        try {
            const res = editTaskAPI({ jwt: parameters.jwt, task: parameters.task })
            return res
        } catch (error) {
            console.log(error)
            alert('Fail to add task. Please try again')
        }
    }
)

export const addTask = createAsyncThunk(
    "task/addTask",
    async (parameters: { jwt: string | null, task: Task }, thunkAPI) => {
        try {
            const res = await addTaskAPI({ jwt: parameters.jwt, task: parameters.task })
            return res
        } catch (error) {
            console.log(error)
            alert('Fail to add task. Please try again')
        }
    }
)

export const updateStatus = createAsyncThunk(
    "task/updateStatus",
    async (parameters: {jwt: string | null, id: string, index: number, status: string}, thunkAPI) => {
        try {
            const res = await updateTaskStatusAPI({jwt: parameters.jwt, id: parameters.id, index: parameters.index, status:parameters.status})
            return res
        } catch (error) {
            console.log(error)
            alert('Fail to update task status. Please try again')
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
            if (action.payload.data) {
                state.tasks.push(action.payload.data)
            }
            state.loading = false;
            state.error = null;
        },
        [addTask.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [editTask.pending.type]: (state) => {
            state.loading = true;
        },
        [editTask.fulfilled.type]: (state, action) => {
            state.tasks = state.tasks.map(task => {
                if (task.id === action.payload.data.id) {
                    console.log("***Find***", action.payload.data)
                    return action.payload.data
                }
                else {
                    return task
                }
            })
            state.loading = false;
            state.error = null;
        },
        [editTask.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [deleteTask.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteTask.fulfilled.type]: (state, action) => {
            console.log("****deleteTask****",action)
            const id = action.payload.data.id
            state.tasks = state.tasks.filter((task)=>{
                return task.id !== id;
            })
            state.loading = false;
            state.error = null;
        },
        [deleteTask.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [getAllTasks.pending.type]: (state) => {
            state.loading = true;
        },
        [getAllTasks.fulfilled.type]: (state, action) => {
            console.log("***Action getAllTasks***", action)
            if (action.payload.data) {
                state.tasks = action.payload.data.rows
            }
            else {
                state.tasks = []
            }
            state.loading = false;
            state.error = null;
        },
        [getAllTasks.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [updateTaskMark.pending.type]: (state) => {
            state.loading = true;
        },
        [updateTaskMark.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.tasks[action.payload.data.index].important = action.payload.data.important
            state.error = null
        },
        [updateTaskMark.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [updateStatus.pending.type]: (state) => {
            state.loading = true;
        },
        [updateStatus.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.tasks[action.payload.data.index].status = action.payload.data.status
            state.error = null
        },
        [updateStatus.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})
