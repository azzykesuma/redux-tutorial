import React , { useEffect } from 'react'
import { useSelector,useDispatch  } from 'react-redux'
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionPosts from './ReactionPosts';
import { 
  selectAllPosts,
  fetchPosts,
  selectPostById,
  selectPostId 
} from './postSlice';
import { Spinner} from '../../components/Spinner';

let PostExcerpts = ({ postId }) => {
  // importing id prop so that the selector can lookup the value
  // based on the id given
  const posts = useSelector(state => selectPostById(state,postId))
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
// making sure that no render will take place if
// no changes detected
PostExcerpts = React.memo(PostExcerpts)

export const PostLists = () => {
    const post = useSelector(selectAllPosts);
    const orderedPostIds = useSelector(selectPostId)
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
      content = orderedPostIds.map(postId => (
        <PostExcerpts key={postId} postId={postId} />
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