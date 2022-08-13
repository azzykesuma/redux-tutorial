import { createSlice, createAsyncThunk,createSelector,
createEntityAdapter } from "@reduxjs/toolkit";
import { client } from '../../api/client'

// making adapter so that data can be normalized
// normalized mean that data will not re-render if no changes 
// is detected
const postAdapter = createEntityAdapter({
    sortComparer: (a,b) => b.date.localeCompare(a.date)
})
// implementing adapter
const initialState = postAdapter.getInitialState({
    status : 'idle',
    error : null,
})
// getinitialstate will look something like this
// // initialstate = {
//     id : [],
//     entities : {}
// }

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
            const existingPost = state.entities[postId]
            if(existingPost) {
                existingPost.reactions[reaction]++
            }
            
        },
        postUpdated(state,action) {
            const {id, title, content} = action.payload
            const existingPost = state.entities(id)

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
                // use the upsert many to mutate the state
                // it will merge the existing post in the initial state, so that it won't have to rerender if the state is unchanged
                postAdapter.upsertMany(state, action.payload)
            })
            .addCase(fetchPosts.rejected, (state,action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // use the addone reducer to add stuff to the initial state
            .addCase(addNewPost.fulfilled, postAdapter.addOne)
    },
})

export const { postAdded, postUpdated, reactionAdded } = postSlice.actions
export default postSlice.reducer



// using get selector to export the customized selector
export const {
    selectAll : selectAllPosts,
    selectById : selectPostById,
    selectIds : selectPostId
    // the getselector receives state as args, to define which
    // state the selectors are related to. in this case, it relate to the post
} = postAdapter.getSelectors(state => state.posts)

// memoizing notification 
export const selectPostByUser = createSelector(
    [selectAllPosts, (state,userId) => userId],
    (post,userId) => post.filter(post => post.user === userId)
)