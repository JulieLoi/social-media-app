import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, IconButton, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import SearchBar from "components/SearchBar";
import NavBarIcons from "components/NavBarIcons";

/**
 * Navbar
 * The navigation bar 
 */
const Navbar = () => {

    const navigate = useNavigate();
    const isHome = window.location.pathname === `/home`;        // Check Home Page

    // Mobile/PC
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    // Color Theme
    const { palette } = useTheme();
    const background = palette.background.default;
    const alt = palette.background.alt;
    const primary = palette.primary.main;
    const primaryDark = palette.primary.dark;

    // Current User (Logged In)
    const user = useSelector((state) => state.user);
    const combinedName = user ? `${user.firstName} ${user.lastName}` : "";
    const fullName = user ? (combinedName.length > 20 ? `${combinedName.substring(0, 20)}...` : combinedName) : "";

    /**
     * Desktop View: Shows everything
     * Mobile View: Shows logo and search bar, everything else is in a dropdown icon
     */
    return (
        <>
        <Box position="sticky" top="0" zIndex="10"
            backgroundColor={alt} padding="1rem 6%" 
        >
        <FlexBetween>

            {/* LOGO / SEARCH BAR (DESKTOP) */}
            <FlexBetween gap="1.75rem">

                {/* LOGO TEXT */}
                <Typography
                    fontWeight="bold" fontSize="clamp(1rem, 2rem, 2.25rem)" color="primary"
                    sx={{ 
                        "&:hover": { color: isHome ? primary : primaryDark, 
                        cursor: isHome ? "default" : "pointer" } 
                    }}
                    onClick={() => { if (!isHome) navigate("/home") } }
                >
                    Sociopedia
                </Typography>

                {/* SEARCH BAR */}
                {isNonMobileScreens && 
                    <SearchBar />
                }

            </FlexBetween>

            {/* NAV ICONS - DESKTOP / MOBILE */}
            {isNonMobileScreens ? 
                (<FlexBetween gap="2rem">
                    <NavBarIcons loggedIn={user !== null} fullName={fullName} />
                </FlexBetween>) 
                : 
                (<IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                    <Menu sx={{ "&:hover": { color: primary }, "&:focus": { color: primary }, }} />
                </IconButton>)
            }

            {/* MOBILE NAV */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box position="fixed" right="0" bottom="0" z-index="3"
                    height="100%" maxWidth="500px" minWidth="300px"
                    backgroundColor={background}
                >
                    {/* CLOSE ICON */}
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                            <Close sx={{ "&:hover": { color: primary }, "&:focus": { color: primary } }} />
                        </IconButton>
                    </Box>

                    {/* MENU ITEMS */}
                    <FlexBetween display="flex" flexDirection="column" 
                        justifyContent="center" gap="3rem"
                    >
                        <NavBarIcons loggedIn={user !== null} fullName={fullName} />
                    </FlexBetween>
                </Box>
            )}
            
        </FlexBetween>

        {/* SEARCH BAR (MOBILE) */}
        {!isNonMobileScreens && !isMobileMenuToggled && 
            <>
                <Box marginTop="5px" />
                <SearchBar />
            </>
        }
        </Box>
        </>
    );


}

export default Navbar;