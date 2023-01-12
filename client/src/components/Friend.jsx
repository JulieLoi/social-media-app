import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Theme Colors
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.primary.dark;
    const medium = palette.neutral.medium;

    // User ID, Token, and User Friends (State)
    const {_id} = useSelector((state) => state.token);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    // Boolean
    const isFriend = friends.find((friend) => friend._id === friendId);

    // PATCH API Call (Add/Remove Friend)
    const patchFriend = async () => {

        // Add/Removes Friend from User's Friends List
        const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`,
            {
                method: "PATCH",
                headers: { Authorization: `Beaer ${token}`},
                "Content-Type": "application/json"
            }
        );
        const data = await response.json();
        dispatch(setFriends({ friends: data }));    // Updates Frontend State
    }

    // Friend Component
    return (
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

export default Friend