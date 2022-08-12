import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from '../../api/client'


const initialState = {
    posts : [],
    status : 'idle',
    error : null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => {
    const res = await client.get('/fakeApi/posts')
    return res.data
})

export const addNewPost = createAsyncThunk(
    'posts/addNewPost', 
    async (initialPost) => {
        const res = await client.post('/fakeApi/posts', initialPost)
        return res.data
    }
)

const postSlice = createSlice({
    name : 'posts',
    initialState,
    reducers : {
        reactionAdded(state,action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if(existingPost) {
                existingPost.reactions[reaction]++
            }
            
        },
        postUpdated(state,action) {
            const {id, title, content} = action.payload
            const existingPost = state.posts.find(post => post.id === id);

            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            } 
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.posts = state.posts.concat(action.payload)
            })
            .addCase(fetchPosts.rejected, (state,action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.posts.push(action.payload)
            })
    },
})

export const { postAdded, postUpdated, reactionAdded } = postSlice.actions
export default postSlice.reducer
// making reusable functions to grap the posts
export const selectAllPosts = state => state.posts.posts
export const selectPostById = (state,postId) => state.posts.posts.find(post => post.id === postId)
// fetching data from the fake API endpoint
