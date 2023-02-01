import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

import { Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import PostWidget from "./PostWidget";

/**
 * Posts Widget
 * Displays all posts in the database (most recent at the top)
 */
const PostsWidget = ({ userId=null, isProfile = false }) => {

    const dispatch = useDispatch();

    // Posts (Frontend State)
    const posts = useSelector((state) => [...state.posts].reverse());
    
    // Theme Colors
    const { palette } = useTheme();
    const mediumMain = palette.neutral.mediumMain;

    // GET API Call (Get All Posts)
    const getPosts = async () => {
        await fetch(`http://localhost:3001/posts`, { method: "GET" }
        ).then(async (response) => {
            // Response JSON Object
            const jsonObject = await response.json();

            if (response.status === 200) {
                dispatch(setPosts({ posts: jsonObject }));    // Updates Frontend State
            }
            else { console.error(jsonObject.message); }
        });
    }

    // GET API Call (Get All User Posts)
    const getUserPosts = async () => {
        await fetch(`http://localhost:3001/posts/${userId}/posts`, { method: "GET" }
        ).then(async (response) => {
            // Response JSON Object
            const jsonObject = await response.json();

            if (response.status === 200) {
                dispatch(setPosts({ posts: jsonObject }));    // Updates Frontend State
            }
            else { console.error(jsonObject.message); }
        });
    }
    
    // Loads "all posts" or "user posts" based on isProfile
    useEffect(() => {
        if (isProfile && userId !== null) { getUserPosts(); }
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
            {posts.length === 0 &&
                <WidgetWrapper>
                    <Typography color={mediumMain} mb="1rem">
                        There are no posts...
                    </Typography>
                </WidgetWrapper>
            }
        </>
    )
};

export default PostsWidget;