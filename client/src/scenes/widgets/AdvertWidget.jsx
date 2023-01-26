import {
    Box, Typography, Divider, TextField, Button, InputAdornment, useTheme,
    Dialog, DialogActions, DialogContent, DialogTitle
} from "@mui/material";
import { EditOutlined,  } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";

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

    // Token
    const token = useSelector((state) => state.token);

    // Advertisement
    const ad = useSelector((state) => state.advertisement);
    let adImage = `http://localhost:3001/assets/${ad.picturePath}`;

    // Create New Advertisement
    const [image, setImage] = useState(null);       // Optional image to include in post

    const initialNewAd = { name: "", website: "", description: ""}
    const [editNewAd, setEditNewAd] = useState(initialNewAd);
    const [error, setError] = useState(false);

    // Create Advertisement Dialog Box
    const [dialogBox, setDialogBox] = useState(false);
    const closeDialog = () => {
        
        // Check Values
        const checkAdValues = editNewAd.name !== "" && editNewAd.website !== "" && editNewAd.description !== "";

        if (checkAdValues && image) {
            handleAd();
            setDialogBox(false);
            setError(false);
        }
        else {
            setError(true);
        }
           
    }

    const handleAd = async () => {

        // Form Data (to upload image)
        const formData = new FormData();
        formData.append("name", editNewAd.name);
        formData.append("website", editNewAd.website);
        formData.append("description", editNewAd.description);
        formData.append("picture", image);
        formData.append("picturePath", image.path);

        // Create Post in MongoDB
        await fetch(`http://localhost:3001/advertisements`, 
            {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            }
        ).then(async (response) => {
            // Response JSON Object (Error Message)
            const jsonObject = await response.json();

            // No need to return newly created advert (reset values)
            if (response.status === 201) {
                setImage(null);
                setEditNewAd({ name: "", website: "", description: "", });
            }
            else {
                console.error(jsonObject.message);
            }
        });
    }


    // Advert Widget
    return (
        <>
        <WidgetWrapper>

            {/* FIRST ROW */}
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={medium} onClick={ () => setDialogBox(true) }
                    sx={{ "&:hover": { color: palette.primary.main, cursor: "pointer", } }}
                >
                    Create Ad
                </Typography>
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

        {/* DIALOG BOX */}
        <Dialog open={dialogBox} onClose={() => setDialogBox(false)} fullWidth>
            <DialogTitle fontSize="1.5rem" sx={{ textDecoration: "underline" }}>
                Create a new advertisement
                <Divider />
            </DialogTitle>
            <DialogContent>
                
                {/* Company Name */}
                <Box mb="1rem">
                <Typography sx={{ fontWeight: "500", fontSize: "1.2rem", textDecoration: "underline" }}>
                    Company
                </Typography>

                <FlexBetween gap="1rem">
                <TextField fullWidth id="company-name"                        
                    label="Company Name" variant="filled"
                    inputProps={{ maxLength: 50 }}
                    onChange={(e) => setEditNewAd({...editNewAd, name: e.target.value})}
                    value={editNewAd.name} 
                    error={error && editNewAd.name === ""}
                />
                </FlexBetween>
                </Box>

                {/* Company Website */}
                <Box mb="1rem">
                <FlexBetween gap="1rem">
                <TextField fullWidth id="company-website"                        
                    label="Company Website" variant="filled"
                    onKeyDown={(keyEvent) => { if (keyEvent.code  === 'Space') keyEvent.preventDefault() }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">https://</InputAdornment>,
                    }}
                    inputProps={{ maxLength: 50 }}
                    onChange={(e) => setEditNewAd({...editNewAd, website: e.target.value})}
                    value={editNewAd.website}
                    error={error && editNewAd.website === ""}
                />
                </FlexBetween>
                </Box>

                <Divider />

                {/* Ad Description */}
                <Box m="1rem 0rem">
                <Typography sx={{ fontWeight: "500", fontSize: "1.2rem", textDecoration: "underline" }}>
                    Advertisement
                </Typography>

                <FlexBetween gap="1rem">
                <TextField fullWidth id="ad-description"                        
                    label="Ad Description" variant="filled"
                    inputProps={{ maxLength: 150 }}
                    onChange={(e) => setEditNewAd({...editNewAd, description: e.target.value})}
                    value={editNewAd.description}
                    error={error && editNewAd.description === ""}
                />
                </FlexBetween>
                </Box>

                {/* Ad Image */}
                <Box 
                    mt="1rem" p="1rem" borderRadius="5px" 
                    border={`1px solid ${error && !image ? "red" : medium}`} 
                >
                    <Dropzone acceptedFiles=".jpg,.jpeg,.png" multiple={false}
                        onDrop={ (acceptedFiles) =>  setImage(acceptedFiles[0]) }
                    >
                        {({ getRootProps, getInputProps }) => (
                        <Box
                            {...getRootProps()}
                            border={`2px dashed ${palette.primary.main}`}
                            p="1rem" sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                            <input {...getInputProps()} />
                            {!image ? 
                                <div>Add Image Here</div>
                                : 
                                <FlexBetween>
                                    <Typography>{image.name}</Typography>
                                    <EditOutlined />
                                </FlexBetween>
                            }
                        </Box>
                        )}
                    </Dropzone>
                </Box>

                {error &&
                    <Typography mt="0.5rem" sx={{ color: "red", fontWeight: "700" }}>
                        Please fill in all text fields and add an image in order to create an advertisement!
                    </Typography>
                }

            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} sx={{ fontSize: "1rem"}}>Create</Button>
                <Button onClick={() => setDialogBox(false) } sx={{ fontSize: "1rem"}}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </>
    )
 }

 export default AdvertWidget