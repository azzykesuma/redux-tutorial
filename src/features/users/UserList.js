import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllUsers } from './userSlice'

export const UserList = () => {
    const users = useSelector(selectAllUsers)
    const RenderedUserList = users.map(user => (
        <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
        </li>
    )) 
  return (
    <section>
        <h2>User List</h2>
        { RenderedUserList }
    </section>
  )
}

export default UserList