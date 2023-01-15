import { useEffect, useState } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from "@mui/material";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";


import Location from "components/Location";





import { Autocomplete } from '@mui/material';

import { Country, State, City }  from 'country-state-city';





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
    location: yup.string().required("Location Required"),
    occupation: yup.string().required("Occupation Required"),
    picture: yup.string().required("Picture Required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};

// Login Register Schema and Initial Values
const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Please Enter your email"),
    password: yup.string().required('Please Enter your password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    ,
});

const initialValuesLogin = {
    email: "",
    password: ""
};

// Form
const Form = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { palette } = useTheme();
    const isNonMobile = useMediaQuery("(min-width: 600px)");

    // Page State (Login / Register)
    const [pageType, setPageType] = useState("register");
    const isLogin = (pageType === "login");
    const isRegister = (pageType === "register");
    
    // Location
    const [location, setLocation] = useState("")    



    // Register Function
    const register = async (values, onSubmitProps) => {

        values.location = location;
        console.log(values)

        // This allows us to send form info with image
        const formData = new FormData();

        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append('picturePath', values.picture.name);

        // POST API call (sends form data)
        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register", 
            {
                method: "POST",
                body: formData,
            }
        )

        // Get Backend Response (new user)
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();                          // Reset Form

        // Successful API Call, Go to Login Page
        if (savedUser) { setPageType("login") }
    }

    // Login Function
    const login = async (values, onSubmitProps) => {

        // POST API call (sends login data)
        const loggedInResponse = await fetch(
            "http://localhost:3001/auth/login", 
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            }
        )

        // Get Backend Response (User, Token)
        const loggedIn = await loggedInResponse.json(); 
        onSubmitProps.resetForm();                          // Reset Form

        // Successful API Call, Set State (Login), Go to Home Page
        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/home");
        }
    }

    // Handle Form Submit
    const handleFormSubmit = async(values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    // Form Frontend
    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit} autoComplete="off">
                    
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                        }}
                    >
                        {/* REGISTER FORM*/}
                        {isRegister && (
                            <>
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


                                <Location setLocation={setLocation} />
                                <TextField 
                                    label="Location" name="location"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.location}
                                    inputProps={{ maxLength: 50 }}
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{ gridColumn: "span 4" }}
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
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) =>
                                        setFieldValue("picture", acceptedFiles[0])
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            p="1rem"
                                            sx={{ "&:hover": { cursor: "pointer" } }}
                                        >
                                            <input {...getInputProps()} />
                                            {!values.picture ? (
                                            <div>Add Profile Picture Here</div>
                                            ) : (
                                            <FlexBetween>
                                                <Typography>{values.picture.name}</Typography>
                                                <EditOutlined />
                                            </FlexBetween>
                                            )}
                                        </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}

                        {/* LOGIN AND REGISTER */}
                        <TextField 
                            label="Email" name="email"
                            onBlur={handleBlur} onChange={handleChange}
                            value={values.email}
                            inputProps={{ maxLength: 254 }}
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField 
                            label="Password" name="password"
                            type="password" 
                            onBlur={handleBlur} onChange={handleChange}
                            value={values.password}
                            inputProps={{ maxLength: 128 }}
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }}
                        />
                    </Box>

                    {/* SUBMIT BUTTON: Login / Register */}
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1 rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main }
                            }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}

                        </Button>

                        {/* CHANGE BETWEEN LOGIN / REGISTER */}
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login")
                                resetForm()
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
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
