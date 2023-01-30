import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setFriends, setProfileUser } from "state";

import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

const AddRemoveFriend = ({ otherUserId, marginAmount="0" }) => {

    const dispatch = useDispatch();
    const { userId: profileId } = useParams();     // Profile User ID (from params)

    // Theme Colors
    const { palette } = useTheme();
    const primaryDark = palette.primary.dark;

    // Logged In User, Token, Profile User
    const loggedInUser = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const profileUser = useSelector((state) => state.profileUser);

    // Check Friend Status (Logged in user and otherUserId)
    const checkFriendship = loggedInUser.friends.find((f) => f._id === otherUserId) ? true : false;

    // PATCH API Call (Add/Remove Friend)
    const patchFriend = async () => {
        await fetch(`http://localhost:3001/users/${loggedInUser._id}/${otherUserId}`,
            {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}`},
                "Content-Type": "application/json"
            }
        ).then(async (response) => {
            // Response JSON Object
            const jsonObject = await response.json();

            if (response.status === 200) {

                const loggedUserFriends = jsonObject.loggedInUserFriends;
                const otherUserFriends = jsonObject.otherUserFriends;

                // Updates Logged In User Friends
                dispatch(setFriends({ friends: loggedUserFriends }));

                // Logged In User Profile Page: Update Friends List (Remove Friends)
                if (loggedInUser._id === profileUser._id) {
                    dispatch(setProfileUser({ ...profileUser, friends: loggedUserFriends }));
                }

                // Profile Page: Update Friends List (Add/Remove Logged In User) 
                if ((profileUser._id === profileId) && (profileId === otherUserId)) {
                    dispatch(setProfileUser({ ...profileUser, friends: otherUserFriends }));
                }
            }
            else { console.error(jsonObject.message); }
        });
    }

    return (
        <>
        <FlexBetween>
        {loggedInUser._id !== otherUserId && 
            <IconButton onClick={patchFriend}
                sx={{ 
                    p: "0.6rem", mr: marginAmount,
                    backgroundColor: palette.primary.light, 
                    border: `1px solid ${primaryDark}`
                }}
            >
                {checkFriendship ? 
                    <PersonRemoveOutlined sx={{ color: primaryDark }} /> 
                    : 
                    <PersonAddOutlined sx={{ color: primaryDark }} />
                }
            </IconButton>
        }
        </FlexBetween>
        </>
    )
}

export default AddRemoveFriend;