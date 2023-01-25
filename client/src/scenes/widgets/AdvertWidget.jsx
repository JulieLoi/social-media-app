import { Typography, useTheme } from "@mui/material";
 import FlexBetween from "components/FlexBetween";
 import WidgetWrapper from "components/WidgetWrapper";

 /**
  * AdvertWidget
  * A widget that contains a hardcoded advertisement
  */
 const AdvertWidget = () => {

    // Theme Colors
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    // Advert Widget
    return (
        <WidgetWrapper>

            {/* FIRST ROW */}
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={medium}>Create Ad</Typography>
            </FlexBetween>

            {/* SECOND ROW */}
            <img width="100%" height="auto" alt="advert" 
                src="http://localhost:3001/assets/info4.jpeg"
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
            />

            {/* THIRD ROW */}
            <FlexBetween>
                <Typography color={main}>MikaCosmetics</Typography>
                <Typography color={medium}>mikacosmetics.com</Typography>
            </FlexBetween>

            <Typography color={medium} m="0.5rem 0">
                Your pathway to stunning and immaculate beauty and made sure your skin
                is exfoliating skin and shining like light.
            </Typography>

        </WidgetWrapper>
    )
 }

 export default AdvertWidget