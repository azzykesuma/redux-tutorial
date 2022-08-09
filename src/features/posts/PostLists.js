import React from 'react'
import { useSelector  } from 'react-redux'
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';

export const PostLists = () => {
    const post = useSelector(state => state.posts);
    console.log(post)
    const renderedPost = post.map(item => (
        <article className='post-excerpt' key={item.id}>
            <h3>{item.title}</h3>
            <PostAuthor id={item.user} />
            <p className='post-content'>{item.content.substring(0,100)}</p>
            <Link to={`/posts/${item.id}`} className='button mutted-button'>
              view post 
            </Link>
        </article>
    ))
  return (
    <section>
        <h2>Posts</h2>
        { renderedPost }
    </section>
  )
}

export default PostLists