import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { addNewPost } from './postSlice'


const AddPostForm = () => {
    const [Title, setTitle] = useState('')
    const [Content, setContent] = useState('')
    const [id, setId] = useState('')
    const [addRequestStatus, setaddRequestStatus] = useState('idle')
    const users = useSelector(state => state.users)
    const dispatch = useDispatch();

    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);
    const onAuthorChanged = e => setId(e.target.value);

    const canSave = 
    [Title,Content,id].every(Boolean) && addRequestStatus === 'idle'

    const savePost = async () => {
      if(canSave) {
        try {
          setaddRequestStatus('pending')
          await dispatch(addNewPost({ Title, Content, user : id})).unwrap()
          setTitle('')
          setContent('')
          setId('')
        } catch(err) {
          console.log(`failed to save the post : ${err}`)
        } finally {
          setaddRequestStatus('idle')
        }
      }
    }


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

            <button type='button' onClick={savePost} disabled={!canSave}>
              Save Post
            </button>
        </form>
    </section>
  )
}

export default AddPostForm;;