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

        // Get User Friends in MongoDB
        const response = await fetch(`http://localhost:3001/users/${userId}/friends`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`},
            }
        )

        // Get Backend Response
        const data = await response.json();
        dispatch(setFriends({ friends: data }));     // Update Frontend State   
    }

    // Gets Friends List Data
    useEffect(() => {
        getFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
 
    // Friend List Widget
    return (
        <WidgetWrapper 
            m="1rem 0" 
            sx={{ 
                position: "sticky", top:"35rem",
            }}

        >

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
                gap="1.5rem"
                sx={{ mt: "0.5rem", maxHeight: "30vh", overflowY: "scroll" }}
            >
                {friends.map((friend) => (
                    <Friend 
                        key={friend._id}
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
