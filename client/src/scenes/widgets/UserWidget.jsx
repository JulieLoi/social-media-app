import { 
    ManageAccountsOutlined, 
    EditOutlined, 
    LocationOnOutlined, 
    WorkOutlineOutlined,
} from "@mui/icons-material";
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import {
    Box, Typography, Divider, TextField, Button, InputAdornment, useTheme,
    Dialog, DialogActions, DialogContent, DialogTitle,
} from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";  
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setHandles } from "state";

/**
 * User Widget
 * The left-sided widget that displays some user information on the Home Page
 */
const UserWidget = ({ userId, picturePath }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Logged In User
    const loggedInUser = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);

    // User Widget - User
    const [user, setUser] = useState(null);

    // Twitter Dialog Box
    const [editTwitterHandle, setEditTwitterHandle] = useState("");
    const [twitterDialogBox, setTwitterDialogBox] = useState(false);
    const handleTwitterClose = () => { 
        updateUserHandles();
        setTwitterDialogBox(false);
    }

    //LinkedIn Dialog Box
    const [editLinkedInHandle, setEditLinkedInHandle] = useState("");
    const [LinkedInDialogBox, setLinkedInDialogBox] = useState(false);
    const handleLinkedInClose = () => { 
        updateUserHandles();
        setLinkedInDialogBox(false);
    }

    // Palette Theme
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    // GET API Call (Get User)
    const getUser = async () => {
        await fetch(`http://localhost:3001/users/${userId}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            }
        ).then(async (response) => {
            // Response JSON Object
            const jsonObject = await response.json();

            if (response.status === 200) {
                setUser(jsonObject);
                setEditTwitterHandle(jsonObject.twitterHandle);
                setEditLinkedInHandle(jsonObject.linkedInHandle);
            }
            else {
                console.log(jsonObject.message);
            }
        });
    }

    // PATCH API CALL (Edit User - Twitter/LinkedIn Handle)
    const updateUserHandles = async () => {
        await fetch(`http://localhost:3001/users/${loggedInUser}`,
            {
                method: "PATCH",
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    twitter: editTwitterHandle,
                    linkedIn: editLinkedInHandle 
                }),
            }
        ).then(async (response) => {
            // Response JSON Object
            const jsonObject = await response.json();

            if (response.status === 200) {
                setUser(jsonObject);
                dispatch(
                    setHandles({ 
                        twitterHandle: editTwitterHandle,
                        linkedInHandle: editLinkedInHandle,
                    })
                )
            }

            else {
                console.log(jsonObject.message)
            }
        });
    }

    // Gets the user (updates when Frontend User State Changes)
    useEffect(() => {
        getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useSelector((state) => state.user)])

    // No User, return null
    if (!user) { return null; }

    // Destructure the User
    const {
        firstName, lastName,
        location, occupation,
        viewedProfile, impressions,
        friends
    } = user;

    // User Widget
    return (
        <>
        <WidgetWrapper>

            {/* FIRST ROW: Profile Image, Name, Friend Count, Profile Page Button */}
            <FlexBetween gap="0.5rem" pb="1.1rem">
                <FlexBetween gap="1rem">
                    <UserImage userId={userId} image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4" color={dark} fontWeight="500"
                            sx={{ "&:hover": { color: primary, cursor: "pointer" } }}
                            onClick={() => navigate(`/profile/${userId}`)}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>
                            {friends.length} friends
                        </Typography>
                    </Box>
                    
                </FlexBetween>
                    <ManageAccountsOutlined 
                        sx={{ color: main, "&:hover": { cursor: "pointer", color: primary } }} 
                    />
            </FlexBetween>

            <Divider />

            {/* SECOND ROW: Location/Occupation */}
            <Box p="1rem 0rem">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>
            
            <Divider />

            {/* THIRD ROW: View Profile/Impressions Count */}
            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Who's viewed your profile</Typography>
                    <Typography color={medium} fontWeight="500">{viewedProfile}</Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography color={medium}>Impressions of your post</Typography>
                    <Typography color={medium} fontWeight="500">{impressions}</Typography>
                </FlexBetween>
            </Box>

            <Divider />

            {/* FOURTH ROW: Social Profiles */}
            <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Social Profiles
                </Typography>

                {/* Twitter */}
                <FlexBetween gap="1rem" mb="0.5rem" >
                    <FlexBetween gap="1rem">
                        <TwitterIcon 
                            sx={{ color: main, fontSize: "2rem", transition: "1s",
                                "&:hover": { 
                                    cursor: "pointer", color: primary,
                                    transform: "scale(1.25)", transition: "1s",
                                } 
                            }} 
                            onClick={() => window.open(`https://twitter.com/${user.twitterHandle}`)}
                        />
                        <Box>
                            <Typography 
                                color={main} fontWeight="500"
                                sx={{ "&:hover": { color: primary, cursor: "pointer" } }}
                                onClick={() => window.open(`https://twitter.com/${user.twitterHandle}`)}
                            >
                                Twitter
                            </Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </FlexBetween>
                    {loggedInUser === userId ?
                        <EditOutlined onClick={setTwitterDialogBox(true)}
                            sx={{ color: main, "&:hover": { cursor: "pointer", color: primary } }} 
                        />
                        :
                        <Typography color={medium}>/{user.twitterHandle}</Typography>
                    }
                </FlexBetween>
                
                {/* LinkedIn */}
                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                        <LinkedInIcon 
                            sx={{ color: main, fontSize: "2rem", transition: "1s",
                                "&:hover": { 
                                    cursor: "pointer", color: primary,
                                    transform: "scale(1.25)", transition: "1s",
                                } 
                            }} 
                            onClick={() => window.open(`https://www.linkedin.com/${user.linkedInHandle}`)}
                        />
                        <Box>
                            <Typography 
                                color={main} fontWeight="500"
                                sx={{ "&:hover": { color: primary, cursor: "pointer" } }}
                                onClick={() => window.open(`https://www.linkedin.com/${user.linkedInHandle}`)}
                            >
                                LinkedIn
                            </Typography>
                            <Typography color={medium}>
                                Network Platform
                            </Typography>
                        </Box>
                    </FlexBetween>
                    {loggedInUser === userId ?
                        <EditOutlined onClick={setLinkedInDialogBox(true)}
                            sx={{ color: main, "&:hover": { cursor: "pointer", color: primary } }} 
                        />
                        :
                        <Typography color={medium}>/{user.linkedInHandle}</Typography>
                    }
                </FlexBetween>
            </Box>
        </WidgetWrapper>

        {/* Edit Twitter Handle */}
        <Dialog open={twitterDialogBox} onClose={handleTwitterClose}>
            <DialogTitle>Twitter Account</DialogTitle>
            <DialogContent>
                <TextField autoFocus fullWidth id="twitter-handle"                        
                    label="Twitter Account Handle" variant="filled"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">https://twitter.com/</InputAdornment>,
                    }}
                    onChange={(e) => setEditTwitterHandle(e.target.value) }
                    value={editTwitterHandle}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleTwitterClose}>Save</Button>
            </DialogActions>
        </Dialog>

        {/* Edit LinkedIn Handle */}
        <Dialog open={LinkedInDialogBox} onClose={handleLinkedInClose}>
            <DialogTitle>LinkedIn Account</DialogTitle>
            <DialogContent>
                <TextField autoFocus fullWidth id="linkedin-handle"                        
                    label="LinkedIn Account Handle" variant="filled"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">https://linkedin.com/</InputAdornment>,
                    }}
                    onChange={(e) => setEditLinkedInHandle(e.target.value) }
                    value={editLinkedInHandle}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleLinkedInClose}>Save</Button>
            </DialogActions>
        </Dialog>
        </>


    )
}

export default UserWidget;