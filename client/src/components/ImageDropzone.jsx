import Dropzone from "react-dropzone";
import { Box, Typography, useTheme, } from "@mui/material";
import { EditOutlined, CloseOutlined, } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";

/**
 * Image Dropzone Component
 * Drop image here
 */
const ImageDropzone = ({ image, setImage, staticImagesOnly=true }) => {

    // Theme Colors
    const { palette } = useTheme();
    const medium = palette.neutral.medium;
    const main = palette.primary.main;

    // Dropzone
    const maxSize = 1048576*10; // 10MB


    return (
        <>
        <Box borderRadius="5px" border={`1px solid ${medium}`} mt="1rem" p="1rem">
            <Dropzone acceptedFiles=".jpeg,.png" multiple={false}
                onDrop={ (acceptedFiles, rejectedFiles) => {
                    //console.log("accepted files", acceptedFiles)
                    //console.log("rejected files", rejectedFiles)
                    setImage(acceptedFiles[0]);
                }}
                accept={ staticImagesOnly ? 
                    { 'image/jpeg': ['.jpeg', '.jpg'], 'image/png': ['.png'] } 
                    : 
                    { 'image/gif': ['.gif'] } 
                } 
                minSize={0}
                maxSize={maxSize}
            >
                {({ getRootProps, getInputProps }) => (
                <Box
                    {...getRootProps()}
                    border={`2px dashed ${main}`}
                    p="1rem" sx={{ "&:hover": { cursor: "pointer" } }}
                >
                    <input {...getInputProps()} />
                    {!image ? 
                        <div>{ staticImagesOnly ? 
                            "Add Image Here - 10MB"
                            :
                            "Add Gif Here - 10MB"
                        }
                        </div>
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