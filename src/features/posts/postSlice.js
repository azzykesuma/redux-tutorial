import { createSlice,nanoid } from "@reduxjs/toolkit";
const initialState = [
    { 
        id : 1,
        title : 'first post!',
        content : 'hello'
    },
    { 
        id : 2,
        title : 'second post!',
        content : 'world'
    },
]

const postSlice = createSlice({
    name : 'posts',
    initialState,
    reducers : {
        postAdded : {
            reducer(state,action) {
                state.push(action.payload)
            },
            prepare(title,content, userId) {
                return {
                    payload : {
                        id : nanoid(),
                        title,
                        content,
                        user: userId
                    }
                }
            }
        },
        postUpdated(state,action) {
            const {id, title, content} = action.payload
            const existingPost = state.find(post => post.id === id);

            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            } 
        }
    }
})

export const { postAdded, postUpdated } = postSlice.actions
export default postSlice.reducer