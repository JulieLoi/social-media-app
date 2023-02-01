import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import fileDownload from 'js-file-download';
import { setMode, setLogout } from "state";

import { 
    IconButton, InputBase, Typography, Select, MenuItem, FormControl, Button,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useTheme,
} from "@mui/material";
import { DarkMode, LightMode, Message, Notifications, Help } from "@mui/icons-material";

const NavBarIcons = ({ loggedIn, fullName="" }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { palette } = useTheme();
    const neutralLight = palette.neutral.light;
    const dark = palette.neutral.dark;
    const primary = palette.primary.main;

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
                    <Button onClick={() => navigate('/')} sx={{ fontSize: "1rem" }}>
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