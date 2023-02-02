import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";  
import { v4 as uuidv4 } from 'uuid';
import { setUserInformation, setUserProfileImage } from "state";

import { 
    ManageAccountsOutlined, LocationOnOutlined, WorkOutlineOutlined,
} from "@mui/icons-material";
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
    Box, Typography, Divider, TextField, Button, InputAdornment, useTheme,
    Dialog, DialogActions, DialogContent, DialogTitle
} from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import Location from "components/Location";
import AddRemoveFriend from "components/AddRemoveFriend";
import ImageDropzone from "components/ImageDropzone";

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

    // User, isProfile
    const [user, setUser] = useState(null);
    const isProfile = window.location.pathname === `/profile/${userId}`;

    // User Account Information Dialog Box
    const [editUserInformation, setEditUserInformation] = useState(loggedInUser);
    const [dialogBox, setDialogBox] = useState(false);
    const handleDialogClose = () => {
        updateUserInformation();
        setDialogBox(false);
    }

    // New Profile Image
    const [image, setImage] = useState(null);       // Optional image to include in post

    // Location
    const [newLocation, setNewLocation] = useState(loggedInUser ? loggedInUser.location : "");

    // Palette Theme
    const { palette } = useTheme();
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    // Gets User (userId) for Widget (/users GET API CALL)
    const getUser = async () => {
        await fetch(`http://localhost:3001/users/${userId}`, { method: "GET" }
        ).then(async (response) => {
            const responseJSON = await response.json();
            if (response.status === 200) { setUser(responseJSON.user); }
            else { console.error(responseJSON.message); }
        });
    }

    // Updates User (userId) Information (/users PATCH API CALL)
    const updateUserInformation = async () => {

        // Update User Profile Image
        if (image) {
            const ext = image.path.split('.').pop();
            const userImagePath = `user${uuidv4().replaceAll('-', '')}.${ext}`;

            // Form Data (to upload image)
            const formData = new FormData();
            formData.append("serverPath", "/users");            // Multer Disk Storage (Path)
            formData.append("picturePath", userImagePath);      // Rename Advert Image
            formData.append("picture", image);

            await fetch(`http://localhost:3001/users/${loggedInUser._id}`, 
                {
                    method: "PATCH",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                },
            ).then(async (response) => {
                // Response JSON Object
                const responseJSON = await response.json();

                // Updates Logged In User Profile Picture
                if (response.status === 200) {
                    setUser(responseJSON.updatedUser);
                    dispatch(setUserProfileImage(responseJSON.updatedUser));
                    setImage(null);
                }
                else { console.log(responseJSON.message); }
            })
        }

        // Update Logged In User Information
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
            const responseJSON = await response.json();

            // Updates Logged In User Information
            if (response.status === 200) {
                setUser(responseJSON.updatedUser);
                dispatch(setUserInformation(responseJSON.updatedUser));
            }
            else {
                console.log(responseJSON.message)
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
        firstName, lastName, location, occupation,
        viewedProfile, impressions,
        friends, twitterHandle, linkedInHandle
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
                            variant="h4" color={palette.neutral.dark} fontWeight="500"
                            sx={{ "&:hover": { 
                                color: isProfile ? palette.neutral.dark : primary, 
                                cursor: isProfile ? "default": "pointer",
                            }}}
                            onClick={() => { if (!isProfile) { navigate(`/profile/${userId}`) } }}
                        >
                            {fullName.length > 20 ? `${fullName.substring(0, 20)}...` : fullName}
                        </Typography>
                        <Typography color={medium}>
                            {friends.length} friends
                        </Typography>
                    </Box>
                    
                </FlexBetween>
                {(loggedInUser && userId === loggedInUser._id) ?
                    <ManageAccountsOutlined 
                        sx={{ color: main, "&:hover": { cursor: "pointer", color: primary } }} 
                        onClick={() => setDialogBox(true)}
                    />
                    :
                    <AddRemoveFriend 
                        otherUserId={userId}
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
                    <Typography color={medium}>
                        {occupation === "" ? <i>No Occupation</i> : occupation}
                    </Typography>
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
        <Dialog open={dialogBox} onClose={() => setDialogBox(false)} fullWidth>
            <DialogTitle fontSize="1rem" sx={{ textDecoration: "underline" }}>
                Update Account Information
            </DialogTitle>
            <DialogContent>

                {/* Profile Image */}
                <Box mb="1rem">
                <Typography sx={{ fontWeight: "500", fontSize: "1rem" }}>
                    User Profile Image
                </Typography>
                <ImageDropzone image={image} setImage={setImage} />
                </Box>

                {/* Full Name */}
                <Box mb="1rem">
                <FlexBetween gap="1rem">
                <TextField fullWidth id="first-name"                        
                    label="First Name" variant="filled"
                    inputProps={{ maxLength: 50 }}
                    onChange={(e) => setEditUserInformation({...editUserInformation, firstName: e.target.value})}
                    value={editUserInformation.firstName}
                />
                
                <TextField fullWidth id="last-name"                        
                    label="Last Name" variant="filled"
                    inputProps={{ maxLength: 50 }}
                    onChange={(e) => setEditUserInformation({...editUserInformation, lastName: e.target.value})}
                    value={editUserInformation.lastName}
                />
                </FlexBetween>
                </Box>

                {/* Location */}
                <Box mb="1rem">
                <Typography sx={{ fontWeight: "500", fontSize: "1rem" }}>
                    Location / Occupation
                </Typography>
                <Location isRegister={false} 
                    setLocation={setNewLocation} 
                    givenLocation={newLocation} 
                />
                <Box mb="1rem" />
                <TextField fullWidth id="location" disabled                     
                    label="Location" variant="filled"
                    value={newLocation}
                />
                </Box>
                
                {/* Occupation */}
                <Box mb="1rem">
                <TextField fullWidth id="occupation"                        
                    label="Occupation" variant="filled"
                    inputProps={{ maxLength: 50 }}
                    onChange={(e) => setEditUserInformation({...editUserInformation, occupation: e.target.value})}
                    value={editUserInformation.occupation}
                />
                </Box>

                {/* Social Profiles */}
                <Box>
                <Typography sx={{ fontWeight: "500", fontSize: "1rem" }}>
                    Social Profiles
                </Typography>
                <Box mb="1rem">
                <TextField fullWidth id="twitter-handle"                        
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
                <TextField fullWidth id="linkedin-handle"                        
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
                <Button onClick={handleDialogClose} sx={{ fontSize: "1rem"}}>Save</Button>
                <Button onClick={() => setDialogBox(false) } sx={{ fontSize: "1rem"}}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default UserWidget;