import { Typography, useTheme } from "@mui/material";
 import FlexBetween from "components/FlexBetween";
 import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";

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

    // Advertisement
    const ad = useSelector((state) => state.advertisement);
    let adImage = `http://localhost:3001/assets/${ad.picturePath}`;

    console.log(ad)
    console.log(ad.picturePath)

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
                src={adImage}
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
            />

            {/* THIRD ROW */}
            <FlexBetween>
                <Typography color={main}>{ad.name}</Typography>
                <Typography color={medium}>{ad.website}</Typography>
            </FlexBetween>

            <Typography color={medium} m="0.5rem 0">
                {ad.description}
            </Typography>

        </WidgetWrapper>
    )
 }

 export default AdvertWidget