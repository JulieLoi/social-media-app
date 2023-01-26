import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setFriends, setProfileUser } from "state";
import FlexBetween from "./FlexBetween";

const AddRemoveFriend = ({ otherUserId, allowButton=true, marginAmount="0" }) => {

    const dispatch = useDispatch();
    const { userId: profileId } = useParams();     // Profile User ID (from params)

    // Theme Colors
    const { palette } = useTheme();
    const primaryDark = palette.primary.dark;

    // Logged In User
    const loggedInUser = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    // Profile User
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

                // GET BOTH LOGGED IN USER FRIEND LIST AND OTHER USER FRIEND LIST FROM JSON OBJECT
                // CODE THIS IN "users.js" (DONE)

                const loggedUserFriends = jsonObject.loggedInUserFriends;
                const otherUserFriends = jsonObject.otherUserFriends;

                // The other user will not always be a profile page user.
                // As such, I need to check if the profile page user = otherUser and update that friend list on the profile page...

                console.log(loggedInUser)
                console.log(profileUser)

                // Updates Logged In User Friends
                dispatch(setFriends({ friends: loggedUserFriends }));

                // Profile User === Logged In User (Updates Profile User as well)
                if (loggedInUser._id === profileUser._id) {
                    console.log("HOME OR MY PROFILE PAGE")
                    dispatch(setProfileUser({ ...profileUser, friends: loggedUserFriends }));
                }

                // Currently looking at a profile and adding the profile user as a friend
                if (profileUser._id === profileId) {
                    console.log("ANOTHER PROFILE PAGE")
                    dispatch(setProfileUser({ ...profileUser, friends: otherUserFriends }));
                }


                console.log("ADD REMOVE FRIEND COMPONENT")
                console.log(jsonObject)
            }
            else { console.error(jsonObject.message); }
        });
    }




    return (
        <>
        <FlexBetween>
        {loggedInUser._id !== otherUserId && 
            <IconButton onClick={patchFriend}
                sx={{ backgroundColor: palette.primary.light, p: "0.6rem", mr: marginAmount }}
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