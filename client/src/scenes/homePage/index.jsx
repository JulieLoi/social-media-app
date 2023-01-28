import { useEffect } from "react";
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
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");    // Mobile/PC

    const user = useSelector((state) => state.user);
    const { _id, picturePath } = useSelector((state) => state.user);    // User ID, User Image

    // Update Profile User
    useEffect(() => {
        dispatch(setProfileUser(user)); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>

                {/* POST WIDGET */}
                <Box 
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPostWidget picturePath={picturePath} />
                    <PostsWidget userId={_id} />
                </Box>

                {/* ADVERT && FRIENDS LIST (DESKTOP ONLY) */}
                {isNonMobileScreens && (
                    <Box flexBasis={isNonMobileScreens ? "26%" : undefined}
                    >
                        <AdvertWidget />
                        <FriendListWidget userId={_id} />
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