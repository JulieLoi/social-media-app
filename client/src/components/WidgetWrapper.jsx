import { Box } from "@mui/material";
import { styled } from "@mui/system";

/**
 * WidgetWrapper
 * Base styling for the widgets
 */
const WidgetWrapper = styled(Box)(({ theme }) => ({
    padding: "1.5rem 1.5rem 0.75rem 1.5rem",
    backgroundColor: theme.palette.background.alt,
    borderRadius: "0.75rem",
    border: `1px solid ${theme.palette.background.default}`,
}))

export default WidgetWrapper;