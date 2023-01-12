import { 
    ManageAccountsOutlined, 
    EditOutlined, 
    LocationOnOutlined, 
    WorkOutlineOutlined 
} from "@mui/icons-material";
import {
    Box, Typography, Divider, useTheme
} from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * User Widget
 * The left-sided widget that displays some user information on the Home Page
 */
const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);

    // Palette Theme
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    // GET API Call (Get User)
    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            }
        )

        // Get Backend Response
        const data = await response.json();
        setUser(data);          // Set User Data in 'user'
    }

    // Gets the user
    useEffect(() => {
        getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // No User, return null
    if (!user) {
        return null;
    }

    // Destructure the User
    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends
    } = user;

    //
    return (
        <WidgetWrapper>

            {/* FIRST ROW: Profile Image, Name, Friend Count, Profile Page Button */}
            <FlexBetween gap="0.5rem" pb="1.1rem">
                <FlexBetween gap="1rem">
                    <div >
                        <UserImage 
                            userId={userId}
                            image={picturePath} 
                            sx={{
                                "&:hover": { transform: "scale(1.1)"}
                            }}
                        />
                    </div>
                    <Box>
                        <Typography
                            variant="h4" color={dark} fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                                }
                            }}
                            onClick={() => navigate(`/profile/${userId}`)}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>
                            {friends.length} friends
                        </Typography>
                    </Box>
                    
                </FlexBetween>
                    <ManageAccountsOutlined 
                        sx={{ 
                            color: main, 
                            "&:hover": { cursor: "pointer", color: primary } 
                        }} 
                    />
            </FlexBetween>

            <Divider />

            {/* SECOND ROW: Location/Occupation */}
            <Box p="1rem 0rem">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>
            
            <Divider />

            {/* THIRD ROW: View Profile/Impressions Count */}
            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Who's viewed your profile</Typography>
                    <Typography color={medium} fontWeight="500">{viewedProfile}</Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography color={medium}>Impressions of your post</Typography>
                    <Typography color={medium} fontWeight="500">{impressions}</Typography>
                </FlexBetween>
            </Box>

            <Divider />

            {/* FOURTH ROW: Social Profiles */}
            <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Social Profiles
                </Typography>

                {/* Twitter */}
                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/twitter.png" alt="twitter" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color={medium}>
                                Social Network
                            </Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined 
                        onClick={() => window.open("https://twitter.com/")}
                        sx={{ 
                            color: main, 
                            "&:hover": { cursor: "pointer", color: primary } 
                        }} 
                    />
                </FlexBetween>

                {/* LinkedIn */}
                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                LinkedIn
                            </Typography>
                            <Typography color={medium}>
                                Network Platform
                            </Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined 
                        onClick={() => window.open("https://www.linkedin.com/")}
                        sx={{ 
                            color: main, 
                            "&:hover": { cursor: "pointer", color: primary } 
                        }} 
                    />
                </FlexBetween>

            </Box>
        </WidgetWrapper>
    )
}

export default UserWidget;