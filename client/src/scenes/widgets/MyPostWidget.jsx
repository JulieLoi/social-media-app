import {
    EditOutlined, AttachFileOutlined,
    GifBoxOutlined, ImageOutlined,
    MicOutlined, MoreHorizOutlined,
  } from "@mui/icons-material";
  import {
    Box, Divider, Typography,
    InputBase, Button, Menu, MenuItem,
    useTheme, useMediaQuery,
  } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Dropzone from "react-dropzone";
  import UserImage from "components/UserImage";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPosts } from "state";


/**
 * MyPostWidget
 * The widget that the user uses to create a post
 */
const MyPostWidget = ({ picturePath }) => {

    const dispatch = useDispatch();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    // My Post Widget States
    const [isImage, setIsImage] = useState(false);  // Will show image dropbox
    const [image, setImage] = useState(null);       // Optional image to include in post
    const [post, setPost] = useState("");           // Post Content
    
    // Theme Colors
    const { palette } = useTheme();
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    // User ID, Token, Posts (Frontend State)
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const posts = useSelector((state) => state.posts);

    // Dropdown Menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };

    // POST API Call (Create Post)
    const handlePost = async () => {

        // Form Data: [userId, description, post image, post image path] (image is optional)
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.path);
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
            else {
                console.error(jsonObject.message);
            }
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
            {isImage && (
                <Box borderRadius="5px" border={`1px solid ${medium}`} mt="1rem" p="1rem">
                    <Dropzone acceptedFiles=".jpg,.jpeg,.png" multiple={false}
                        onDrop={ (acceptedFiles) =>  setImage(acceptedFiles[0]) }
                    >
                        {({ getRootProps, getInputProps }) => (
                        <Box
                            {...getRootProps()}
                            border={`2px dashed ${palette.primary.main}`}
                            p="1rem" sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                            <input {...getInputProps()} />
                            {!image ? 
                                <div>Add Image Here</div>
                                : 
                                <FlexBetween>
                                    <Typography>{image.name}</Typography>
                                    <EditOutlined />
                                </FlexBetween>
                            }
                        </Box>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: "1.25rem 0" }} />

            {/* ICONS: Image, Clip, Attachment, Audio */}
            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: isImage ? palette.primary.main : mediumMain }} />
                    <Typography color={mediumMain} sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
                        Image
                    </Typography>
                </FlexBetween>

                {/* ICONS: Desktop Only */}
                {isNonMobileScreens ? 
                    (<>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>
                    </>)
                    :
                    (<>
                        <FlexBetween gap="0.25rem">
                            <Button id="expand-mobile-menu-button"
                                aria-controls={open ? 'expand-mobile-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <MoreHorizOutlined sx={{ color: open ? palette.primary.main : mediumMain }} />
                            </Button>
                        </FlexBetween>
                    </>)
                }

                {/* POST BUTTON */}
                <Button disabled={!post} onClick={handlePost}
                    sx={{ 
                        color: palette.background.alt, 
                        backgroundColor: palette.primary.main,
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
                <FlexBetween gap="0.25rem">
                    <GifBoxOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Clip</Typography>
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