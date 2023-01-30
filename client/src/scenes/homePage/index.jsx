import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfileUser } from "state";

import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import NavigateTop from "components/NavigateTop";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

/**
 * Home Page
 * The Home Page of Sociopedia
 */
const HomePage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");    // Mobile/PC

    // User, Token (Frontend)
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    // Update Profile User (Go to Login/Register if no token)
    useEffect(() => {
        if (token !== null) { navigate(`/home`) }
        dispatch(setProfileUser(user)); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
        {user != null &&
        <Box>
            <Navbar />
            
            {/* ALL WIDGETS */}
            <Box
                width="100%" p="2rem 6%" gap="0.5rem"
                display={isNonMobileScreens ? "flex" : "block"}
                justifyContent="space-between"
            >
                {/* USER WIDGET */}
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={user._id} picturePath={user.picturePath} />
                </Box>

                {/* POST WIDGET */}
                <Box 
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPostWidget picturePath={user.picturePath} />
                    <PostsWidget userId={user._id} />
                </Box>

                {/* ADVERT && FRIENDS LIST (DESKTOP ONLY) */}
                {isNonMobileScreens && (
                    <Box flexBasis={isNonMobileScreens ? "26%" : undefined}
                    >
                        <AdvertWidget />
                        <FriendListWidget userId={user._id} />
                    </Box>
                )}
            </Box>
            <NavigateTop />
        </Box>
        }
        </>
    )
}

export default HomePage;