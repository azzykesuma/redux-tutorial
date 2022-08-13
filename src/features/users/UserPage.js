import React from 'react'
import { useSelector } from 'react-redux';
import { selectPostByUser } from '../posts/postSlice';
import { selectUserById } from './userSlice';
import { Link } from 'react-router-dom';

const UserPage = ({ match }) => {
    const { userId } = match.params;
    const user = useSelector(state => selectUserById(state, userId))

    const postsForUser = useSelector(state => selectPostByUser(state, userId))
    console.log(postsForUser);
    const postTitles = postsForUser.map(post => (
        <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
    ))

  return (
    <section>
        <h2>{user.name}</h2>

        <ul>{postTitles}</ul>
    </section>
  )
}

export default UserPage