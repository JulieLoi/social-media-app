import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Friend State
    const [userFriends, setUserFriends] = useState(useSelector((state) => state.user.friends));
    const [isFriend, setIsFriend] = useState(userFriends.find((friend) => friend._id === friendId));

    // Theme Colors
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.primary.dark;
    const medium = palette.neutral.medium;

    // User ID, Token, and User Friends (Frontend State)
    const {_id} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    //const friends = useSelector((state) => state.user.friends);

    // Check for friendship
    //const isFriend = friends.find((friend) => friend._id === friendId);

    // PATCH API Call (Add/Remove Friend)
    const patchFriend = async () => {

        // Add/Removes Friend from User's Friends List
        const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`,
            {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}`},
                "Content-Type": "application/json"
            }
        );
        const data = await response.json();
        dispatch(setFriends({ friends: data }));    // Updates Frontend State
        setUserFriends(data);                       // Updates Friend State (friend list)
        setIsFriend(!isFriend);                     // Updates Friend State (boolean)
    }

    // Friend Component
    return (
        <FlexBetween>

            {/* User Profile Picture, Name, Location */}
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px" /> 
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`);
                        navigate(0);        // Refresh
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursoer: "pointer",
                            }
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>

            {/* Add/Remove Friend */}
            <FlexBetween>
                <IconButton
                    onClick={() => patchFriend()}
                    sx={{
                        backgroundColor: primaryLight,
                        p: "0.6rem",
                    }}
                >
                    {isFriend ? 
                        <PersonRemoveOutlined sx={{ color: primaryDark }} /> 
                        : 
                        <PersonAddOutlined sx={{ color: primaryDark }} />
                    }
                </IconButton>
            </FlexBetween>

        </FlexBetween>
    )
};

export default Friend;