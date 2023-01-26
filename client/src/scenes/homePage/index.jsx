import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import { setProfileUser, setAd } from "state";
import { useEffect } from "react";

/**
 * Home Page
 * The Home Page of Sociopedia
 */
const HomePage = () => {

    const dispatch = useDispatch();
    const { palette } = useTheme();    
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");    // Mobile/PC

    const user = useSelector((state) => state.user);
    const { _id, picturePath } = useSelector((state) => state.user);    // User ID, User Image

    // GET API Call (Get Single Random Ad)
    const getAdvertisement = async () => {
        await fetch(`http://localhost:3001/advertisements/`, 
        {
            method: "GET",
        }
        ).then(async (response) => {
            // Response JSON Object
            const jsonObject = await response.json();

            if (response.status === 200) {
                let randomIndex = Math.floor(Math.random() * jsonObject.length);
                dispatch(setAd(jsonObject[randomIndex]));
            }
            else { console.error(jsonObject.message); }
        })
    };

    // Update Profile User
    useEffect(() => {
        dispatch(setProfileUser(user)); 
        getAdvertisement();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                        color: palette.primary.light, fontSize: isNonMobileScreens ? "4rem" : "3rem",
                        "&:hover": { color: palette.primary.main }
                    }}
                />
            </IconButton>
            
        </Box>
    )
}

export default HomePage;