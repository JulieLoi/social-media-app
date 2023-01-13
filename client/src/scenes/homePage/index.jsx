import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import Navbar from "scenes/navbar";
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

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);
    const { palette } = useTheme();

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

                {/* ADVERT && FRIENDS LIST (DESKTOP ONLY) */}
                {isNonMobileScreens && (
                    <Box flexBasis={isNonMobileScreens ? "26%" : undefined}
                    >
                        <AdvertWidget />
                        <FriendListWidget userId={_id} />
                    </Box>
                )}
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

export default HomePage;