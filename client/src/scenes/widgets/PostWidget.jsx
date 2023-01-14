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
    InputBase,
    useTheme,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import UserImage from "components/UserImage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";  
import { setPost, deletePost } from "state";

/**
 * Post Widget
 * A widget of a single post published
 */
const PostWidget = ({ postId, postUserId, name, description, location, picturePath, userPicturePath, likes, comments }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Post Widget State
    const [userComment, setUserComment] = useState("");
    const [isComments, setIsComments] = useState(false);
    const [share, setShare] = useState(false);
    const [remainChar, setRemainChar] = useState(100);

    // Theme Colors
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const medium = palette.neutral.medium;

    // Token, Logged In User ID (Frontend State)
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);

    // Likes (Does not update)
    const isLiked = Boolean(likes[loggedInUserId]);     // Logged In User Likes
    const likeCount = Object.keys(likes).length;        // Total Like Count

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

        // Get Backend Response (Updated Post - like/unlike post)
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));       // Update Frontend State
    }

    // DELETE API Call (Delete Post)
    const deleteUserPost = async () => {

        // Delete Post
        const response = await fetch(`http://localhost:3001/posts/${postId}/delete`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        ) 

        // Get Backend Response (Deleted Post)
        const deletedPost = await response.json();
        dispatch(deletePost({ post: deletedPost }));       // Update Frontend State
    }

    // PATCH API Call (Add Comment)
    const addComment = async () => {

        // Add Comment to Post
        const response = await fetch(`http://localhost:3001/posts/${postId}/comment`,
            {
                method: "PATCH",
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    userId: loggedInUserId, 
                    userName: name,
                    userPicturePath: userPicturePath, 
                    comment: userComment 
                }),
            }
        );

        // Get Backend Response (Updated Post - add comment)
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));       // Update Frontend State
        setUserComment("");                             // Resets User Comment
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

            {/* DESCRIPTION */}
            <Typography color={main} 
                sx={{ 
                    mt: "1rem", mb: "0.75rem",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                }}
            >   
                {description}
            </Typography>

            {/* Post Picture (if exists) */}
            {picturePath && (
                <img 
                    width="100%" height="auto" alt="post"
                    style={{ borderRadius: "0.75rem", marginBottom: "0.75rem" }}
                    src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}

            <Divider />

            {/* Like and Comment */}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">

                    {/* Like Button and Like Counter */}
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
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

                {/* Delete, Share Button */}
                <FlexBetween>
                        {postUserId === loggedInUserId &&  (
                            <IconButton onClick={() => deleteUserPost()}>
                                <DeleteIcon sx={{ "&:hover": { color: primary } }} />
                            </IconButton>
                        )}
                        
                        <IconButton onClick={() => setShare(!share)}>
                            {share ?
                                <ShareOutlined sx={{ color: primary }} />
                                :
                                <ShareOutlined />
                            }
                        </IconButton>
                </FlexBetween>
                
                

            </FlexBetween>

            {/* Comment Section*/}
            {isComments && 
                (<Box mt="0.5rem">
                    {comments.map((c) => (
                        <Box key={`${c.userId}-${postId}-${Math.random()}`}>
                            <Divider />
                            <Box p="0.5rem 0">
                                <Box display="flex" gap="1rem" alignItems="center" ml="1rem">
                                    <UserImage image={c.userPicturePath} size={"30px"} />
                                    <Typography variant="h5"
                                        sx={{
                                            "&:hover": {
                                                color: palette.primary.main,
                                                cursoer: "pointer",
                                            }
                                        }}
                                        onClick={() => {
                                            navigate(`/profile/${c.userId}`);
                                            navigate(0);        // Refresh
                                        }}
                                    >
                                        {c.userName}
                                    </Typography>
                                </Box>
                                
                                <Box ml="3rem">
                                    <Typography noWrap
                                        sx={{ 
                                            color: main, m: "0.5rem 0", pl: "1rem",
                                            whiteSpace: "pre-wrap",
                                            wordBreak: "break-word",
                                        }}
                                    >
                                        {c.comment}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}

                    <Divider />

                    <FlexBetween mt="1rem">
                        <UserImage image={userPicturePath} size={"50px"} />
                        <InputBase 
                            placeholder="Type your comment here..."
                            onChange={(e) => {
                                const commentLength = e.target.value.length;
                                if (commentLength <= 100) {
                                    setRemainChar(100 - commentLength)
                                    setUserComment(e.target.value)
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === `Enter`) { addComment() }
                            }}
                            value={userComment}
                            maxLength="100"
                            sx={{
                                width: "100%",
                                backgroundColor: palette.neutral.light,
                                borderRadius: "2rem",
                                p: "0.5rem 1rem",
                                ml: "0.5rem",
                                maxLength: "100"
                            }}
                        />
                    </FlexBetween>
                    <Box ml="4rem" mb="0.25rem" mt="0.25rem">
                        <Typography color={medium}>
                            Remaining Character(s): {remainChar} 
                        </Typography>
                    </Box>
                </Box>
                )
            }

        </WidgetWrapper>
    )
};

export default PostWidget;