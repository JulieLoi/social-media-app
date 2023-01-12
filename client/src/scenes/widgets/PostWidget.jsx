import { 
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import { 
    Box,
    Divider,
    IconButton,
    Typography,
    useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";  
import { setPost } from "state";

/**
 * Post Widget
 * A widget of a single post published
 */
const PostWidget = ({ postId, postUserId, name, description, location, picturePath, userPicturePath, likes, comments }) => {

    const dispatch = useDispatch();
    
    // Post Widget State
    const [isComments, setIsComments] = useState(false);
    const [share, setShare] = useState(false);
    const [postLikes, setPostLikes] = useState(likes);

    // Theme Colors
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    // Token, Logged In User ID (Frontend State)
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);

    // Likes (Does not update)
    //const isLiked = Boolean(likes[loggedInUserId]);     // Logged In User Likes
    //const likeCount = Object.keys(likes).length;        // Total Like Count


    // PATCH API Call (Like/Dislike Post)
    const patchLike = async () => {

        // Like/Dislike Post (add/remove userID from post's like array)
        const response = await fetch(`http://localhost:3001/posts/${postId}/like`,
            {
                method: "PATCH",
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: loggedInUserId })
            }
        );

        // Get Backend Response
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));       // Update Frontend State
        setPostLikes(updatedPost.likes);                // Update Post Widget State
    }

    // Post Widget
    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography color={main}
                sx={{ mt: "1rem" }}
            >   
                {description}
            </Typography>

            {/* Post Picture (if exists) */}
            {picturePath && (
                <img 
                    width="100%" height="auto" alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}

            {/* Like and Comment */}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">

                    {/* Like Button and Like Counter */}
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {Boolean(postLikes[loggedInUserId]) ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{Object.keys(postLikes).length}</Typography>
                    </FlexBetween>

                    {/* Comment Button and Comment Count */}
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            {isComments ?
                                <ChatBubbleOutlineOutlined sx={{ color: primary }} />
                                :
                                <ChatBubbleOutlineOutlined />
                            }
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>

                </FlexBetween>

                {/* Share Button */}
                <IconButton onClick={() => setShare(!share)}>
                    {share ?
                        <ShareOutlined sx={{ color: primary }} />
                        :
                        <ShareOutlined />
                    }
                </IconButton>
                

            </FlexBetween>

            {/* Comment Section*/}
            {isComments && 
                (
                    <Box mt="0.5rem">
                        {comments.map((comment, index) => (
                            <Box key={`${name}-${index}`}>
                                <Divider />
                                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                    {comment}
                                </Typography>
                            </Box>
                        ))}
                        <Divider />
                    </Box>
                )
            }

        </WidgetWrapper>
    )
};

export default PostWidget;