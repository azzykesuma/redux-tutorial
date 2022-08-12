import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
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

export const selectAllUsers = state => state.users
export const selectUserById = (state,userId) => state.users.find(user => user.id === userId)
export default userSlice.reducer;