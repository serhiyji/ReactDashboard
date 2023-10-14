import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("Required")
        .min(2, "Minimum length is 2 characters")
        .max(128, "Maximum length is 128 characters"),
    lastName: Yup.string()
        .required("Required")
        .min(2, "Minimum length is 2 characters")
        .max(128, "Maximum length is 128 characters"),
    email: Yup.string().email("Invalid email address").required("Required"),
    phoneNumber: Yup.string()
        .required("Required")
        .min(10, "Minimum length is 10 characters")
        .max(128, "Maximum length is 128 characters")
});

const defaultTheme = createTheme();

const EditUser = () => {
    const userId = "3b9bdcaa-fa8f-44c1-98a5-d3b361b82621";
    const { EditUser, GetUserById } = useActions();
    
    const { selectedUser } = useTypedSelector((store) => store.UserReducer);
    const formik = useFormik({
        initialValues: {
            id: selectedUser.id,
            firstName: selectedUser ? selectedUser.firstName : "",
            lastName: selectedUser ? selectedUser.lastName : "",
            email: selectedUser ? selectedUser.email : "",
            phoneNumber: selectedUser ? selectedUser.phoneNumber : ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            EditUser(values);
        },
    });
    useEffect(() => {
        GetUserById(userId);
        formik.setValues({
            id: selectedUser.id,
            firstName: selectedUser.firstName,
            lastName: selectedUser.lastName,
            email: selectedUser.email,
            phoneNumber: selectedUser.phoneNumber
        });
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Edit User
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={formik.handleSubmit}
                        noValidate
                        sx={{ mt: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
                    >
                        <TextField
                            margin="normal"
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText="First name"
                            sx={{ mr: 1, flex: 1 }}
                        />
                        <TextField
                            margin="normal"
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText="Last name"
                            sx={{ ml: 1, flex: 1 }}
                        />
                        <TextField
                            margin="normal"
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText="Email"
                            fullWidth
                        />
                        <TextField
                            margin="normal"
                            id="phoneNumber"
                            label="Phone number"
                            name="phoneNumber"
                            autoComplete="phoneNumber"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                            helperText="Phone number"
                            fullWidth
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 1, ml: 'auto' }}
                        >
                            Edit User
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default EditUser;