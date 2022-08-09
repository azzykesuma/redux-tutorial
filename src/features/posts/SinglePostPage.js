import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const SinglePostPage = ({ match }) => {
    const { postId } =  match.params

    const post = useSelector(state => state.posts.find(post => post.id === postId))
    console.log(post)

    if(!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }
  return (
    <section>
        <article className='post'>
            <h2>{post.title}</h2>
            <p className="post-content">{post.content}</p>
            <Link to={`/editpost/${post.id}`}>
                Edit Post
            </Link>
        </article>
    </section>
  )
}

export default SinglePostPage