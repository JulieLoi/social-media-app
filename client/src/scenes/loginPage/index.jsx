import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

/**
 * Login Page
 * You can either login or create an account, then login
 */
const LoginPage = () => {

    const navigate = useNavigate();

    // Theme Colors
    const { palette } = useTheme();
    const alt = palette.background.alt;
    const token = useSelector((state) => state.token);

    // Mobile/PC
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    // Go to Home Page (Token exists)
    useEffect(() => {
        if (token !== null) { navigate(`/home`) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Login Page
    return (
        <Box>
            <Box width="100%" backgroundColor={alt} 
                p="1rem 6%" textAlign="center"
            >
                <Typography fontWeight="bold" fontSize="32px" color="primary">
                    Sociopedia
                </Typography>
            </Box>
            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem" m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={alt}
            >
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                    Welcome to Sociopedia, the Social Media for Sociopaths!
                </Typography>
                <Form />
            </Box>
            <br />
        </Box>
    )
}

export default LoginPage;