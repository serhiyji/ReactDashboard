import React, { useEffect } from "react";
import { useFormik } from "formik";
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
import { useState } from "react";
import { Navigate } from "react-router-dom";

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
    role: Yup.string().required("Required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Passwords must match")
        .required("Required"),
});

const defaultTheme = createTheme();

const CreateUser = () => {
    const [ isRedirect, setIsRedirect ] = useState(false);
    const { CreateUser, GetallRoles } = useActions();
    useEffect(()=>{
        GetallRoles();
    }, [])
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            role: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            CreateUser(values);
            setIsRedirect(true);
        },
    });
    const { allRoles } = useTypedSelector((store) => store.RoleReducer);
    if(isRedirect)
    {
        return <Navigate to="/dashboard/users"/>
    }else
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
                        Create User
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
                            helperText={formik.touched.firstName && formik.errors.firstName}
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
                            helperText={formik.touched.lastName && formik.errors.lastName}
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
                            helperText={formik.touched.email && formik.errors.email}
                            fullWidth
                        />
                        <TextField
                            margin="normal"
                            id="role"
                            label="Role"
                            name="role"
                            select
                            SelectProps={{
                                native: true,
                            }}
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.role && Boolean(formik.errors.role)}
                            helperText={formik.touched.role && formik.errors.role}
                            fullWidth
                        >
                            <option value=""></option>
                            {allRoles.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            margin="normal"
                            id="password"
                            label="Password"
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            fullWidth
                        />
                        <TextField
                            margin="normal"
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            autoComplete="new-password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.confirmPassword &&
                                Boolean(formik.errors.confirmPassword)
                            }
                            helperText={
                                formik.touched.confirmPassword && formik.errors.confirmPassword
                            }
                            fullWidth
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 1, ml: 'auto' }}
                        >
                            CreateUser
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default CreateUser;
