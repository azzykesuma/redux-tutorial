import React from 'react'
import { useSelector } from 'react-redux'

export const PostAuthor = ({id}) => {
    const author = useSelector(state => state.users.find(user => user.id === id))
  return (
    <span> by { author ? author.name : 'stranger'}</span>
  )
}

export default PostAuthor