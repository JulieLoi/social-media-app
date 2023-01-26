import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import NavigateTop from "components/NavigateTop";
import { setProfileUser } from "state";

/**
 * Profile Page
 */
const ProfilePage = () => {

    const dispatch = useDispatch();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    // Logged In User
    const loggedInUser = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    // Profile User
    const { userId } = useParams();                                 // Gets the User ID of the Profile Page
    const profileUser = useSelector((state) => state.profileUser);
    const [userExists, setUserExists] = useState(null);           // Check Profile User Exists

    // Get User of the Profile Page
    const getUser = async () => {
        await fetch(`http://localhost:3001/users/${userId}`, 
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        ).then(async (response) => {
            // Response JSON Object
            const jsonObject = await response.json();

            if (response.status === 200) {
                dispatch(setProfileUser(jsonObject));   // Update Frontend State (Profile User)
                setUserExists(true);                    // Updates Profile Page State (User)
            }
            else { console.error(jsonObject.message); }
        })

    }

    // Get User Data for Profile Page
    useEffect(() => {
        getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // User Does Not Exist
    if (!userExists) { return null; }

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
                    {userId === loggedInUser._id &&
                        <>
                        <MyPostWidget picturePath={profileUser.picturePath} />
                        <Box m="2rem 0" />
                        </>
                    }
                    <PostsWidget userId={userId} isProfile={true} />
                </Box>
            </Box>
            <NavigateTop />
        </Box>
    )
}

export default ProfilePage;