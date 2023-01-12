import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

/**
 * Posts Widget
 * Displays all posts in the database (most recent at the top)
 */
const PostsWidget = ({ userId, isProfile = false }) => {

    const dispatch = useDispatch();

    // Token, Posts (Frontend State)
    const token = useSelector((state) => state.token);  
    const posts = useSelector((state) => [...state.posts].reverse());

    // GET API Call (Get All Posts)
    const getPosts = async () => {

        // Get Posts in MongoDB
        const response = await fetch(`http://localhost:3001/posts`, 
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            }
        );

        // Get Backend Response (Get All Posts in DB)
        const data = await response.json();
        dispatch(setPosts({ posts: data }));    // Updates Frontend State

    }

    // GET API Call (Get All User Posts)
    const getUserPosts = async () => {

        // Get Posts in MongoDB
        const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, 
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            }
        );

        // Get Backend Response (Get All User Posts in DB)
        const data = await response.json(); 
        dispatch(setPosts({ posts: data }));    // Updates Frontend State
    }

    // Loads "all posts" or "user posts" based on isProfile
    useEffect(() => {
        if (isProfile) { getUserPosts(); }
        else { getPosts(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Posts Widget
    return (
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                ))
            }
        </>
    )
};

export default PostsWidget;