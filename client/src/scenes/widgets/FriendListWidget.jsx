import { Box, Typography, Divider, useTheme } from "@mui/material";
import NewFriendComponent from "components/NewFriendComponent";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";

/**
 * Friends List Widget
 * The widget that contains the list of the user's friends
 */
const FriendListWidget = ({ userId }) => {

    const { palette } = useTheme();

    // Profile User (Frontend State)
    const profileUser = useSelector((state) => state.profileUser);
    
 
    // Friend List Widget
    return (
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
    )
}

export default FriendListWidget;
