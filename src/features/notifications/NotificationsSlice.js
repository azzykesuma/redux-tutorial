import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, {getState}) => {
        const AllNotifications = selectAllNotifications(getState());
        const [latestNotifications] = AllNotifications;
        const latestTimeStamp = latestNotifications ? latestNotifications.date : '';
        const response = await client.get(
            `/fakeApi/notifications?since=${latestTimeStamp}`
        )
        return response.data
    }
)

const notificationSlice = createSlice({
    name : 'notifications',
    initialState : [],
    reducers : {
        allNotificationsRead(state,action) {
            state.forEach(notif => {
                notif.read = true
            })
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchNotifications.fulfilled, (state,action) => {
            state.push(...action.payload)
            state.forEach(notif => {
                notif.isNew = !notif.read
            })
            state.sort((a,b) => b.date.localeCompare(a.date))
        })
    }
})

export default notificationSlice.reducer;
export const { allNotificationsRead } = notificationSlice.actions;
export const selectAllNotifications = state => state.notifications