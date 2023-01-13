import { createSlice } from "@reduxjs/toolkit";

/**
 * Manages State for the entire frontend
 */

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: []
}

/**
 * 
 * Reducers:
 * -Simple functions that modifies our state
 */
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if(state.user) {
                state.user.friends = action.payload.friends;
            }
            else {
                console.error("User friends does not exist."); 
            }
        },
        setPosts: (state, action) => {
            const value = action.payload.posts;
            if (Array.isArray(value)) {
                state.posts = value;
            }
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) {
                    return action.payload.post;
                }
                return post;
            });
            state.posts = updatedPosts;
        }
    }
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;