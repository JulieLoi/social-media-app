
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import AddRemoveFriend from "./AddRemoveFriend"

/**
 * Friend Component
 * Usually used for the friend list
 * Also used for the top of a post widget
 */
const Friend = ({ id, name, location=null, occupation=null, picturePath, marginAmount="0" }) => {

    const navigate = useNavigate();
    const { palette } = useTheme();

    return (
        <>
        <FlexBetween>

            {/* User Profile Picture, Name, Location */}
            <FlexBetween gap="1rem">
                <UserImage userId={id} image={picturePath} size="55px" /> 
                <Box>
                    <Typography
                        color={palette.primary.dark} variant="h5" fontWeight="500"
                        sx={{ "&:hover": { color: palette.primary.main, cursor: "pointer", } }}
                        onClick={() => {
                            navigate(`/profile/${id}`);
                            navigate(0);                        // Refresh
                        }}
                    >
                        {name.length > 20 ? `${name.substring(0, 20)}...` : name}
                    </Typography>
                    <Typography color={palette.neutral.medium} fontSize="0.75rem">
                        {location === "" ? <i>No Location</i> : location}
                        {occupation === "" ? <i>No Occupation</i> : occupation}
                    </Typography>
                </Box>
            </FlexBetween>

            <AddRemoveFriend 
                otherUserId={id}
                marginAmount={marginAmount}
            />
        </FlexBetween>
        </>
    )
}

export default Friend;