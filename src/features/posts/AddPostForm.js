import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'

import { postAdded } from './postSlice'


const AddPostForm = () => {
    const [Title, setTitle] = useState('')
    const [Content, setContent] = useState('')
    const [id, setId] = useState('')
    const users = useSelector(state => state.users)
    const dispatch = useDispatch();

    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);
    const onAuthorChanged = e => setId(e.target.value);


    const savePost = () => {
      console.log(Title,Content)
      if(Title && Content) {
        dispatch(postAdded(Title,Content, id))
        setTitle('')
        setContent('')
      }
    }

    const isValid = Boolean(Title) && Boolean(Content) && Boolean(id)

    const userOptions = users.map(user => (
      <option value={user.id} key={user.id}>
        {user.name}
      </option>
    ))

  return (
    <section>
        <h2>Add new form</h2>
        <form>
            <label htmlFor="postTitle">Post Title:</label>
            <input
            type="text"
            id="postTitle"
            name="postTitle"
            placeholder='what"s on your mind? '
            value={Title}
            onChange={onTitleChange}
            />

            <label htmlFor="postAuthor">Author</label>
            <select id="postAuthor" value={id} onChange={onAuthorChanged}>
              <option value=''></option>
              {userOptions}
            </select>

            <label htmlFor="postContent">Content:</label>
            <textarea
            id="postContent"
            name="postContent"
            value={Content}
            onChange={onContentChange}
            />

            <button type='button' onClick={savePost} disabled={!isValid}>
              Save Post
            </button>
        </form>
    </section>
  )
}

export default AddPostForm;;