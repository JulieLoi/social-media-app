import { Box } from "@mui/material";
import { styled } from "@mui/system";

/**
 * FlexBetween
 * This allows us to reuse this set of CSS properties in different areas.
 */
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
});

export default FlexBetween;