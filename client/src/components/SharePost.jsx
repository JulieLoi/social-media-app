import { useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { ShareOutlined } from "@mui/icons-material";
import {
    FacebookShareButton, LinkedinShareButton, RedditShareButton, TwitterShareButton, 
    FacebookIcon, TwitterIcon, LinkedinIcon, RedditIcon
} from "react-share";
import FlexBetween from "./FlexBetween";

const SharePost = ({ description="" }) => {

    const { palette } = useTheme();
    const [share, setShare] = useState(false);      // Share Button
    const shareURL = "https://www.youtube.com/watch?v=K8YELRmUb5o";
    const iconSize = 28;

    return (
        <FlexBetween position={"relative"}>
        <IconButton onClick={() => setShare(!share)}>
            {share ?
                <ShareOutlined sx={{ color: palette.primary.main, zIndex: "2" }} />
                :
                <ShareOutlined />
            }
        </IconButton>
        {share &&
                <FlexBetween position={"absolute"} left={"35px"} sx={{ marginTop: "5px" }}>
                     <Box>
                     <FacebookShareButton url={shareURL} quote={description}>
                        <FacebookIcon size={iconSize} round />
                    </FacebookShareButton>
                     </Box>

                    <Box sx={{ marginLeft: "5%" }}>
                    <TwitterShareButton url={shareURL} quote={description}>
                        <TwitterIcon size={iconSize} round />
                    </TwitterShareButton>
                    </Box>

                    <Box sx={{ marginLeft: "5%" }}>
                    <LinkedinShareButton url={shareURL} quote={description}>
                        <LinkedinIcon size={iconSize} round />
                    </LinkedinShareButton>
                    </Box>

                    <Box sx={{ marginLeft: "5%" }}>
                    <RedditShareButton url={shareURL} quote={description}>
                        <RedditIcon size={iconSize} round />
                    </RedditShareButton>
                    </Box>
                </FlexBetween>
            }
        </FlexBetween>
    )
}

export default SharePost;