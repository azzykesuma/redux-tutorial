import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id : '0', name : 'azzy'},
    { id : '1', name : 'abraham'},
    { id : '2', name : 'lincoln'},
]

const userSlice = createSlice({
    name : 'users',
    initialState,
    reducers : {}
})

export default userSlice.reducer;