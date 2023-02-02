import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

import { Box, Typography, Button, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import PostWidget from "./PostWidget";

/**
 * Posts Widget
 * Displays all posts in the database (most recent at the top)
 */
const PostsWidget = ({ userId=null }) => {

    const dispatch = useDispatch();

    // Theme Colors
    const { palette } = useTheme();
    const mediumMain = palette.neutral.mediumMain;

    // Posts (Frontend State)
    const posts = useSelector((state) => [...state.posts].reverse());

    // Loading Posts
    const postsLoaded = 10;
    const [next, setNext] = useState(postsLoaded);
    const handleMorePosts = () => {
        setNext(next + postsLoaded);
    };
    
    // Gets all posts (/posts GET API CALL)
    const getPosts = async () => {
        await fetch(`http://localhost:3001/posts`, { method: "GET" }
        ).then(async (response) => {
            const responseJSON = await response.json();
            if (response.status === 200) { dispatch(setPosts({ posts: responseJSON.posts })); }
            else { console.error(responseJSON.message); }
        });
    }

    // Gets all of a particular user's (userId) posts (/posts GET API CALL)
    const getUserPosts = async () => {
        await fetch(`http://localhost:3001/posts/${userId}/posts`, { method: "GET" }
        ).then(async (response) => {
            const responseJSON = await response.json();
            if (response.status === 200) { dispatch(setPosts({ posts: responseJSON.posts })); }
            else { console.error(responseJSON.message); }
        });
    }
    
    // Loads "all posts" or "user posts" 
    useEffect(() => {
        if (userId !== null) { getUserPosts(); }
        else { getPosts(); }        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Posts Widget
    return (
        <>
            {posts.slice(0, next).map(
                ({
                    _id,
                    userId,
                    description,
                    picturePath,
                    likes,
                    comments,
                    createdAt,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        description={description}
                        picturePath={picturePath}
                        likes={likes}
                        comments={comments}
                        createdAt={createdAt}
                    />
                ))
            }
            {next < posts.length && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={handleMorePosts}
                    sx={{ padding: "1rem" }}
                    variant="outlined"
                >
                    <Typography variant="h5" fontWeight="700"
                        sx={{ letterSpacing: "2px" }}
                    >
                        Load more
                    </Typography>
                </Button>
                </Box>
            )}
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