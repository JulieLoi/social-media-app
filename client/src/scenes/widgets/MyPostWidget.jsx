import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
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

    // User ID and Token (State)
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    // POST API Call (Create Post)
    const handlePost = async () => {

        // Form Data: [userId, description, picture, picturePath] (image is optional)
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", picturePath);
        }

        // Create Post in MongoDB
        const response = await fetch(`http://localhost:3001/posts`, 
            {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            }
        );
        const posts = await response.json();
        dispatch(setPosts({ posts }));          //  Updates Frontend State

        // Reset MyPostWidget
        setImage(null);
        setPost("");
    }
    
    // My Post Widget 
    return (
        <WidgetWrapper>

            {/* Post Input */}
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath} />
                <InputBase 
                    placeholder="What's on your mind..."
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        p: "1rem 2rem"
                    }}
                />
            </FlexBetween>

            {/* Image Dropzone */}
            {isImage && (
                <Box borderRadius="5px" border={`1px solid ${medium}`} mt="1rem" p="1rem">
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) =>
                            setImage("picture", acceptedFiles[0])
                        }
                    >
                        {({ getRootProps, getInputProps }) => (
                        <FlexBetween>
                            <Box
                                {...getRootProps()}
                                border={`2px dashed ${palette.primary.main}`}
                                p="1rem" 
                                width="100%"
                                sx={{ "&:hover": { cursor: "pointer" } }}
                            >
                                <input {...getInputProps()} />
                                {!image ? (
                                <p>Add Image Here</p>
                                ) : (
                                <FlexBetween>
                                    <Typography>{image.name}</Typography>
                                    <EditOutlined />
                                </FlexBetween>
                                )}
                            </Box>
                            {image && (
                                <IconButton onClick={() => setImage(null)}
                                    sx={{ width: "25%" }}
                                >
                                    <DeleteOutlined />
                                </IconButton>
                            )}
                        </FlexBetween>
                        )}

                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: "1.25rem 0" }} />

            {/* Icons: Image, Clip, Attachment, Audio */}
            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography 
                        color={mediumMain} 
                        sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                    >
                        Image
                    </Typography>
                </FlexBetween>

                {isNonMobileScreens ? 
                    (
                        <>
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
                        </>
                    )
                    :
                    (
                        <>
                            <FlexBetween gap="0.25rem">
                                <MoreHorizOutlined sx={{ color: mediumMain }} />
                            </FlexBetween>
                        </>
                    )
                }

                {/* POST Button */}
                <Button
                    disabled={!post}
                    onClick={handlePost}
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
    )
}

export default MyPostWidget;