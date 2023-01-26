import { createSlice } from "@reduxjs/toolkit";

/**
 * Manages State for the entire frontend
 */

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    profileUser: null,
    advertisement: null,
}

/**
 * Frontend State
 * We store all of the frontend state here, which is used to update the frontend.
 * 
 * Reducers:
 * -Simple functions that modifies our state
 */
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Change Light/Dark Mode
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },

        // Login Successful - Set User/Token
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.profileUser = action.payload.user;
            state.token = action.payload.token;
        },

        // Logout - Set User/Token back to null
        setLogout: (state) => {
            state.user = null;
            state.profileUser = null;
            state.token = null;
            state.advertisement = null;
        },

        // Update the Logged In User's Friends List
        setFriends: (state, action) => {
            console.log(action.payload)
            if(state.user) {
                state.user.friends = action.payload.friends;
            }
            else {
                console.error("User friends does not exist."); 
            }
        },

        // Updates Logged In User's Handles (Twitter / LinkedIn)
        setUserInformation: (state, action) => {
            if (state.user) {
                state.user.firstName = action.payload.firstName;
                state.user.lastName = action.payload.lastName;
                state.user.location = action.payload.location;
                state.user.occupation = action.payload.occupation;
                state.user.twitterHandle = action.payload.twitterHandle;
                state.user.linkedInHandle = action.payload.linkedInHandle;
            }
        },

        // Update the posts (all posts) in the frontend state
        setPosts: (state, action) => {
            const value = action.payload.posts;
            if (Array.isArray(value)) {
                state.posts = value;
            }
            else {
                console.log("Given 'posts' value is not an array of posts.")
            }
        },

        // Updates a post in the frontend state (updates posts)
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) {
                    return action.payload.post;
                }
                return post;
            });
            state.posts = updatedPosts;
        },

        // Delete a post in the frontend state (updates posts)
        deletePost: (state, action) => {
            state.posts = state.posts.filter((post) => post._id !== action.payload.post._id);
        },

        // Set Profile User
        setProfileUser: (state, action) => {
            state.profileUser = action.payload;
        },

        // Set Single Ad
        setAd: (state, action) => {
            state.advertisement = action.payload;
        },
    }
});

export const { setMode, setLogin, setLogout, setFriends, setUserInformation, setPosts, setPost, deletePost, setProfileUser, setAd } = authSlice.actions;
export default authSlice.reducer;