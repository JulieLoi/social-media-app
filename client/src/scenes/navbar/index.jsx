import { useState } from "react";
import { 
    Box, IconButton, InputBase,
    Typography, Select, MenuItem,
    FormControl, Divider,
    useTheme, useMediaQuery,
} from "@mui/material";
import {
    Search, Message,
    DarkMode, LightMode,
    Notifications, Help,
    Menu, Close
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { setAllUsers } from "state";
import { useEffect } from "react";
import WidgetWrapper from "components/WidgetWrapper";
import UserImage from "components/UserImage";

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
    const primaryLight = palette.primary.light;
    const alt = palette.background.alt;
    const primary = palette.primary.main;

    // Current User (Logged In)
    const user = useSelector((state) => state.user);
    const combinedName = `${user.firstName} ${user.lastName}`;
    const fullName = combinedName.length > 20 ? `${combinedName.substring(0, 20)}...` : combinedName;

    // Search Bar
    const allUsers = useSelector((state) => state.allUsers);
    const [searchUsers, setSearchUsers] = useState(useSelector((state) => state.allUsers));
    const [editSearch, setEditSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [timeOutId, setTimeOutId] = useState(null);

    // Handles Search Bar Blur (fixes issue with search bar popup)
    const onBlurHandler = () => {
        setTimeOutId(setTimeout(() => {
            setIsSearching(false)
        }, 250))
    }

    // If a child receives focus, do not close the popover.
    const onFocusHandler = () => {
        clearTimeout(timeOutId);
    }

    // Search Bar Updates Search Results
    useEffect(() => {
        // Boolean Array (User name starts with search bar input)
        const checkUsers = allUsers.map((user) => {
            let result = (user.name.toLowerCase()).startsWith(editSearch.toLowerCase(), 0);
            return result;
        })

        const searchedUsers = [];
        for (let i = 0; i < checkUsers.length; i++) {
            if (checkUsers[i]) {
                searchedUsers.push(allUsers[i])
            }
        }
        setSearchUsers(searchedUsers)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editSearch]);


    // GET API Call (Get All Users)
    const getAllUsers = async () => {
        await fetch(`http://localhost:3001/users/`,
            {
                method: "GET",
            }
        ).then(async (response) => {
            // Response JSON Object
            const jsonObject = await response.json();

            if (response.status === 200) { 
                dispatch(setAllUsers(jsonObject)); 
            }
            else { console.error(jsonObject.message); }
        });
    }

    useEffect(() => {
        getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    /**
     * Desktop View: Shows everything
     * Mobile View: Shows logo only, everything else is in a dropdown icon
     */
    return (
        <FlexBetween 
            padding="1rem 6%" 
            backgroundColor={alt} 
            position="sticky" top="0"
            zIndex="10"
        >

            {/* LOGO / SEARCH */}
            <FlexBetween gap="1.75rem">

                {/* Logo Text*/}
                <Typography
                    fontWeight="bold" fontSize="clamp(1rem, 2rem, 2.25rem)" color="primary"
                    sx={{ "&:hover": { color: primaryLight, cursor: "pointer", }, }}
                    onClick={() => navigate("/home")}
                >
                    Sociopedia
                </Typography>

                {/* SEARCH BAR */}
                {isNonMobileScreens && (
                    <Box
                        onFocus={onFocusHandler}
                        onBlur={onBlurHandler}
                    >
                    <FlexBetween 
                        backgroundColor={neutralLight} 
                        borderRadius="9px" gap="3rem" 
                        padding="0.1rem 1.5rem"
                        position={"relative"}
                    >
                        <InputBase placeholder="Search..." 
                            onClick={() => setIsSearching(true)}
                            value={editSearch}
                            onChange={(e) => setEditSearch(e.target.value)}
                        />

                        <IconButton>
                            <Search />
                        </IconButton>
                        {isSearching &&
                        <WidgetWrapper position={"absolute"} top={"40px"} left={0}
                            border={`1px solid ${background}`} width={"100%"} 
                            sx={{ maxHeight: "30vh", overflowY: "auto" }}
                        > 
                            {searchUsers.map((u) => (
                                
                                <Box key={u._id}>
                                <Divider />
                                <Box margin="1rem 0rem" 
                                    display={"flex"} alignItems={"center"}
                                    onClick={() => {
                                        navigate(`/profile/${u._id}`);
                                        navigate(0);                            // Refresh
                                    }}
                                    sx={{ cursor: "pointer" }}
                                >
                                    <UserImage 
                                        userId={u._id} image={u.picturePath} 
                                        size={"40px"} allowLink={false} 
                                    />
                                    <Typography variant="h5" fontWeight="500" marginLeft={"10px"}>
                                        {u.name.length > 20 ? `${u.name.substring(0, 20)}...` : u.name}
                                    </Typography>
                                </Box>
                                </Box>
                            ))}
                        </WidgetWrapper>
                        }
                    </FlexBetween>
                    
                    </Box>
                )}

            </FlexBetween>

            {/* ICONS / LOG OUT */}
            {isNonMobileScreens ? 
                (<FlexBetween gap="2rem">
                    {/* Light/Dark Mode */}
                    <IconButton onClick={() => dispatch(setMode())}>
                        {palette.mode === "dark" ? 
                            (<DarkMode sx={{ fontSize:"25px", "&:hover": { color: primary } }} />) 
                            : 
                            (<LightMode sx={{ color: dark, fontSize:"25px", "&:hover": { color: primary } }} />) 
                        }
                    </IconButton>
                    {/* Other Menu Icons */}
                    <IconButton> <Message sx={{ fontSize:"25px" }} /> </IconButton>
                    <IconButton> <Notifications sx={{ fontSize:"25px" }} /> </IconButton>
                    <IconButton> <Help sx={{ fontSize:"25px" }} /> </IconButton>
                    
                    {/* DROPDOWN BOX */}
                    <FormControl variable="standard" value={fullName}>
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
                            <Close sx={{ "&:hover": { color: primary }, "&:focus": { color: primary }, }} />
                        </IconButton>
                    </Box>

                    {/* MENU ITEMS */}
                    <FlexBetween 
                        display="flex" flexDirection="column" 
                        justifyContent="center" gap="3rem"
                    >
                        {/* Light/Dark Mode */}
                        <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize:"25px" }}>
                            {palette.mode === "dark" ? 
                                (<DarkMode sx={{ fontSize:"25px", "&:hover": { color: primary } }} />) 
                                : 
                                (<LightMode sx={{ color: dark, fontSize:"25px", "&:hover": { color: primary } }} />) 
                            }
                        </IconButton>
                        <IconButton> <Message sx={{ fontSize:"25px" }} /> </IconButton>
                        <IconButton> <Notifications sx={{ fontSize:"25px" }} /> </IconButton>
                        <IconButton> <Help sx={{ fontSize:"25px" }} /> </IconButton>
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
    )
}

export default Navbar;