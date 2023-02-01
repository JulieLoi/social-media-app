import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import fileDownload from 'js-file-download';
import { setMode, setLogout } from "state";

import { 
    Box, IconButton, InputBase, Typography, Select, MenuItem,
    FormControl, useTheme, useMediaQuery, Button,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from "@mui/material";
import {
    Message, DarkMode, LightMode,
    Notifications, Help, Menu, Close
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import SearchBar from "components/SearchBar";
/**
 * Navbar
 * The navigation bar 
 */
const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Mobile/PC
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    // Color Theme
    const { palette } = useTheme();
    const neutralLight = palette.neutral.light;
    const dark = palette.neutral.dark;
    const background = palette.background.default;
    const alt = palette.background.alt;
    const primary = palette.primary.main;
    const primaryDark = palette.primary.dark;

    // Current User (Logged In)
    const user = useSelector((state) => state.user);
    const combinedName = user ? `${user.firstName} ${user.lastName}` : "";
    const fullName = user ? (combinedName.length > 20 ? `${combinedName.substring(0, 20)}...` : combinedName) : "";

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

    /**
     * Desktop View: Shows everything
     * Mobile View: Shows logo only, everything else is in a dropdown icon
     */
    return (
        <>
        <Box position="sticky" top="0" zIndex="10"
            backgroundColor={alt} padding="1rem 6%" 
        >
        <FlexBetween>

            {/* LOGO / SEARCH */}
            <FlexBetween gap="1.75rem">

                {/* LOGO TEXT */}
                <Typography
                    fontWeight="bold" fontSize="clamp(1rem, 2rem, 2.25rem)" color="primary"
                    sx={{ "&:hover": { color: primaryDark, cursor: "pointer" } }}
                    onClick={() => navigate("/home")}
                >
                    Sociopedia
                </Typography>

                {/* SEARCH BAR */}
                {isNonMobileScreens && 
                    <SearchBar />
                }

            </FlexBetween>

            {/* ICONS / LOG OUT */}
            {isNonMobileScreens ? 
                (<FlexBetween gap="2rem">
                    {/* LIGHT/DARK MODE */}
                    <IconButton onClick={() => dispatch(setMode())}>
                        {palette.mode === "dark" ? 
                            (<DarkMode sx={{ fontSize:"25px", "&:hover": { color: primary } }} />) 
                            : 
                            (<LightMode sx={{ color: dark, fontSize:"25px", "&:hover": { color: primary } }} />) 
                        }
                    </IconButton>

                    {/* OTHER MENU ITEMS */}
                    <IconButton> 
                        <Message sx={{ fontSize:"25px", "&:hover": { color: primary } }} /> 
                    </IconButton>
                    <IconButton> 
                        <Notifications sx={{ fontSize:"25px", "&:hover": { color: primary } }} /> 
                    </IconButton>
                    <IconButton onClick={() => setDialogBox(true)}> 
                        <Help sx={{ fontSize:"25px", "&:hover": { color: primary } }} /> 
                    </IconButton>
                    
                    {/* User, Log out / Sign up, Log in */}
                    <FormControl variable="standard" value={fullName}>
                    {user !== null ?
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
                        <Button onClick={() => navigate('/')} sx={{ fontSize: "1rem" }}>
                            Sign Up / Login
                        </Button>
                        }
                    </FormControl>
                    
                    
                </FlexBetween>) 
                : 
                (<IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                    <Menu sx={{ "&:hover": { color: primary }, "&:focus": { color: primary }, }} />
                </IconButton>)
            }

            {/* MOBILE NAV */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box
                    position="fixed" height="100%"
                    right="0" bottom="0" z-index="10"
                    maxWidth="500px" minWidth="300px"
                    backgroundColor={background}
                >
                    {/* CLOSE ICON */}
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                            <Close sx={{ "&:hover": { color: primary }, "&:focus": { color: primary } }} />
                        </IconButton>
                    </Box>

                    {/* MENU ITEMS */}
                    <FlexBetween 
                        display="flex" flexDirection="column" 
                        justifyContent="center" gap="3rem"
                    >
                        {/* LIGHT/DARK MODE */}
                        <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize:"25px" }}>
                            {palette.mode === "dark" ? 
                                (<DarkMode sx={{ fontSize:"25px", "&:hover": { color: primary } }} />) 
                                : 
                                (<LightMode sx={{ color: dark, fontSize:"25px", "&:hover": { color: primary } }} />) 
                            }
                        </IconButton>

                        {/* OTHER ICONS*/}
                        <IconButton> 
                            <Message sx={{ fontSize:"25px", "&:hover": { color: primary } }} /> 
                        </IconButton>
                        <IconButton> 
                            <Notifications sx={{ fontSize:"25px", "&:hover": { color: primary } }} /> 
                        </IconButton>
                        <IconButton onClick={() => setDialogBox(true)}> 
                            <Help sx={{ fontSize:"25px", "&:hover": { color: primary } }} /> 
                        </IconButton>

                        {/* NAME, LOG OUT */}
                        <FormControl variable="standard" value={fullName}>
                            <Select value={fullName}
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
                                <MenuItem onClick={() => dispatch(setLogout())}> Log Out </MenuItem>
                            </Select>
                        </FormControl>

                    </FlexBetween>
                </Box>
            )}
            
        </FlexBetween>

        {/* SEARCH BAR (MOBILE) */}
        {!isNonMobileScreens && 
            <>
                <Box marginTop="5px" />
                <SearchBar />
            </>
        }
        </Box>

        {/* EDIT USER INFORMATION */}
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
    );


}

export default Navbar;