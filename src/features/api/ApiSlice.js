import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { addNewPost } from '../posts/postSlice';

export const apiSlice = createApi({
    // reducer path is optional
    reducerPath : 'api',
    // here is the url for the api
    baseQuery : fetchBaseQuery({ baseUrl : '/fakeApi'}),
    // this returns the data based on the query
    endpoints : builder => ({
        getPosts : builder.query({
            query : () => '/posts'
        }),
        // getting a single post
        getPost : builder.query({
            query : postId => `/posts/${postId}` 
        }),
        // for updating or adding things into the server, 
        // use mutation method, and add body and method to the query obj
        addNewPost : builder.mutation({
            query : initialPost => ({
                url : '/posts',
                method : 'POST',
                body : initialPost
            })
        })
    })
})
// the name of the hooks is automatic
// use + name of endpoint + Query||mutation
export const { useGetPostsQuery,useGetPostQuery, useAddNewPostMutation } = apiSlice;