import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';

/**
 * Navigate Top Component
 * Component used to navigate to the top of the page
 */
const NavigateTop = () => {

    const { palette } = useTheme(); 
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");    // Mobile/PC

    return (
        <>
            {/* NAVIGATE TOP ICON */}
            <IconButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth", })}>
            <ArrowCircleUpRoundedIcon 
                sx={{ 
                    position: "fixed", bottom: "0.5rem", right: "0.5rem", 
                    color: palette.primary.dark, fontSize: isNonMobileScreens ? "4rem" : "3rem",
                    "&:hover": { color: palette.primary.main }
                }}
             />
            </IconButton>
        </>
    )
}

export default NavigateTop;