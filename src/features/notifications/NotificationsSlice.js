import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit'
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


const notificationsAdapter = createEntityAdapter({
    sortComparer : (a,b) => b.date.localeCompare(a.date)
})

const notificationSlice = createSlice({
    name : 'notifications',
    initialState : notificationsAdapter.getInitialState(),
    reducers : {
        allNotificationsRead(state,action) {
           Object.values(state.entities).forEach(notif => {
            // when fetched in notif pages, all notification become "read"
            notif.read = true
           })
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchNotifications.fulfilled, (state,action) => {
           notificationsAdapter.upsertMany(state,action.payload)
        // object.values takes in all the value of the object, and make them into an array
           Object.values(state.entities).forEach(notif => {
            // when notif is read, then they are not new
            notif.isNew = !notif.read
           })
        })
    }
})

export default notificationSlice.reducer;
export const { allNotificationsRead } = notificationSlice.actions;
export const { selectAll : selectAllNotifications} = notificationsAdapter.getSelectors(state => state.notifications)
