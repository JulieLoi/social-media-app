import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setProfileUser } from "state";

import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import NavigateTop from "components/NavigateTop";

/**
 * Profile Page
 */
const ProfilePage = () => {

    const dispatch = useDispatch();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    // Logged In User
    const loggedInUser = useSelector((state) => state.user);

    // Profile User
    const { userId } = useParams();                                 // Gets the User ID of the Profile Page
    const profileUser = useSelector((state) => state.profileUser);

    // Get the Profile Page's User (/users GET API CALL)
    const getProfileUser = async () => {
        await fetch(`${process.env.REACT_APP_USERS_BACKEND_URL}/${userId}`, { method: "GET" }
        ).then(async (response) => {
            const responseJSON = await response.json();
            if (response.status === 200) { dispatch(setProfileUser(responseJSON.user)); }
            else { console.error(responseJSON.message); }
        })

    }

    // Get User Data for Profile Page
    useEffect(() => {
        getProfileUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // User Does Not Exist
    if (!profileUser) { return null; }

    // Profile Page
    return (
        <>
        {profileUser != null &&
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
                        picturePath={profileUser.picturePath}
                    />
                    <FriendListWidget 
                        userId={userId} stickyTop="36rem" 
                        allowAddRemove={true} isProfile={true} 
                    />
                </Box>

                {/* POST WIDGET */}
                <Box 
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? "0rem" : "2rem"}
                >
                    {(loggedInUser && userId === loggedInUser._id) &&
                        <>
                        <MyPostWidget picturePath={profileUser.picturePath} />
                        <Box m="2rem 0" />
                        </>
                    }
                    <PostsWidget userId={userId} />
                </Box>
            </Box>
            <NavigateTop />
        </Box>
        }
        </>
    )
}

export default ProfilePage;