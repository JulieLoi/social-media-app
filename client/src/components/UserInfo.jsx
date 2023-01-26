import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

/**
 * UserInfo Component
 * Component consists of a user's image, name, and location
 */
const UserInfo = ({ userId, userImage, userName, userLocation }) => {

    const navigate = useNavigate();
    const { palette } = useTheme();

    return (
        <>
        {/* User Profile Picture, Name, Location */}
        <FlexBetween gap="1rem">
            <UserImage userId={userId} image={userImage} size="55px" /> 
            <Box>
                <Typography
                    color={palette.primary.dark} variant="h5" fontWeight="500"
                    sx={{ "&:hover": { color: palette.primary.main, cursor: "pointer", } }}
                    onClick={() => {
                        navigate(`/profile/${userId}`);
                    }}
                >
                    {userName.length > 20 ? `${userName.substring(0, 20)}...` : userName}
                </Typography>
                <Typography color={palette.neutral.medium} fontSize="0.75rem">
                    {userLocation === "" ? <i>No Location</i> : userLocation}
                </Typography>
            </Box>
        </FlexBetween>
        </>
    )
}

export default UserInfo;