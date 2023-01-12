import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);

    return (
        <Box>
            <Navbar />
            <Box
                width="100%" p="2rem 6%" gap="0.5rem"
                display={isNonMobileScreens ? "flex" : "block"}
                justifyContent="space-between"
            >
                {/* USER WIDGET */}
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget 
                        userId={_id}
                        picturePath={picturePath}
                    />
                </Box>

                {/* POST WIDGET */}
                <Box 
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPostWidget picturePath={picturePath} />
                    <PostsWidget userId={_id} />
                </Box>

                {/* FRIENDS LIST (DESKTOP ONLY) */}
                {isNonMobileScreens && (
                    <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                        <AdvertWidget />
                        <Box m="2rem 0">
                            <FriendListWidget userId={_id} />
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default HomePage;