import { useState } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, Divider, useTheme } from "@mui/material";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
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
    const [pageType, setPageType] = useState("login");
    const isLogin = (pageType === "login");
    const isRegister = (pageType === "register");
    
    // States
    const [location, setLocation] = useState("");            // Location Value
    const [errorMessage, setErrorMessage] = useState("");       // Error Message

    // Register Function
    const register = async (values, onSubmitProps) => {

        // Form Data
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append('location', location);
        formData.append('picturePath', values.picture.name);

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
            else { setErrorMessage(jsonObject.msg); }
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
            else { setErrorMessage(jsonObject.msg) }
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
                        {isRegister && (
                            <>
                                <Box
                                    gridColumn="span 4" borderRadius="5px" p="1rem"
                                    border={`1px solid ${palette.neutral.medium}`}
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png" multiple={false}
                                        onDrop={(acceptedFiles) =>
                                            setFieldValue("picture", acceptedFiles[0])
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()} p="1rem"
                                            border={`2px dashed ${palette.primary.main}`}
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

                                
                            </>
                        )}

                        {/* LOGIN AND REGISTER */}
                        <TextField 
                            label="Email" name="email"
                            onBlur={handleBlur} onChange={handleChange}
                            value={values.email}
                            inputProps={{ maxLength: 254 }}
                            error={(Boolean(touched.email) && Boolean(errors.email)) || errorMessage !== ""}
                            helperText={isRegister ? (touched.email && errors.email) : ""}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField 
                            label="Password" name="password"
                            type="password" 
                            onBlur={handleBlur} onChange={handleChange}
                            value={values.password}
                            inputProps={{ maxLength: 128 }}
                            error={(Boolean(touched.password) && Boolean(errors.password)) || errorMessage !== ""}
                            helperText={isRegister ? (touched.password && errors.password) : ""}
                            sx={{ gridColumn: "span 4" }}
                        />
                        {isLogin && errorMessage !== "" &&
                            <Typography 
                                color="red" sx={{ gridColumn: "span 4" }} 
                                margin="-25px 0px"
                            >
                                {errorMessage}
                            </Typography>
                        }
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
                                setPageType(isLogin ? "register" : "login");
                                setErrorMessage("");
                                resetForm();
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
