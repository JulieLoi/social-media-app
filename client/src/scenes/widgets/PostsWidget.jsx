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
        await fetch(`http://localhost:3001/posts`, 
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            }
        ).then(async (response) => {
            // Response JSON Object
            const jsonObject = await response.json();

            if (response.status === 200) {
                dispatch(setPosts({ posts: jsonObject }));    // Updates Frontend State
            }
            else {
                console.log(jsonObject.message);
            }
        });
    }

    // GET API Call (Get All User Posts)
    const getUserPosts = async () => {
        await fetch(`http://localhost:3001/posts/${userId}/posts`, 
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            }
        ).then(async (response) => {
            // Response JSON Object
            const jsonObject = await response.json();

            if (response.status === 200) {
                dispatch(setPosts({ posts: jsonObject }));    // Updates Frontend State
            }
            else {
                console.log(jsonObject.message);
            }
        });
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
                    description,
                    picturePath,
                    likes,
                    comments,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        description={description}
                        picturePath={picturePath}
                        likes={likes}
                        comments={comments}
                    />
                ))
                }
        </>
    )
};

export default PostsWidget;