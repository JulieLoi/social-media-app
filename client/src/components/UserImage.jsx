import { Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * UserImage
 * Profile Image
 */
const UserImage = ({ userId, image, size="60px" }) => {

    const navigate = useNavigate();

    // Palette Theme
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    
    // User Image
    return (
        <Box
            width={size} height={size}
            onClick={() => {
                navigate(`/profile/${userId}`);
                navigate(0);        // Refresh
            }}
            sx={{ 
                color: main, 
                fontSize: "2rem",
                transition: "1s",
                "&:hover": { 
                    cursor: "pointer", color: primary,
                    transform: "scale(1.25)",
                    transition: "1s",
                } 
            }} 
        >
            <img 
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width={size} height={size} alt="user"
                src={`http://localhost:3001/assets/${image}`}
            />
        </Box>
    )
}

export default UserImage;