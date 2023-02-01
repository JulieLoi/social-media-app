import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';
import "../../audioMode.scss";
import Axios from "axios";
import fileDownload from 'js-file-download';
import { setPost, deletePost } from "state";

import { 
    ChatBubbleOutlineOutlined, FavoriteBorderOutlined,
    FavoriteOutlined, FileDownload, PictureAsPdf,
    PlayCircleFilled, PauseCircleFilled,
    FastForward, FastRewind, Repeat, VolumeUp, VolumeMute, Delete
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import Comment from "components/Comment";
import AddComment from "components/AddComment";
import SharePost from "components/SharePost";

/**
 * Post Widget
 * A widget of a single post published
 */
const PostWidget = ({ postId, postUserId, description, picturePath, likes, comments }) => {

    const dispatch = useDispatch();

    // Post Widget State
    const [isComments, setIsComments] = useState(false);        // Show Post Comments

    // Theme Colors
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const primaryMainLight = palette.primary.mainLight;

    // Token, Logged In User, Light/Dark Mode (Frontend State)
    const token = useSelector((state) => state.token);
    const loggedInUser = useSelector((state) => state.user);
    const mode = useSelector((state) => state.mode);

    // Post Owner (User)
    const [postOwner, setPostOwner] = useState("");

    // Likes (Does not update)
    const isLiked = token ? Boolean(likes[loggedInUser._id]) : false;   // Logged In User Likes
    const likeCount = token ? Object.keys(likes).length : 0;            // Total Like Count

    // Check Extension (jpg, jpeg, png, gif / ogg, wav, mp3)
    const ext = picturePath ? picturePath.split('.').pop() : "";

    // GET API Call (Get Post Owner)
    const getPostOwner = async () => {
        await fetch(`http://localhost:3001/users/${postUserId}`, { method: "GET" }
        ).then(async (response) => {
            // Response JSON Object
            const jsonObject = await response.json();

            if (response.status === 200) {
                setPostOwner(jsonObject);
            }
            else { console.error(jsonObject.message); }
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
            else { console.error(jsonObject.message); }
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
            else { console.error(jsonObject.message); }
        });
    };

    // Download audio clip or pdf
    const downloadAttachment = async () => {
        Axios.get(`http://localhost:3001/assets/posts/${picturePath}`, {
            responseType: 'blob',
        }).then(res => {
            fileDownload(res.data, picturePath.substring(36));
        })
    }

    // Update Post
    useEffect(() => {
        getPostOwner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Post Widget
    return (
        <>
        {postOwner !== null &&
        <WidgetWrapper mb="2rem">

            {(loggedInUser && postOwner._id === loggedInUser._id) ?
                <Friend 
                    id={postUserId}
                    name={`${loggedInUser.firstName} ${loggedInUser.lastName}`}
                    location={loggedInUser.location}
                    picturePath={loggedInUser.picturePath}
                />
                :
                <Friend 
                    id={postUserId}
                    name={`${postOwner.firstName} ${postOwner.lastName}`}
                    location={postOwner.location}
                    picturePath={postOwner.picturePath}
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

            {/* Post Picture/Audio (if exists) */}
            {picturePath && (
                (ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "gif") ?
                <img src={`http://localhost:3001/assets/posts/${picturePath}`}
                    width="100%" height="auto" alt="post"
                    style={{ borderRadius: "0.75rem", marginBottom: "0.75rem" }}
                />
                :
                ((ext === "pdf") ?
                    <Box mt="1rem" p="1rem"
                        borderRadius="5px" border={`1px solid ${main}`}
                        onClick={() => downloadAttachment()}
                        sx={{ "&:hover": { cursor: "pointer", color: primary } }}
                    >
                        <FlexBetween>
                            <FlexBetween>
                                <PictureAsPdf sx={{ marginRight: "10px" }} />
                                <Typography fontWeight="500">
                                    {picturePath.substring(36)}
                                </Typography>
                            </FlexBetween>
                            <FileDownload />
                        </FlexBetween>
                    </Box>
                    :
                    <Box data-theme={mode === "light" ? "light" : "dark"}>
                        <Divider />
                        <AudioPlayer src={`http://localhost:3001/assets/posts/${picturePath}`} 
                            customIcons={{
                                play:       <PlayCircleFilled fontSize="1rem" sx={{ color: primary, "&:hover": { color: primaryMainLight } }} />,
                                pause:      <PauseCircleFilled fontSize="1rem" sx={{ color: primary, "&:hover": { color: primaryMainLight } }} />,
                                forward:    <FastForward fontSize="1rem" sx={{ color: primary, "&:hover": { color: primaryMainLight } }} />,
                                rewind:     <FastRewind fontSize="1rem" sx={{ color: primary, "&:hover": { color: primaryMainLight } }} />,
                                loop:       <Repeat fontSize="1rem" sx={{ color: primary, "&:hover": { color: primaryMainLight } }} />,
                                volume:     <VolumeUp fontSize="1rem" sx={{ color: primary, "&:hover": { color: primaryMainLight } }} />,
                                volumeMute: <VolumeMute fontSize="1rem" sx={{ "&:hover": { color: primaryMainLight } }} />,        
                            }}
                            customAdditionalControls={
                                [
                                    RHAP_UI.LOOP,
                                    <FlexBetween onClick={() => downloadAttachment()}>
                                        <FileDownload sx={{ fontSize: "27px", "&:hover": { color: primary } }} />, 
                                    </FlexBetween>
                                ]
                            }
                        />
                    </Box>
                )
            )}

            <Divider />

            {/* Like, Comment, Share, Delete */}
            <FlexBetween mt="0.25rem">

                {/* Like, Comment, Share */}
                <FlexBetween gap="0.5rem">

                    {/* Like Button and Like Counter */}
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike} disabled={loggedInUser === null}>
                            {isLiked ? 
                                <FavoriteOutlined sx={{ color: primary }} />
                                : 
                                <FavoriteBorderOutlined />
                            }
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

                    {/* Share Post */}
                    <SharePost description={description} />
                </FlexBetween>

                {/* Delete */}
                <FlexBetween>
                    {(loggedInUser && postUserId === loggedInUser._id) &&  (
                        <IconButton onClick={() => deleteUserPost()}>
                            <Delete sx={{ "&:hover": { color: primary } }} />
                        </IconButton>
                    )}
                </FlexBetween>
            </FlexBetween>

            {/* Comment Section*/}
            {isComments && 
            (<Box mt="0.5rem">
                <Box sx={{ maxHeight: "30vh", overflowY: "auto" }}>
                    {comments.map((c) => (
                        <Comment 
                            key={`${c.userId}-${postId}-${Math.random()}`}
                            comment={c} postId={postId} 
                        />
                    ))}
                </Box>
                <Divider />
                {loggedInUser &&
                    <AddComment postId={postId} />
                }
            </Box>)
            }
        </WidgetWrapper>
        }
        </>
        
    )
};

export default PostWidget;