import Dropzone from "react-dropzone";
import { Box, Typography, useTheme, } from "@mui/material";
import { EditOutlined, CloseOutlined, } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";

/**
 * Image Dropzone Component
 * Drop image here
 */
const ImageDropzone = ({ image, setImage }) => {

    // Theme Colors
    const { palette } = useTheme();
    const medium = palette.neutral.medium;
    const main = palette.primary.main;

    return (
        <>
        <Box borderRadius="5px" border={`1px solid ${medium}`} mt="1rem" p="1rem">
            <Dropzone acceptedFiles=".jpg,.jpeg,.png" multiple={false}
                onDrop={ (acceptedFiles) => setImage(acceptedFiles[0]) }
            >
                {({ getRootProps, getInputProps }) => (
                <Box
                    {...getRootProps()}
                    border={`2px dashed ${main}`}
                    p="1rem" sx={{ "&:hover": { cursor: "pointer" } }}
                >
                    <input {...getInputProps()} />
                    {!image ? 
                        <div>Add Image Here</div>
                        : 
                        <FlexBetween>
                            <Typography>{image.name}</Typography>
                            <FlexBetween>
                                <EditOutlined sx={{ "&:hover": { color: main, cursor: "pointer" } }} />
                                <CloseOutlined onClick={() => setImage(null)}
                                    sx={{ "&:hover": { color: main, cursor: "pointer" } }}
                                />
                            </FlexBetween>
                        </FlexBetween>
                    }
                </Box>
                )}
            </Dropzone>
        </Box>
        </>
    )
}

export default ImageDropzone;