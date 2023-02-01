import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { themeSettings } from "theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";

function App() {

    const mode = useSelector((state) => state.mode);                            // Light/Dark Mode
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);      // Theme
    //const isAuth = Boolean(useSelector((state) => state.token));                // Checks if authorized (token exists)

    return (
        <>
        <BrowserRouter>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage /> } />
                <Route path="/profile/:userId" element={<ProfilePage />} />
            </Routes>
        </ThemeProvider>
        </BrowserRouter>
        </>  
    );
}

export default App;
