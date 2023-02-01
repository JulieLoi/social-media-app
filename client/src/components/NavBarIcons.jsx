import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import fileDownload from 'js-file-download';
import { setMode, setLogout } from "state";

import { 
    IconButton, InputBase, Typography, Select, MenuItem, FormControl, Button,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, 
    useTheme, useMediaQuery
} from "@mui/material";
import { DarkMode, LightMode, Message, Notifications, Help } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import WidgetWrapper from "./WidgetWrapper";

const NavBarIcons = ({ loggedIn, fullName="" }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    // Theme
    const { palette } = useTheme();
    const neutralLight = palette.neutral.light;
    const dark = palette.neutral.dark;
    const primary = palette.primary.main;
    const background = palette.background.default;

    // Mode, Message, Notifications
    const [isMessage, setIsMessage] = useState(false);
    const [isNoti, setIsNoti] = useState(false);

    // Icons Enum
    const IconsState = {
        Mode: 'MODE',
        Message: 'MESSAGE',
        Notification: 'NOTIFICATION',
        Help: 'HELP',
    };

    // Handle Icon Clicks
    const handleIconClick = ( icon ) => {
        if (icon === IconsState.Mode) {
            dispatch(setMode());
            setIsMessage(false);
            setIsNoti(false);
        }
        else if (icon === IconsState.Message && isNonMobileScreens) {
            setIsMessage(!isMessage);
            setIsNoti(false);
        }
        else if (icon === IconsState.Notification && isNonMobileScreens) {
            setIsMessage(false);
            setIsNoti(!isNoti);
        }
        else if (icon === IconsState.Help) {
            setDialogBox(true);
            setIsMessage(false);
            setIsNoti(false);
        }
    }

    // Help Dialog Box
    const [dialogBox, setDialogBox] = useState(false);
    const handleDialogClose = () => {
        downloadPDF();
        setDialogBox(false);
    }

    // Download 'UserAccounts' PDF
    const downloadPDF = async () => {
        Axios.get(`http://localhost:3001/assets/UserAccounts.pdf`, {
            responseType: 'blob',
        }).then(res => {
            fileDownload(res.data, "UserAccounts.pdf");
        })
    }

    return (
        <>
            {/* NAVBAR ICONS */}
            <>
                {/* LIGHT/DARK MODE */}
                <IconButton onClick={() => handleIconClick(IconsState.Mode)} sx={{ fontSize:"25px" }}>
                    {palette.mode === "dark" ? 
                        (<DarkMode sx={{ fontSize:"25px", "&:hover": { color: primary } }} />) 
                        : 
                        (<LightMode sx={{ color: dark, fontSize:"25px", "&:hover": { color: primary } }} />) 
                    }
                </IconButton>

                {/* MESSAGE ICON */}
                <FlexBetween position="relative">
                    <IconButton onClick={() => handleIconClick(IconsState.Message)}> 
                        <Message sx={{ fontSize:"25px", 
                            color: isMessage ? primary : "", 
                            "&:hover": { color: primary } }} 
                        /> 
                    </IconButton>
                    {isMessage &&
                        <WidgetWrapper position={"absolute"} top={"40px"} left={0} border={`1px solid ${background}`}
                            sx={{ paddingTop: "0px", paddingBottom: "0px" }}
                        >
                            <Typography variant="h5" fontWeight="700" sx={{ fontStyle: "italic", padding: "20px 0px" }}>
                                No Messages...
                            </Typography>
                        </WidgetWrapper>
                    }
                </FlexBetween>
                    
                {/* NOTIFICATIONS ICON */}
                <FlexBetween position="relative">
                    <IconButton onClick={() => handleIconClick(IconsState.Notification)}> 
                        <Notifications sx={{ fontSize:"25px", 
                            color: isNoti ? primary : "", 
                            "&:hover": { color: primary } }} 
                        /> 
                    </IconButton>
                    {isNoti &&
                        <WidgetWrapper position={"absolute"} top={"40px"} left={0} border={`1px solid ${background}`}
                            sx={{ paddingTop: "0px", paddingBottom: "0px" }}
                        >
                            <Typography variant="h5" fontWeight="700" sx={{ fontStyle: "italic", padding: "20px 0px" }}>
                                No Notifications...
                            </Typography>
                        </WidgetWrapper>
                    }
                </FlexBetween>

                {/* HELP ICON */}
                <IconButton onClick={() => handleIconClick(IconsState.Help)}> 
                    <Help sx={{ fontSize:"25px", "&:hover": { color: primary } }} /> 
                </IconButton>

                {/* User, Log out / Sign up, Log in */}
                <FormControl variable="standard" value={fullName}>
                    {loggedIn ?
                        <Select
                            value={fullName}
                            sx={{ 
                                backgroundColor: neutralLight, borderRadius: "0.25rem",
                                width: "150px", p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": { pr: "0.25rem", width: "3rem" },
                                "& .MuiSelect-select:focus": { backgroundColor: neutralLight, }
                            }}
                            input={<InputBase />}
                        >
                        <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => dispatch(setLogout())}>
                            Log Out
                        </MenuItem>
                    </Select>
                    :
                    <Button variant="outlined" sx={{ fontSize: "1rem" }}
                        onClick={() => navigate('/')}
                    >
                        Sign Up / Login
                    </Button>
                    }
                </FormControl>
            </>

            {/* DOWNLOAD 'UserAccounts.pdf */}
            <Dialog open={dialogBox} onClose={() => setDialogBox(false)} fullWidth>
                <DialogTitle fontSize="1rem" sx={{ textDecoration: "underline" }}>
                    Sociology Help
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Download a PDF file that contains some user accounts (email/password).
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} sx={{ fontSize: "1rem"}}>Download</Button>
                    <Button onClick={() => setDialogBox(false)} sx={{ fontSize: "1rem"}}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )

}

export default NavBarIcons;