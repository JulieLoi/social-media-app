import { useState } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from "@mui/material";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

// Register Schema and Initial Values
const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
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
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesLogin = {
    email: "",
    password: ""
};

// Form
const Form = () => {
    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const isLogin = (pageType === "login");
    const isRegister = (pageType === "register");

    // Register Function
    const register = async (values, onSubmitProps) => {
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
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        // Successful API Call, Go to Login Page
        if (savedUser) {
            setPageType("login")
        }
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
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();

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
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField 
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField 
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField 
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField 
                                    label="Occupation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name="occupation"
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
                                            <p>Add Picture Here</p>
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
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField 
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }}
                        />
                    </Box>
                    {/* BUTTONS */}
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
