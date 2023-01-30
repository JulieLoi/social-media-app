import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import { Formik } from "formik";
import * as yup from "yup";
import { v4 as uuidv4 } from 'uuid';
import { setLogin } from "state";

import { Box, Button, TextField, useMediaQuery, Typography, Divider, useTheme } from "@mui/material";
import EditOutlined from "@mui/icons-material/EditOutlined";
import FlexBetween from "components/FlexBetween";
import Location from "components/Location";

// Register Schema and Initial Values
const registerSchema = yup.object().shape({
    firstName: yup.string().required("First Name Required")
        .matches(/(?=.{2,})/, "Must Be 2-50 Characters"),
    lastName: yup.string().required("Last Name Required")
        .matches(/(?=.{2,})/, "Must Be 2-50 Characters"),
    email: yup.string().email("Invalid Email").required("Email Required"),
    password: yup.string().required('Password Required')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    occupation: yup.string().required("Occupation Required"),
    picture: yup.string().required("Picture Required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    occupation: "",
    picture: "",
};

// Login Register Schema and Initial Values
const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Email Required"),
    password: yup.string().required("Password Required").min(8, "Password must be at least 8 characters"),
});

const initialValuesLogin = {
    email: "",
    password: ""
};

// Form
const Form = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");

    // Theme Colors
    const { palette } = useTheme();
    const main = palette.primary.main;

    // Dropzone
    const maxSize = 1048576*2;      // 2MB

    // Page State (Login / Register)
    const [pageType, setPageType] = useState("login");
    const isLogin = (pageType === "login");
    const isRegister = (pageType === "register");
    
    // Location (Optional)
    const [location, setLocation] = useState("");

    // Wrong Email or Password
    const [error, setError] = useState("");

    // Register Function
    const register = async (values, onSubmitProps) => {

        const ext = values.picture.name.split('.').pop();
        const userImagePath = `user${uuidv4().replaceAll('-', '')}.${ext}`;

        // Form Data
        const formData = new FormData();
        formData.append('location', location);
        formData.append('picturePath', userImagePath);      // Rename User Profile Image
        formData.append("serverPath", "/users");            // Multer Disk Storage (Path)
        for (let value in values) {
            formData.append(value, values[value]);
        }
        
        // POST API call (sends form data)
        await fetch("http://localhost:3001/auth/register", 
            {
                method: "POST",
                body: formData,
            }
        ).then(async (response) => {
            // Response JSON Object
            const jsonObject = await response.json();

            // Register Successful (Go to Login)
            if (response.status === 201) {
                onSubmitProps.resetForm();     // Reset Form
                setPageType("login");
            }
            else { setError(jsonObject.message); }
        });
    }

    // Login Function
    const login = async (values) => {

        // POST API call (sends login data)
        await fetch(
            "http://localhost:3001/auth/login", 
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            }
        ).then(async (response) =>  {
            // Response JSON Object
            const jsonObject = await response.json();

            // Authentication Successful (Login, Go to Home Page)
            if (response.status === 200) {
                dispatch(
                    setLogin({
                        user: jsonObject.user,
                        token: jsonObject.token,
                    })
                );
                navigate("/home");
            }
            else { setError(jsonObject.message); }
        });
    }

    // Handle Form Submit
    const handleFormSubmit = async(values, onSubmitProps) => {
        if (isLogin) await login(values);
        if (isRegister) await register(values, onSubmitProps);
    };

    /**
     * Stop enter submitting the form.
     * @param keyEvent Event triggered when the user presses a key.
     */
    const onKeyDown = (keyEvent) => {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }

    // Form Frontend
    return (
        <Formik
            onSubmit={handleFormSubmit} 
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
            validateOnChange={false} validateOnBlur={false}
        >
            {({
                values, errors, touched,
                handleBlur, handleChange, handleSubmit,
                setFieldValue, resetForm,
            }) => (
                <form onSubmit={handleSubmit} onKeyDown={onKeyDown}>
                <Box display="grid" gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
                >
                    {/* REGISTER FORM*/}
                    {isRegister && 
                        (<>
                            <Box
                                gridColumn="span 4" borderRadius="5px" p="1rem"
                                border={`1px solid ${palette.neutral.medium}`}
                            >
                                <Dropzone
                                    acceptedFiles=".jpg, .jpeg,.png" multiple={false}
                                    onDrop={(acceptedFiles, rejectedFiles) => {
                                        //console.log("accepted files", acceptedFiles)
                                        //console.log("rejected files", rejectedFiles)
                                        setFieldValue("picture", acceptedFiles[0])
                                    }}
                                    accept={{ 'image/jpeg': ['.jpeg', '.jpg'], 'image/png': ['.png'] }}
                                    minSize={0}
                                    maxSize={maxSize}
                                >
                                    {({ getRootProps, getInputProps }) => (
                                    <Box
                                        {...getRootProps()} p="1rem"
                                        border={`2px dashed ${Boolean(errors.picture) ? "red" : main}`}
                                        sx={{ "&:hover": { cursor: "pointer" } }}
                                    >
                                        <input {...getInputProps()} />
                                        {!values.picture ? (
                                            <div>Add Image Here (.jpg, .jpeg, .png) - 10MB</div>
                                        ) : (
                                            <FlexBetween>
                                                <Typography>{values.picture.name}</Typography>
                                                <EditOutlined sx={{ "&:hover": { color: main, cursor: "pointer" } }} />
                                            </FlexBetween>
                                        )}
                                    </Box>
                                    )}
                                </Dropzone>
                            </Box>

                            <TextField 
                                label="First Name" name="firstName"
                                onBlur={handleBlur} onChange={handleChange}
                                value={values.firstName}
                                inputProps={{ maxLength: 50 }}
                                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            
                            <TextField 
                                label="Last Name" name="lastName"
                                onBlur={handleBlur} onChange={handleChange}
                                value={values.lastName}
                                inputProps={{ maxLength: 50 }}
                                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField 
                                label="Occupation" name="occupation"
                                onBlur={handleBlur} onChange={handleChange}
                                value={values.occupation}
                                inputProps={{ maxLength: 50 }}
                                error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                helperText={touched.occupation && errors.occupation}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <Divider sx={{ gridColumn: "span 4" }} />
                            <Location setLocation={setLocation}  />
                            <TextField disabled
                                label="Location (Optional)" name="location" 
                                onBlur={handleBlur} 
                                value={location}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <Divider sx={{ gridColumn: "span 4" }} />
                            
                        </>)
                    }

                    {/* LOGIN AND REGISTER */}
                    <TextField 
                        label="Email" name="email"
                        onBlur={handleBlur} onChange={handleChange}
                        value={values.email}
                        inputProps={{ maxLength: 254 }}
                        error={ (Boolean(touched.email) && Boolean(errors.email)) || (error !== "") }
                        helperText={(touched.email && errors.email)}
                        sx={{ gridColumn: "span 4" }}
                    />
                    <TextField 
                        label="Password" name="password"
                        type="password" 
                        onBlur={handleBlur} onChange={handleChange}
                        value={values.password}
                        inputProps={{ maxLength: 128 }}
                        error={ (Boolean(touched.password) && Boolean(errors.password)) || (error !== "") }
                        helperText={error === "" ? (errors.password) : error}
                        sx={{ gridColumn: "span 4" }}
                    />
                </Box>

                {/* SUBMIT BUTTON: Login / Register */}
                <Box>
                    <Button fullWidth type="submit"
                        sx={{
                            m: "2rem 0", p: "1 rem",
                            backgroundColor: main,
                            color: palette.background.alt,
                            "&:hover": { color: main }
                        }}
                    >
                        <Typography fontWeight="700" variant="h5">
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Typography>
                    </Button>

                    {/* CHANGE BETWEEN LOGIN / REGISTER */}
                    <Typography
                        onClick={() => {
                            setPageType(isLogin ? "register" : "login");
                            resetForm();
                        }}
                        sx={{
                            textDecoration: "underline",
                            color: main,
                            "&:hover": {
                                cursor: "pointer",
                                color: palette.primary.light,
                            },
                        }}
                    >
                        {isLogin 
                            ? "Don't have an account? Sign up here!" 
                            : "Already have an account? Login here!"
                        }
                    </Typography>

                </Box>
                </form>
            )}
        </Formik>
    );
};



export default Form;
