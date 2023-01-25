import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";  
import UserImage from "./UserImage"
import { useEffect } from "react";

const Comment = ({comment, palette}) => {

    const navigate = useNavigate();
    const token = useSelector((state) => state.token);

    // Commenter Information
    const [commenter, setCommenter] = useState(null);

    // GET API Call (Get User)
    const getUser = async () => {
        await fetch(`http://localhost:3001/users/${comment.userId}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            }
        ).then(async (response) => {
            // Response JSON Object
            const jsonObject = await response.json();

            if (response.status === 200) {
                setCommenter(jsonObject);
            }
            else {
                console.log(jsonObject.message);
            }
        });
    }

    useEffect(() => {
        getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box >
        <Divider />
        {commenter !== null &&
        <Box p="0.5rem 0">
            <Box display="flex" gap="1rem" alignItems="center" ml="1rem">
                <UserImage image={commenter.picturePath} size={"30px"} />
                <Typography variant="h5"
                    sx={{
                        "&:hover": {
                            color: palette.primary.main,
                            cursoer: "pointer",
                        }
                    }}
                    onClick={() => {
                        navigate(`/profile/${comment.userId}`);
                        navigate(0);        // Refresh
                    }}
                >
                        {`${commenter.firstName} ${commenter.lastName}`}
                </Typography>
            </Box>
                
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