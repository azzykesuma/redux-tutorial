import React , { useMemo } from 'react'
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionPosts from './ReactionPosts';
import { Spinner} from '../../components/Spinner';
import { useGetPostsQuery } from '../api/ApiSlice';

let PostExcerpts = ({ post }) => {
  return (
      <article className='post-excerpt' key={post.id}>
          <h3>{ post.title}</h3>
          <div>
              <PostAuthor userId={post.user}/>
              <TimeAgo timestamp={post.date} />
          </div>
          <p className='post-content'>{post.content.substring(0,100)}</p>
          <ReactionPosts post={post} />
          <Link to={`/posts/${post.id}`} className='button mutted-button'>
              view post 
            </Link>
      </article>
  )
}
// making sure that no render will take place if
// no changes detected
PostExcerpts = React.memo(PostExcerpts)

export const PostLists = () => {
  // the rtk query replace the selector, useeffect, and dispatch functions
  const {
    data : posts = [],
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery()

  // memoizing the sorted posts, so that if the sortedposts does not changes,
  // the component wont rerender
  const sortedPost = useMemo(() => {
    const sortedPosts = posts.slice()
    sortedPosts.sort((a,b) => b.date.localeCompare(a.date))
    return sortedPosts
  }, [posts])

  let content;

    if(isLoading) {
      content = <Spinner text='loading'/>
    } else if(isSuccess) {
      content = sortedPost.map(post => (
        <PostExcerpts key={post.id} post={post} />
      ))
  } else if(isError) {
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