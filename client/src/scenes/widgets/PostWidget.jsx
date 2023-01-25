import { 
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import { 
    Box, Divider, IconButton,
    Typography, useTheme,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";  
import { setPost, deletePost } from "state";
import Comment from "components/Comment";
import AddComment from "components/AddComment";

/**
 * Post Widget
 * A widget of a single post published
 */
const PostWidget = ({ postId, postUserId, description, picturePath, likes, comments }) => {

    const dispatch = useDispatch();

    // Post Widget State
    const [isComments, setIsComments] = useState(false);        // Show Post Comments
    const [share, setShare] = useState(false);                  // Share Button

    // Theme Colors
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    // Token, Logged In User (Frontend State)
    const token = useSelector((state) => state.token);
    const loggedInUser = useSelector((state) => state.user);

    // Post Owner (User)
    const [postOwner, setPostOwner] = useState("");

    // Likes (Does not update)
    const isLiked = Boolean(likes[loggedInUser._id]);     // Logged In User Likes
    const likeCount = Object.keys(likes).length;        // Total Like Count

    // GET API Call (Get Post Owner)
    const getPostOwner = async () => {
        await fetch(`http://localhost:3001/users/${postUserId}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            }
        ).then(async (response) => {
            // Response JSON Object
            const jsonObject = await response.json();

            if (response.status === 200) {
                setPostOwner(jsonObject);
            }
            else {
                console.log(jsonObject.message);
            }
        });
    }

    // PATCH API Call (Like/Dislike Post)
    const patchLike = async () => {
        await fetch(`http://localhost:3001/posts/${postId}/like`,
            {
                method: "PATCH",
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: loggedInUser._id })
            }
        ).then(async (response) => {
            // Response JSON Object
            const jsonObject = await response.json();

            if (response.status === 200) {
                dispatch(setPost({ post: jsonObject }));       // Update Frontend State
            }
            else {
                console.log(jsonObject.message);
            }
        });
    }

    // DELETE API Call (Delete Post)
    const deleteUserPost = async () => {
        await fetch(`http://localhost:3001/posts/${postId}/delete`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        ).then(async (response) => {
            // Response JSON Object
            const jsonObject = await response.json();

            if (response.status === 202) {
                dispatch(deletePost({ post: jsonObject }));       // Update Frontend State
            }
            else {
                console.log(jsonObject.message);
            }
        });
    };

    useEffect(() => {
        getPostOwner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Post Widget
    return (
        <WidgetWrapper mb="2rem">
            { postOwner._id === loggedInUser._id ?
                <Friend
                    friendId={postUserId}
                    name={`${loggedInUser.firstName} ${loggedInUser.lastName}`}
                    subtitle={loggedInUser.location}
                    userPicturePath={loggedInUser.picturePath}
                />
                :
                <Friend
                    friendId={postUserId}
                    name={`${postOwner.firstName} ${postOwner.lastName}`}
                    subtitle={postOwner.location}
                    userPicturePath={postOwner.picturePath}
                />
            }

            {/* DESCRIPTION */}
            <Typography color={main} variant="h5"
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
                    {postUserId === loggedInUser._id &&  (
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
                <Box sx={{ maxHeight: "30vh", overflowY: "auto" }}>
                    {comments.map((c) => (
                        <Comment 
                            key={`${c.userId}-${postId}-${Math.random()}`}
                            comment={c} postId={postId} palette={palette} 
                        />
                    ))}
                </Box>
                <Divider />
                <AddComment postId={postId} palette={palette}/>
            </Box>)
            }
        </WidgetWrapper>
    )
};

export default PostWidget;