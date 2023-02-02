import Dropzone from "react-dropzone";
import { Box, Typography, useTheme, } from "@mui/material";
import { EditOutlined, CloseOutlined, } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";

/**
 * Audio Dropzone Component
 * Drop audio file here
 */
const AudioDropzone = ({ audio, setAudio }) => {

    // Theme Colors
    const { palette } = useTheme();
    const medium = palette.neutral.medium;
    const main = palette.primary.main;

    // Dropzone
    const maxSize = 1048576*5; // 5MB

    return (
        <>
        <Box borderRadius="5px" border={`1px solid ${medium}`} mt="1rem" p="1rem">
            <Dropzone acceptedFiles=".jpeg,.png" multiple={false}
                onDrop={ (acceptedFiles, rejectedFiles) => {
                    //console.log("accepted files", acceptedFiles)
                    //console.log("rejected files", rejectedFiles)
                    setAudio(acceptedFiles[0]);
                }}
                accept={{ 'audio/ogg': ['.ogg'], 'audio/wav': ['.wav'], 'audio/mpeg': ['.mp3'],  }} 
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
                    {!audio ? 
                        <div>Add Audio Clip Here (ogg, wav, mp3) - 5MB
                        </div>
                        : 
                        <FlexBetween>
                            <Typography>{audio.name}</Typography>
                            <FlexBetween>
                                <EditOutlined sx={{ "&:hover": { color: main, cursor: "pointer" } }} />
                                <CloseOutlined onClick={() => setAudio(null)}
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

export default AudioDropzone;