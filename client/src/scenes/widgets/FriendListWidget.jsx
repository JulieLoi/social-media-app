import { Box, Typography, Divider, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

/**
 * Friends List Widget
 * The widget that contains the list of the user's friends
 */
const FriendListWidget = ({ userId }) => {

    const dispatch = useDispatch();
    const { palette } = useTheme();

    // Token, User Friends (Frontend State)
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    
    // GET API Call (Get All User Friends)
    const getFriends = async () => {
        await fetch(`http://localhost:3001/users/${userId}/friends`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`},
            }
        ).then(async (response) => {
            // Response JSON Object
            const jsonObject = await response.json();

            if (response.status === 200) {
                dispatch(setFriends({ friends: jsonObject }));     // Update Frontend State   
            }
            else {
                console.log(jsonObject.message);
            }
        });
    }

    // Gets Friends List Data
    useEffect(() => {
        getFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
 
    // Friend List Widget
    return (
        <WidgetWrapper mt="1.5rem">

            {/* FRIENDS LIST TITLE */}
            <Typography 
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "0.5rem" }}
            >
                Friends List
            </Typography>

            <Divider />

            {/* FRIENDS LIST */}
            <Box 
                display="flex" flexDirection="column" 
                gap="1.5rem" p="0.75rem 0"
                sx={{ maxHeight: "30vh", overflowY: "auto" }}
            >
                {friends.map((friend) => (
                    <Friend 
                        key={`${friend._id}_${userId}-${Math.random()}`}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation}
                        userPicturePath={friend.picturePath}
                        marginAmount={"1rem"}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    )
}

export default FriendListWidget;
