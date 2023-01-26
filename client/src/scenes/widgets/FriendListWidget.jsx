import { Box, Typography, Divider, useTheme } from "@mui/material";
import NewFriendComponent from "components/NewFriendComponent";
import WidgetWrapper from "components/WidgetWrapper";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setProfileUser, setFriends } from "state";
import { useEffect } from "react";

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
    const token = useSelector((state) => state.token)

    // Profile User (Frontend State)
    const { userId: profileId } = useParams();     // Profile User ID (from params)
    const profileUser = useSelector((state) => state.profileUser);

    // GET API Call (Get All User Friends)
    const getFriends = async (updateUser) => {
        await fetch(`http://localhost:3001/users/${userId}/friends`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`},
            }
        ).then(async (response) => {
            // Response JSON Object
            const jsonObject = await response.json();

            if (response.status === 200) {
                // Update Frontend State  
                dispatch(setProfileUser({ ...profileUser, friends: jsonObject }));     
                
                // Updates User Object Friends
                if (updateUser) {
                    dispatch(setFriends({ friends: jsonObject }));  
                }
            }
            else { console.error(jsonObject.message); }
        });
    }

    useEffect(() => {

        // Profile Page
        if (profileId === profileUser._id) {
            getFriends();
            console.log("FRIENDS LIST UPDATE FRIENDS FOR PROFILE")
        }

        // Home Page
        else if (loggedInUser._id === profileUser._id) {
            getFriends(true);
        }
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
                    <NewFriendComponent 
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
