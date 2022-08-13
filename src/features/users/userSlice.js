import { createSlice,createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    const res = await client.get('/fakeApi/users');
    return res.data
})

const userSlice = createSlice({
    name : 'users',
    initialState,
    reducers : {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
    }
})
export const {
    selectAll : selectAllUsers,
    selectById : selectUserById
} = usersAdapter.getSelectors(state => state.users)
export default userSlice.reducer;