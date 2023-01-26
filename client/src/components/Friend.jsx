import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setFriends, setProfileUser } from "state";
import FlexBetween from "./FlexBetween";
import UserInfo from "./UserInfo";

/**
 * Friend Component
 * Component of a user info (name, picture) and 
 * the ability to add/remove the user as a friend of the logged in user
 */
const Friend = ({ friendId, name, subtitle, userPicturePath, marginAmount = "0", allowAddRemove=true }) => {

    const dispatch = useDispatch();
    const { userId } = useParams();     // Profile User ID (from params)

    // User ID, Token, and Profile User (Frontend State)
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const profileUser = useSelector((state) => state.profileUser);

    // Theme Colors
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;

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
            console.log(jsonObject)

            if (response.status === 200) {
                // Updates Logged In User Profile Page Friend List (on user friend list)
                if (profileUser._id === user._id) {
                    dispatch(setProfileUser({ ...profileUser, friends: jsonObject.loggedInUserFriends }));
                }

                // Adds Logged in user as friend...
                else {
                    // Checks if the logged in user is a friend of the profile page user we are looking at.
                    const check = profileUser.friends.find((f) => f._id === user._id) === undefined ? false : true;

                    // Remove Friend (Logged In User)
                    if (check) {
                        const newArray = [...profileUser.friends];
                        const result = newArray.filter((f) => f._id !== user._id)
                        dispatch(setProfileUser({ ...profileUser, friends: result }));
                    }
                    // Add Friend (Logged In User)
                    else {
                        const formattedUser = { 
                            _id: user._id, 
                            firstName: user.firstName, 
                            lastName: user.lastName, 
                            occupation: user.occupation, 
                            location: user.location, 
                            picturePath: user.picturePath 
                        };
                        dispatch(setProfileUser({ ...profileUser, friends: [...profileUser.friends, formattedUser] }));
                    }
                }

                // Updates Logged In User's Friends List
                dispatch(setFriends({ friends: jsonObject.loggedInUserFriends }));
            }
            else { console.error(jsonObject.message); }
        });
    }    

    // Friend Component
    return (
        <FlexBetween>

            <UserInfo 
                userId={friendId}
                userImage={userPicturePath}
                userName={name}
                userLocation={subtitle}
            
            />

            {/* ADD/REMOVE FRIEND, DELETE POST */}
            {(user._id !== friendId) && allowAddRemove &&
                (<FlexBetween>
                    <IconButton onClick={() => patchFriend()}
                        sx={{ backgroundColor: primaryLight, p: "0.6rem", mr: marginAmount }}
                    >
                        {isFriend || userId === user._id ? 
                            <PersonRemoveOutlined sx={{ color: primaryDark }} /> 
                            : 
                            <PersonAddOutlined sx={{ color: primaryDark }} />
                        }
                    </IconButton>
                </FlexBetween>)
            }
        </FlexBetween>
    )
};

export default Friend;