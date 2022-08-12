import React from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllUsers } from '../users/userSlice'
import classnames from 'classnames'
import {
    selectAllNotifications,
    allNotificationsRead
} from './NotificationsSlice'
import { useLayoutEffect } from 'react'

export const NotificationList = () => {
    const notifications = useSelector(selectAllNotifications)
    const users = useSelector(selectAllUsers)
    const dispatch = useDispatch();

    const notificationClassName = classnames('notification', {
        new : notifications.isNew
    })
    const renderedNotification = notifications.map(notif => {
        const date = parseISO(notif.date);
        const timeAgo = formatDistanceToNow(date)
        const user = users.find(user => user.id === notif.user) || {
            name : 'unknown user'
        }
        
        return (
            <div key={notif.id} className={notificationClassName}>
                <div>
                    <b>{user.name}</b> {notif.message}
                </div>
                <div title={notif.date}>
                    <i>{timeAgo} ago</i>
                </div>
            </div>
        ) 
    })

    useLayoutEffect(() => {
        dispatch(allNotificationsRead())
        console.log(`rendering...`);
    })

  return (
    <section className='notificationsList'>
        <h2>Notifications</h2>
        {renderedNotification}
    </section>
  )
}
