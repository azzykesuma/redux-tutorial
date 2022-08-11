import React , { useEffect } from 'react'
import { useSelector,useDispatch  } from 'react-redux'
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionPosts from './ReactionPosts';
import { selectAllPosts, fetchPosts } from './postSlice';
import { Spinner} from '../../components/Spinner';

const PostExcerpts = ({ posts }) => {
  return (
      <article className='post-excerpt' key={posts.id}>
          <h3>{ posts.title}</h3>
          <div>
              <PostAuthor userId={posts.user}/>
              <TimeAgo timestamp={posts.date} />
          </div>
          <p className='post-content'>{posts.content.substring(0,100)}</p>
          <ReactionPosts post={posts} />
          <Link to={`/posts/${posts.id}`} className='button mutted-button'>
              view post 
            </Link>
      </article>
  )
}

export const PostLists = () => {
    const post = useSelector(selectAllPosts);
    // ordering the posts
    const dispatch = useDispatch();
    const postStatus = useSelector(state => state.posts.status);
    
    const error = useSelector(state => state.posts.error)
    
    // useeffect will call the dispatch fetch posts, and 
    // whenever the poststatus or the dispatch called, useEffect will be fired again
    useEffect(() => {
      if(postStatus === 'idle') {
        dispatch(fetchPosts())
      }
    },[postStatus, dispatch])

    let content;

    if(postStatus === 'loading') {
      content = <Spinner text='loading'/>
    } else if(postStatus === 'succeeded') {
      const orderedPosts = post
      .slice()
      .sort((a,b) => b.date.localeCompare(a.date))

      content = orderedPosts.map(item => (
        <PostExcerpts key={item.id}   posts={item} />
    ))
  } else if(postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section>
        <h2>Posts</h2>
        {content}
    </section>
  )
}

export default PostLists