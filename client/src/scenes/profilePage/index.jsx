import { Box, useMediaQuery, IconButton, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';

import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

/**
 * Profile Page
 */
const ProfilePage = () => {

    const [user, setUser] = useState(null);
    const { userId } = useParams();                                 // Gets the User ID of the Profile Page
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { palette } = useTheme();

    // Get User of the Profile Page
    const getUser = async () => {

        // GET API Call (Get User Information)
        const response = await fetch(`http://localhost:3001/users/${userId}`, 
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        // Get Backend Response (Profile User Data)
        const data = await response.json();
        setUser(data);                          // Updates Profile Page State (User)
    }

    // Get User Data for Profile Page
    useEffect(() => {
        getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // User Does Not Exist
    if (!user) {
        return null;
    }

    // Profile Page
    return (
        <Box>
            <Navbar />
            <Box
                width="100%" p="2rem 6%" gap="2rem"
                display={isNonMobileScreens ? "flex" : "block"}
                justifyContent="center"
            >
                {/* USER WIDGET */}
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget 
                        userId={userId}
                        picturePath={user.picturePath}
                    />
                    <FriendListWidget userId={userId} stickyTop="36rem" />
                </Box>

                {/* POST WIDGET */}
                <Box 
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? "0rem" : "2rem"}
                >
                    <MyPostWidget picturePath={user.picturePath} />
                    <Box m="2rem 0" />
                    <PostsWidget userId={userId} isProfile={true} />
                </Box>

            </Box>

            {/* NAVIGATE TOP ICON */}
            <IconButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth", })}>
                <ArrowCircleUpRoundedIcon 
                    sx={{ 
                        position: "fixed", bottom: "0.5rem", right: "0.5rem", 
                        color: palette.primary.light, fontSize: "3rem",
                        "&:hover": { color: palette.primary.main }
                    }}
                />
            </IconButton>
        </Box>
    )
}

export default ProfilePage;