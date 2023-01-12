import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * UserImage
 * Profile Image
 */
const UserImage = ({ userId, image, size="60px" }) => {

    const navigate = useNavigate();

    return (
        <Box
            width={size}
            height={size}
            onClick={() => {
                navigate(`/profile/${userId}`);
                navigate(0);        // Refresh
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