import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfileUser } from "state";

import { Box, Typography, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import NavigateTop from "components/NavigateTop";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import WidgetWrapper from "components/WidgetWrapper";

/**
 * Home Page
 * The Home Page of Sociopedia
 */
const HomePage = () => {

    const dispatch = useDispatch();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");    // Mobile/PC

    // User, Token (Frontend)
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    // Update Profile User (Given a logged in user)
    useEffect(() => {
        if (token !== null) {
            dispatch(setProfileUser(user));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
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
                    {token !== null ?
                        <UserWidget userId={user._id} picturePath={user.picturePath} />
                        :
                        <WidgetWrapper>
                            <Typography variant="h5" sx={{ mb: "0.75rem", 
                                whiteSpace: "pre-wrap", wordBreak: "break-word", 
                                fontWeight: "700" }}
                            >
                                No Logged In User
                            </Typography>
                        </WidgetWrapper>
                    }
                </Box>

                {/* POST WIDGET */}
                <Box 
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    {token !== null &&
                        <MyPostWidget picturePath={user.picturePath} />
                    }
                    <PostsWidget />
                </Box>

                {/* ADVERT && FRIENDS LIST (DESKTOP ONLY) */}
                {isNonMobileScreens && (
                    <Box flexBasis={isNonMobileScreens ? "26%" : undefined}
                    >
                        <AdvertWidget />
                        {token !== null &&
                            <FriendListWidget userId={user._id} />
                        }
                    </Box>
                )}
            </Box>
            <NavigateTop />
        </Box>
    )
}

export default HomePage;