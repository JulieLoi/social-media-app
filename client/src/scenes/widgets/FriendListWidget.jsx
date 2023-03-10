import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setProfileUser, setFriends } from "state";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";

/**
 * Friends List Widget
 * The widget that contains the list of the user's friends
 */
const FriendListWidget = ({ userId }) => {

    const dispatch = useDispatch();
    
    // Theme
    const { palette } = useTheme();

    // Logged In User, Token
    const loggedInUser = useSelector((state) => state.user);

    // Profile User (Frontend State)
    const { userId: profileId } = useParams();     // Profile User ID (from params)
    const profileUser = useSelector((state) => state.profileUser);

    // Gets all friends of user (userId) (/users GET API CALL)
    const getFriends = async (updateUser=false) => {
        await fetch(`${process.env.REACT_APP_USERS_BACKEND_URL}/${userId}/friends`, { method: "GET", }
        ).then(async (response) => {
            const responseJSON = await response.json();

            // Updates Friends List (Profile User, Logged In User)
            if (response.status === 200) {
                dispatch(setProfileUser({ ...profileUser, friends: responseJSON.friends }));     
                if (updateUser) {
                    dispatch(setFriends({ friends: responseJSON.friends }));  
                }
            }
            else { console.error(responseJSON.message); }
        });
    }

    useEffect(() => {
        // Profile, Home
        if (profileId === profileUser._id) { getFriends(); }
        else if (loggedInUser._id === profileUser._id) { getFriends(true); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

 
    // Friend List Widget
    return (
        <>
        {profileUser.friends !== null &&
        <WidgetWrapper mt="1.5rem">

            {/* FRIENDS LIST TITLE */}
            <Typography color={palette.neutral.dark} variant="h5" fontWeight="500" sx={{ mb: "0.5rem" }}>
                Friends List
            </Typography>

            <Divider />

            {/* FRIENDS LIST */}
            <Box 
                display="flex" flexDirection="column" 
                gap="1.5rem" p="0.75rem 0"
                sx={{ maxHeight: "30vh", overflowY: "auto" }}
            >
                {profileUser.friends.map((friend) => (
                    <Friend 
                        key={`${friend._id}_${userId}-${Math.random()}`}
                        id={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        occupation={friend.occupation}
                        picturePath={friend.picturePath}
                        marginAmount={"1rem"}
                    />
                ))}
            </Box>
        </WidgetWrapper>
        }
        </>
    )
}

export default FriendListWidget;
