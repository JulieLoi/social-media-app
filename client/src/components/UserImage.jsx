import { Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * UserImage
 * Profile Image
 */
const UserImage = ({ userId, image, size="60px", allowLink=true }) => {

    const navigate = useNavigate();

    // Palette Theme
    const { palette } = useTheme();
    const borderColor = palette.primary.light;
    const background = palette.background.alt;
    
    // User Image
    return (
        <Box
            width={size} height={size}
            onClick={() => {
                if(window.location.pathname !== `/profile/${userId}` && allowLink) {
                    navigate(`/profile/${userId}`);
                    navigate(0);        // Refresh
                }
            }}
            sx={{ 
                border: `0.1rem solid ${borderColor}`, borderRadius: "50%",
                backgroundColor: background,
                transition: "1s",
                cursor: "pointer"
            }} 
        >
            <img 
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width={size} height={size} alt="user"
                src={`http://localhost:3001/assets/users/${image}`}
            />
        </Box>
    )
}

export default UserImage;