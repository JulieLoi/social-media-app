import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import FlexBetween from "./FlexBetween";

const AddRemoveFriend = ({ otherUserId, allowButton=true, marginAmount="0" }) => {

    // Theme Colors
    const { palette } = useTheme();
    const primaryDark = palette.primary.dark;

    // Logged In User
    const loggedInUser = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

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

                // 


            }
            else { console.error(jsonObject.message); }
        });
    }




    return (
        <>
        <FlexBetween>
        <IconButton onClick={patchFriend}
            sx={{ backgroundColor: palette.primary.light, p: "0.6rem", mr: marginAmount }}
        >
            {allowButton ? 
                <PersonRemoveOutlined sx={{ color: primaryDark }} /> 
                : 
                <PersonAddOutlined sx={{ color: primaryDark }} />
            }
        </IconButton>
        </FlexBetween>
        </>
    )
}

export default AddRemoveFriend;