import Dropzone from "react-dropzone";
import { Box, Typography, useTheme, } from "@mui/material";
import { EditOutlined, CloseOutlined, } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";

/**
 * Audio Dropzone Component
 * Drop attachment file here
 */
const AttachementDropzone = ({ attachment, setAttachment }) => {

    // Theme Colors
    const { palette } = useTheme();
    const medium = palette.neutral.medium;
    const main = palette.primary.main;

    // Dropzone
    const maxSize = 1048576*3; // 3MB

    return (
        <>
        <Box borderRadius="5px" border={`1px solid ${medium}`} mt="1rem" p="1rem">
            <Dropzone acceptedFiles=".jpeg,.png" multiple={false}
                onDrop={ (acceptedFiles, rejectedFiles) => {
                    //console.log("accepted files", acceptedFiles)
                    //console.log("rejected files", rejectedFiles)
                    setAttachment(acceptedFiles[0]);
                }}
                accept={{ 'application/pdf': ['.pdf'] }} 
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
                    {!attachment ? 
                        <div>Add Attachment Here (pdf) - 3MB
                        </div>
                        : 
                        <FlexBetween>
                            <Typography>{attachment.name}</Typography>
                            <FlexBetween>
                                <EditOutlined sx={{ "&:hover": { color: main, cursor: "pointer" } }} />
                                <CloseOutlined onClick={() => setAttachment(null)}
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

export default AttachementDropzone;