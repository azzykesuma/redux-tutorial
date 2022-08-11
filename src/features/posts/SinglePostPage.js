import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactionPosts from './ReactionPosts'
import { selectPostById } from './postSlice'
import PostAuthor from './PostAuthor'



export const SinglePostPage = ({ match }) => {
    const { postId } =  match.params

    const post = useSelector(state => selectPostById(state, postId))

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
        <ReactionPosts post={post}/>
    </section>
  )
}

export default SinglePostPage