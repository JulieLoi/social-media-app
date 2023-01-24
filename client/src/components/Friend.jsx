import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { setFriends, setProfileUser } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath, marginAmount = "0" }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = useParams();     // Profile User ID (from params)

    // Theme Colors
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.primary.dark;
    const medium = palette.neutral.medium;

    // User ID, Token, and User Friends (Frontend State)
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    // Profile User
    const profileUser = useSelector((state) => state.profileUser)

    // Check for friendship
    let isFriend = (user.friends.find((friend) => friend._id === friendId) ? true : false);
    

    // WHO ADDS WHO (Updates Profile Page of a not-logged-in user)
    let addString = `http://localhost:3001/users/${user._id}/${friendId}`;
    if (profileUser._id === userId) {
        isFriend = (profileUser.friends.find((friend) => friend._id === user._id) ? true : false);
        addString = `http://localhost:3001/users/${friendId}/${user._id}`;
    }

    // PATCH API Call (Add/Remove Friend)
    const patchFriend = async () => {
        await fetch(addString,
            {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}`},
                "Content-Type": "application/json"
            }
        ).then(async (response) => {
            // Response JSON Object
            const jsonObject = await response.json();

            if (response.status === 200) {
                if (profileUser._id === user._id) {
                    dispatch(setFriends({ friends: jsonObject }));    // Updates Frontend State
                }
                dispatch(setProfileUser({ ...profileUser, friends: jsonObject }));     // Update Frontend State   
            }
            else {
                console.log(jsonObject.message);
            }
        });
    }    

    // Friend Component
    return (
        <FlexBetween>

            {/* User Profile Picture, Name, Location */}
            <FlexBetween gap="1rem">
                <UserImage userId={friendId} image={userPicturePath} size="55px" /> 
                <Box>
                    <Typography
                        color={main} variant="h5" fontWeight="500"
                        sx={{ "&:hover": { color: palette.primary.main, cursoer: "pointer", } }}
                        onClick={() => {
                            navigate(`/profile/${friendId}`);
                            navigate(0);        // Refresh
                        }}
                    >
                        {name.length > 20 ? `${name.substring(0, 20)}...` : name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle === "" ? <i>No Location</i> : subtitle}
                    </Typography>
                </Box>
            </FlexBetween>

            {/* ADD/REMOVE FRIEND, DELETE POST */}
            {(user._id !== friendId) &&
                (
                <FlexBetween>
                    <IconButton onClick={() => patchFriend()}
                        sx={{ backgroundColor: primaryLight, p: "0.6rem", mr: marginAmount }}
                    >
                        {isFriend || userId === user._id ? 
                            <PersonRemoveOutlined sx={{ color: primaryDark }} /> 
                            : 
                            <PersonAddOutlined sx={{ color: primaryDark }} />
                        }
                    </IconButton>
                </FlexBetween>
                )
            }
        </FlexBetween>
    )
};

export default Friend;