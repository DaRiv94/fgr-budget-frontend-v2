import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
    registerBtn: {
        color: "#FFFFFF",
        '&:hover': {
            color: "#FFFFFF",
            textDecoration: "none"
        }
    },
    header: {
        textAlign: "center"
    },
    centerize: {
        justifyContent: "center"
    }
});

const validationSchema = yup.object({
    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string("Enter your password")
        .min(2, "Password should be of minimum 2 characters length")
        .required("Password is required"),
    password2: yup
        .string("Enter your password")
        .min(2, "Password should be of minimum 2 characters length")
        .required("Password is required")
});

const RegisterPage = (props) => {
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            password2: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            props.register(values.email, values.password, values.password2)
        }
    });

    return (
        <div>
            <h1 className={classes.header} >Register</h1>
            <form onSubmit={formik.handleSubmit}>
                <Grid className={classes.centerize} container spacing={2}>
                    <Grid container item xs={12} spacing={2}>
                        <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                fullWidth
                                id="email"
                                label="Email"
                                variant="outlined"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                        <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={2}>
                        <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                fullWidth
                                id="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </Grid>
                        <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={2}>
                        <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                fullWidth
                                id="password2"
                                label="Confirm Password"
                                type="password"
                                variant="outlined"
                                value={formik.values.password2}
                                onChange={formik.handleChange}
                                error={formik.touched.password2 && Boolean(formik.errors.password2)}
                                helperText={formik.touched.password2 && formik.errors.password2}
                            />
                        </Grid>
                        <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={2}>
                        <Grid item sm={2}></Grid>
                        <Grid item xs={12} sm={4}>
                            <Button fullWidth color="primary" variant="contained" type="submit">
                                Register User
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Button className={classes.registerBtn}
                                fullWidth
                                color="primary"
                                variant="contained"
                                component={Link} to="/">
                                Back
                            </Button>
                        </Grid>
                        <Grid item sm={2}></Grid>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default RegisterPage;
