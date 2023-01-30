import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { setPosts } from "state";

import {
    AttachFileOutlined,
    GifBoxOutlined, ImageOutlined, MicOutlined, MoreHorizOutlined,
  } from "@mui/icons-material";
import {
    Divider, Typography, InputBase, Button, 
    Menu, MenuItem, useTheme, useMediaQuery,
} from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import ImageDropzone from "components/ImageDropzone";
import AudioDropzone from "components/AudioDropzone";

/**
 * MyPostWidget
 * The widget that the user uses to create a post
 */
const MyPostWidget = ({ picturePath }) => {

    const dispatch = useDispatch();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    // Theme Colors
    const { palette } = useTheme();
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
    const main = palette.primary.main;

    // User ID, Token, Posts (Frontend State)
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const posts = useSelector((state) => state.posts);

    // My Post Widget States
    const [post, setPost] = useState("");               // Post Content
    const [isImage, setIsImage] = useState(false);      // Will show image dropbox
    const [isGif, setIsGif] = useState(false);          // Will show clip dropbox (same as image dropbox)
    const [isAudio, setIsAudio] = useState(false);

    const [image, setImage] = useState(null);           // Optional image to include in post

    
    // Dropdown Menu (Mobile Screen)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };

    // Handle Image Click
    const handleImage = () => {

        // Reset isGif
        if (isGif || isAudio) {
            setIsGif(false); setIsAudio(false);
            setImage(null);
        }
        setIsImage(!isImage);
    }

    // Handle Gif Click
    const handleGif = () => {
        // Reset isImage
        if (isImage || isAudio) {
            setIsImage(false); setIsAudio(false);
            setImage(null);
        }
        setIsGif(!isGif);
    }

    // Handle Audio Click
    const handleAudio = () => {
        if (isImage || isGif) {
            setIsGif(false); setIsImage(false);
            setImage(null);
        }
        setIsAudio(!isAudio);
    }

    // POST API Call (Create Post)
    const handlePost = async () => {

        // Form Data: [userId, description, post image, post image path] (image is optional)
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        formData.append("serverPath", "/posts");                // Multer Disk Storage (Path)

        if (image) {
            const ext = image.path.split('.').pop();
            const postImagePath = `post${uuidv4().replaceAll('-', '')}.${ext}`;
    
            formData.append("picturePath", postImagePath);      // Rename Post Image
            formData.append("picture", image);
        }

        // Create Post in MongoDB
        await fetch(`http://localhost:3001/posts`, 
            {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            }
        ).then(async (response) => {
            // Response JSON Object (Newly Created Post)
            const jsonObject = await response.json();

            if (response.status === 201) {
                dispatch(setPosts({ posts: [...posts, jsonObject] }));          //  Updates Frontend State

                // Reset MyPostWidget
                setImage(null);
                setIsImage(false);
                setPost("");
            }
            else { console.error(jsonObject.message); }
        });
    }
    
    // My Post Widget 
    return (
        <>
        <WidgetWrapper mb="2rem">

            {/* Post Input */}
            <FlexBetween gap="1.5rem">
                <UserImage userId={_id} image={picturePath} />
                <InputBase  placeholder="What's on your mind..."
                    onChange={(e) => setPost(e.target.value)}
                    onKeyDown={(e) => { if (e.key === `Enter`) { handlePost() } }}
                    value={post}
                    sx={{
                        width: "100%", p: "1rem 2rem",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                    }}
                />
            </FlexBetween>

            {/* IMAGE DROPZONE */}
            {(isImage || isGif) && (
                <ImageDropzone image={image} setImage={setImage} staticImagesOnly={!isGif} />
            )}
            {isAudio &&
                <AudioDropzone audio={image} setAudio={setImage} />
            }

            <Divider sx={{ margin: "1.25rem 0" }} />

            {/* ICONS: Image, Clip, Attachment, Audio */}
            <FlexBetween>

                {/* ICONS: Desktop Only */}
                {isNonMobileScreens ? 
                    (<>
                        {/* IMAGE UPLOAD*/}
                        <FlexBetween gap="0.25rem" onClick={handleImage}
                        >
                            <ImageOutlined sx={{ color: isImage ? main : mediumMain }} />
                            <Typography color={mediumMain} sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
                                Image
                            </Typography>
                        </FlexBetween>

                        {/* GIF UPLOAD*/}
                        <FlexBetween gap="0.25rem" onClick={handleGif}
                        >
                            <GifBoxOutlined sx={{ color: isGif ? main : mediumMain }} />
                            <Typography color={mediumMain} sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
                                Gif
                            </Typography>
                        </FlexBetween>

                        {/* ATTACHMENT UPLOAD*/}
                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetween>

                        {/* AUDIO UPLOAD*/}
                        <FlexBetween gap="0.25rem" onClick={handleAudio}>
                            <MicOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>
                    </>)
                    :
                    (<>
                        {/* MOBILE SCREEN */}
                        <FlexBetween gap="0.25rem">
                            <Button id="expand-mobile-menu-button"
                                aria-controls={open ? 'expand-mobile-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <MoreHorizOutlined sx={{ color: open ? main : mediumMain }} />
                            </Button>
                        </FlexBetween>
                    </>)
                }

                {/* POST BUTTON */}
                <Button disabled={!post} onClick={handlePost}
                    sx={{ 
                        color: palette.background.alt, 
                        backgroundColor: main,
                        borderRadius: "3rem"
                    }}
                >
                    POST
                </Button>

            </FlexBetween>
        </WidgetWrapper>


        {/* MOBILE MENU */}
        <Menu id="expand-mobile-menu" anchorEl={anchorEl}
            open={open} onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'expand-mobile-menu-button', }}
        >
            <MenuItem onClick={handleClose}>
                <FlexBetween gap="0.25rem" onClick={handleImage}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Image</Typography>
                </FlexBetween>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <FlexBetween gap="0.25rem" onClick={handleGif}>
                    <GifBoxOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Gif</Typography>
                </FlexBetween>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <FlexBetween gap="0.25rem">
                    <AttachFileOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Attachment</Typography>
                </FlexBetween>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <FlexBetween gap="0.25rem">
                    <MicOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Audio</Typography>
                </FlexBetween>
            </MenuItem>
        </Menu>
        </>
    )
}

export default MyPostWidget;