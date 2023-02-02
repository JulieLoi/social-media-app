import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Divider, Typography, useTheme } from "@mui/material";
import UserImage from "./UserImage"

const Comment = ({ comment }) => {

    const navigate = useNavigate();
    const { palette } = useTheme();

    // Commenter Information
    const [commenter, setCommenter] = useState(null);

    // Gets Owner of Comment (/users GET API CALL)
    const getCommenter = async () => {
        await fetch(`http://localhost:3001/users/${comment.userId}`, { method: "GET" }
        ).then(async (response) => {
            const responseJSON = await response.json();
            if (response.status === 200) { setCommenter(responseJSON.user); }
            else { console.error(responseJSON.message); }
        });
    }

    useEffect(() => {
        getCommenter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box >
        <Divider />
        {commenter !== null &&
        <Box p="0.5rem 0">
            {/* Commenter Profile Image and Name */}
            <Box display="flex" gap="1rem" alignItems="center" ml="1rem">
                <UserImage image={commenter.picturePath} size={"30px"} />
                <Typography variant="h5"
                    sx={{ "&:hover": { color: palette.primary.main, cursor: "pointer", } }}
                    onClick={() => {
                        navigate(`/profile/${comment.userId}`);
                        navigate(0);        // Refresh
                    }}
                >
                    {`${commenter.firstName} ${commenter.lastName}`}
                </Typography>
            </Box>
                
            {/* Comment */}
            <Box ml="3rem">
                <Typography noWrap
                    sx={{ 
                        color: palette.neutral.main, m: "0.25rem 0", pl: "1rem",
                        whiteSpace: "pre-wrap", wordBreak: "break-word",
                    }}
                >
                    {comment.comment}
                </Typography>
            </Box>
            </Box>}
        </Box>
    )
};

export default Comment;