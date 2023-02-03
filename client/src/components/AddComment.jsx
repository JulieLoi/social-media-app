import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

import { InputBase, Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

/**
 * AddComment
 * Component for adding a comment
 */
const AddComment = ({ postId }) => {

    const dispatch = useDispatch();
    const { palette } = useTheme();

    // Token, Logged In User (Frontend State)
    const token = useSelector((state) => state.token);
    const loggedInUser = useSelector((state) => state.user);

    // Making a Comment
    const [userComment, setUserComment] = useState("");
    const [remainChar, setRemainChar] = useState(100);

    // Add Comment to Post (postId) (/posts PATCH API CALL)
    const addComment = async () => {
        await fetch(`${process.env.REACT_APP_POSTS_BACKEND_URL}/${postId}/comment`,
            {
                method: "PATCH",
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    userId: loggedInUser._id, 
                    comment: userComment 
                }),
            }
        ).then(async (response) => {
            const responseJSON = await response.json();
            if (response.status === 200) {
                dispatch(setPost({ post: responseJSON.post })); 
                setUserComment("");                             
            }
            else { console.error(responseJSON.message); }
        });
    }

    // Component to add a comment to a post
    return (
        <>
        <FlexBetween mt="1rem">
            <UserImage image={loggedInUser.picturePath} size={"50px"} />
            <InputBase placeholder="Type your comment here..."
                onChange={(e) => {
                    const commentLength = e.target.value.length;
                    if (commentLength <= 100) {
                        setRemainChar(100 - commentLength);
                        setUserComment(e.target.value);
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === `Enter`) { 
                        addComment();
                        setRemainChar(100);
                    }
                }}
                value={userComment}
                maxLength="100"
                sx={{
                    width: "100%", maxLength: "100",
                    backgroundColor: palette.neutral.light,
                    borderRadius: "2rem",
                    p: "0.5rem 1rem", ml: "0.5rem",
                }}
            />
        </FlexBetween>
        <Box ml="4rem" mb="0.25rem" mt="0.25rem">
        <Typography color={palette.neutral.medium}>
            Remaining Character(s): {remainChar} 
        </Typography>
        </Box>
    </>)
}

export default AddComment;