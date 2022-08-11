import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = [];

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    const res = await client.get('/fakeApi/users');
    return res.data
})

const userSlice = createSlice({
    name : 'users',
    initialState,
    reducers : {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export default userSlice.reducer;