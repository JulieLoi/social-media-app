import { 
    ManageAccountsOutlined, 
    LocationOnOutlined, 
    WorkOutlineOutlined,
} from "@mui/icons-material";
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import {
    Box, Typography, Divider, TextField, Button, InputAdornment, useTheme,
    Dialog, DialogActions, DialogContent, DialogTitle
} from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";  
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserInformation } from "state";
import Location from "components/Location";

/**
 * User Widget
 * The left-sided widget that displays some user information on the Home Page
 */
const UserWidget = ({ userId, picturePath }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Logged In User
    const loggedInUser = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    // User Widget - User
    const [user, setUser] = useState(null);

    // User Account Information Dialog Box
    const initialUserValues = {
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        location: loggedInUser.location,
        occupation: loggedInUser.occupation,
        twitterHandle: loggedInUser.twitterHandle,
        linkedInHandle: loggedInUser.linkedInHandle,
    };
    const [editUserInformation, setEditUserInformation] = useState(initialUserValues);
    const [dialogBox, setDialogBox] = useState(false);
    const handleDialogClose = () => {
        updateUserInformation();
        setDialogBox(false);
    }

    // Location
    const [newLocation, setNewLocation] = useState(loggedInUser.location)

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
            }
            else {
                console.log(jsonObject.message);
            }
        });
    }

    // PATCH API CALL (Edit User - Twitter/LinkedIn Handle)
    const updateUserInformation = async () => {
        await fetch(`http://localhost:3001/users/${loggedInUser._id}`,
            {
                method: "PATCH",
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editUserInformation),
            }
        ).then(async (response) => {
            // Response JSON Object
            const jsonObject = await response.json();

            if (response.status === 200) {
                setUser(jsonObject);
                dispatch(setUserInformation(jsonObject));
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

    // Update location
    useEffect(() => {
        setEditUserInformation({...editUserInformation, location: newLocation});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newLocation])


    // No User, return null
    if (!user) { return null; }

    // Destructure the User
    const {
        firstName, lastName,
        location, occupation,
        viewedProfile, impressions,
        friends,
        twitterHandle, linkedInHandle
    } = user;
    const fullName = `${firstName} ${lastName}`;
    const linkedInHandleTrim = linkedInHandle.length > 15 ? `/${linkedInHandle.substring(0, 15)}...` : `/${linkedInHandle}`;

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
                            {fullName.length > 20 ? `${fullName.substring(0, 20)}...` : fullName}
                        </Typography>
                        <Typography color={medium}>
                            {friends.length} friends
                        </Typography>
                    </Box>
                    
                </FlexBetween>
                {userId === loggedInUser._id &&
                    <ManageAccountsOutlined 
                        sx={{ color: main, "&:hover": { cursor: "pointer", color: primary } }} 
                        onClick={() => setDialogBox(true)}
                    />
                }
            </FlexBetween>

            <Divider />

            {/* SECOND ROW: Location/Occupation */}
            <Box p="1rem 0rem">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>
                        {location === "" ? <i>No Location</i> : location}
                    </Typography>
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
                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <TwitterIcon 
                            sx={{ color: main, fontSize: "2rem", transition: "1s",
                                "&:hover": { 
                                    cursor: "pointer", color: primary,
                                    transform: "scale(1.25)", transition: "1s",
                                } 
                            }} 
                            onClick={() => window.open(`https://twitter.com/${twitterHandle}`)}
                        />
                        <Box>
                            <Typography 
                                color={main} fontWeight="500"
                                sx={{ "&:hover": { color: primary, cursor: "pointer" } }}
                                onClick={() => window.open(`https://twitter.com/${twitterHandle}`)}
                            >
                                Twitter
                            </Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </FlexBetween>
                    <Typography color={medium} textOverflow="ellipsis">
                        {twitterHandle === "" ? "" : `/${twitterHandle}`}
                    </Typography>

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
                            onClick={() => window.open(`https://www.linkedin.com/in/${linkedInHandle}`)}
                        />
                        <Box>
                            <Typography 
                                color={main} fontWeight="500"
                                sx={{ "&:hover": { color: primary, cursor: "pointer" } }}
                                onClick={() => window.open(`https://www.linkedin.com/in/${linkedInHandle}`)}
                            >
                                LinkedIn
                            </Typography>
                            <Typography color={medium}>
                                Network Platform
                            </Typography>
                        </Box>
                    </FlexBetween>
                    <Typography color={medium} >
                        {linkedInHandle === "" ? "" : linkedInHandleTrim}
                    </Typography>
                </FlexBetween>
            </Box>
        </WidgetWrapper>

        {/* EDIT USER INFORMATION */}
        <Dialog open={dialogBox} onClose={handleDialogClose} fullWidth>
            <DialogTitle fontSize="1.5rem" sx={{ textDecoration: "underline" }}>
                Update Account Information
            </DialogTitle>
            <DialogContent>

                {/* Full Name */}
                <Box mb="1rem">
                <Typography sx={{ fontWeight: "500", fontSize: "1.2rem", textDecoration: "underline" }}>
                    Full Name
                </Typography>

                <FlexBetween gap="1rem">
                <TextField autoFocus fullWidth id="first-name"                        
                    label="First Name" variant="filled"
                    inputProps={{ maxLength: 50 }}
                    onChange={(e) => setEditUserInformation({...editUserInformation, firstName: e.target.value})}
                    value={editUserInformation.firstName}
                />
                
                <TextField autoFocus fullWidth id="last-name"                        
                    label="Last Name" variant="filled"
                    inputProps={{ maxLength: 50 }}
                    onChange={(e) => setEditUserInformation({...editUserInformation, lastName: e.target.value})}
                    value={editUserInformation.lastName}
                />
                </FlexBetween>
                </Box>

                {/* Location */}
                <Box>
                <Location setLocation={setNewLocation} givenLocation={newLocation} />
                <Box mb="1rem" />
                <TextField autoFocus fullWidth id="location" disabled                     
                    label="Location" variant="filled"
                    value={newLocation}
                />
                </Box>
                
                {/* Occupation */}
                <Box mb="1rem">
                <Typography sx={{ fontWeight: "500", fontSize: "1.2rem", textDecoration: "underline" }}>
                    Occupation
                </Typography>

                <Box mb="1rem">
                <TextField autoFocus fullWidth id="occupation"                        
                    label="Occupation" variant="filled"
                    inputProps={{ maxLength: 50 }}
                    onChange={(e) => setEditUserInformation({...editUserInformation, occupation: e.target.value})}
                    value={editUserInformation.occupation}
                />
                </Box>
                </Box>

                {/* Social Profiles */}
                <Box>
                <Typography sx={{ fontWeight: "500", fontSize: "1.2rem", textDecoration: "underline" }}>
                    Social Profiles
                </Typography>
                <Box mb="1rem">
                <TextField autoFocus fullWidth id="twitter-handle"                        
                    label="Twitter Account Handle" variant="filled"
                    onKeyDown={(keyEvent) => { if (keyEvent.code  === 'Space') keyEvent.preventDefault() }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">https://twitter.com/</InputAdornment>,
                    }}
                    inputProps={{ maxLength: 15 }}
                    onChange={(e) => setEditUserInformation({...editUserInformation, twitterHandle: e.target.value})}
                    value={editUserInformation.twitterHandle}
                />
                </Box>

                <Box>
                <TextField autoFocus fullWidth id="linkedin-handle"                        
                    label="LinkedIn Account Handle" variant="filled"
                    onKeyDown={(keyEvent) => { if (keyEvent.code  === 'Space') keyEvent.preventDefault() }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">https://linkedin.com/in/</InputAdornment>,
                    }}
                    inputProps={{ maxLength: 70 }}
                    onChange={(e) => setEditUserInformation({...editUserInformation, linkedInHandle: e.target.value})}
                    value={editUserInformation.linkedInHandle}
                />
                </Box>
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose}>Save</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default UserWidget;