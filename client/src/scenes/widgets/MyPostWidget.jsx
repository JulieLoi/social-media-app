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
import AttachementDropzone from "components/AttachmentDropzone";

// File Enum
const FileType = {
    Image: 'IMAGE',
    Gif: 'GIF',
    Attachment: 'ATTACHMENT',
    Audio: 'AUDIO',
}

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
    const [post, setPost] = useState("");                   // Post Content
    const [isFileType, setIsFileType] = useState(null);     // Will show a certain dropzone
    const [file, setFile] = useState(null);                 // Optional image/gif/attachment/audio to include in post

    // Dropdown Menu (Mobile Screen)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };

    // Handle File Dropzone Selection
    const handleFileType = (fileType) => {
        if (isFileType !== fileType) {
            setIsFileType(fileType);
            setFile(null);
        }
        else { setIsFileType(null); }
    }

    // Creates a post (/posts POST API CALL)
    const handlePost = async () => {

        // Form Data: [userId, description, post file, post file path] (file is optional)
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        formData.append("serverPath", "/posts");    // Multer Disk Storage (Path)

        // Path for file (image/gif/attachment/audio)
        if (file) {
            const ext = file.path.split('.').pop();
            let postImagePath = `post${uuidv4().replaceAll('-', '')}.${ext}`;

            // Keep original file name for attachment/audio
            if (isFileType === FileType.Attachment || isFileType === FileType.Audio) {
                postImagePath = `post${uuidv4().replaceAll('-', '')}${file.path}`;
            }
    
            formData.append("picturePath", postImagePath);      // Rename Post Image
            formData.append("attachment", file);
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
                setFile(null);
                setIsFileType(false);
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

            {/* FILE DROPZONES */}
            {(isFileType === FileType.Image || isFileType === FileType.Gif) && 
                <ImageDropzone image={file} setImage={setFile} staticImagesOnly={isFileType === FileType.Image} />
            }
            
            {isFileType === FileType.Attachment &&
                <AttachementDropzone attachment={file} setAttachment={setFile} />
            }
            {isFileType === FileType.Audio &&
                <AudioDropzone audio={file} setAudio={setFile} />
            }

            <Divider sx={{ margin: "1.25rem 0" }} />

            {/* ICONS: Image, Clip, Attachment, Audio */}
            <FlexBetween>

                {/* ICONS: Desktop Only */}
                {isNonMobileScreens ? 
                    (<>
                        {/* IMAGE UPLOAD*/}
                        <FlexBetween gap="0.25rem" onClick={() => handleFileType(FileType.Image)}
                        >
                            <ImageOutlined sx={{ color: (isFileType === FileType.Image) ? main : mediumMain }} />
                            <Typography color={mediumMain} sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
                                Image
                            </Typography>
                        </FlexBetween>

                        {/* GIF UPLOAD*/}
                        <FlexBetween gap="0.25rem" onClick={() => handleFileType(FileType.Gif)}
                        >
                            <GifBoxOutlined sx={{ color: (isFileType === FileType.Gif) ? main : mediumMain }} />
                            <Typography color={mediumMain} sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
                                Gif
                            </Typography>
                        </FlexBetween>

                        {/* ATTACHMENT UPLOAD*/}
                        <FlexBetween gap="0.25rem" onClick={() => handleFileType(FileType.Attachment)}>
                            <AttachFileOutlined sx={{ color: (isFileType === FileType.Attachment) ? main : mediumMain }} />
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetween>

                        {/* AUDIO UPLOAD*/}
                        <FlexBetween gap="0.25rem" onClick={() => handleFileType(FileType.Audio)}>
                            <MicOutlined sx={{ color: (isFileType === FileType.Audio) ? main : mediumMain }} />
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
                <FlexBetween gap="0.25rem" onClick={() => handleFileType(FileType.Image)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Image</Typography>
                </FlexBetween>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <FlexBetween gap="0.25rem" onClick={() => handleFileType(FileType.Gif)}>
                    <GifBoxOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Gif</Typography>
                </FlexBetween>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <FlexBetween gap="0.25rem" onClick={() => handleFileType(FileType.Attachment)}>
                    <AttachFileOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Attachment</Typography>
                </FlexBetween>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <FlexBetween gap="0.25rem" onClick={() => handleFileType(FileType.Audio)}>
                    <MicOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Audio</Typography>
                </FlexBetween>
            </MenuItem>
        </Menu>
        </>
    )
}

export default MyPostWidget;