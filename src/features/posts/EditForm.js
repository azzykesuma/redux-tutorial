import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { postUpdated } from './postSlice'
import { selectAllPosts, selectPostById } from './postSlice'


const EditForm = ({match}) => {
    const { postId } = match.params;

    const post = useSelector(state => selectPostById(state, postId));
    console.log(postId, post.id)
    
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);
    
    const onSavePost = () => {
        if(title && content) {
            dispatch(postUpdated({
                id : post.id,
                title,
                content
            }))
            history.push(`/posts/${postId}`)
        }
    }

    const history = useHistory();
    const dispatch = useDispatch();

  return (
    <section>
        <h2>Add new form</h2>
        <form>
            <label htmlFor="postTitle">Post Title:</label>
            <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChange}
            />

            <label htmlFor="postContent">Content:</label>
            <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChange}
            />

            <button type='button' onClick={onSavePost}>Save Post</button>
        </form>
    </section>
  )
}

export default EditForm;