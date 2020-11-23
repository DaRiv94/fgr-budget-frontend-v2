import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
// import { Formik } from 'formik';
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import ConfirmationAlert from '../common/ConfirmationAlert'

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
    },
    formControl: {
        maxHeight: 50,
        margin: 0,
        width: "100%"
    },
    deleteBtn: {
        width: "100%"
    }
});

const validationSchema = yup.object({
    category_name: yup
        .string("Enter budget name")
        .min(2, "Name should be of minimum 2 characters length")
        .required("Budget Name is required")
});

const RegisterPage = (props) => {

    const classes = useStyles();
    let { createOrEditCategory,
        budgetList,
        deleteCategory,
        colors, edit_mode,
        category_color_onChange,
        category_name, category_color, select_error } = props

    const formik = useFormik({
        initialValues: {
            category_name: edit_mode ? category_name : ""
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            createOrEditCategory(values.category_name, category_color)
        }
    });

    return (
        <div>

            {!edit_mode && <h1 className={classes.header} >Create a Category</h1>}
            {edit_mode && <h1 className={classes.header} >Edit a Category</h1>}

            <form onSubmit={formik.handleSubmit}>
                <Grid className={classes.centerize} container spacing={2}>
                    <Grid container item xs={12} spacing={2}>
                        <Grid item sm={2}></Grid>
                        <Grid item xs={12} sm={4}>
                            <Button className={classes.registerBtn}
                                fullWidth
                                color="primary"
                                variant="contained"
                                component={Link} to="/budgets">
                                Back
                    </Button>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Button className={classes.registerBtn}
                                fullWidth
                                color="primary"
                                variant="contained"
                                component={Link} to="/help">
                                Help
                    </Button>
                        </Grid>
                        <Grid item sm={2}></Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={2}>
                        <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                fullWidth
                                id="category_name"
                                label="Category Name"
                                variant="outlined"
                                value={formik.values.category_name}
                                onChange={formik.handleChange}
                                error={formik.touched.category_name && Boolean(formik.errors.category_name)}
                                helperText={formik.touched.category_name && formik.errors.category_name}
                            />

                        </Grid>
                        <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                    </Grid>

                    <Grid container item xs={12} spacing={2}>
                        <Grid item sm={3} ></Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl
                                variant="outlined"
                                className={classes.formControl}
                            >

                                <InputLabel id="demo-simple-select-outlined-label">Color</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={category_color}
                                    onChange={category_color_onChange}
                                    label="selected_category_id"
                                    error={select_error}
                                >
                                    {colors.map(color => {
                                        return <MenuItem key={color} style={{ color: color }} value={color}>{color}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={3} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                    </Grid>

                    {edit_mode && <Grid container item xs={12} spacing={2}>
                        <Grid item sm={2}></Grid>
                        <Grid item xs={12} sm={4}>
                            <Button fullWidth color="primary" variant="contained" type="submit">
                                Edit
                    </Button>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            {budgetList.length === 0 && edit_mode && <ConfirmationAlert
                                className={classes.deleteBtn}
                                buttonColor="primary"
                                buttonTitle="DELETE CATEGORY"
                                dialogTitle="Are you sure you want to Delete this Category?"
                                dialogMessage="This action can NOT be undone"
                                dialogCancelActionTitle="Cancel"
                                dialogConfirmActionTitle="Delete"
                                allowConfirm={true}
                                confirmAction={deleteCategory} />}
                            {budgetList.length !== 0 && edit_mode && <ConfirmationAlert
                                className={classes.deleteBtn}
                                buttonColor="primary"
                                buttonTitle="DELETE CATEGORY"
                                dialogTitle="Are you sure you want to Delete this Category?"
                                dialogMessage={<p>Cannot delete category while the following budgets are using it. {budgetList.map((budgetname) => { return <b>{budgetname} </b> })}</p>}
                                dialogCancelActionTitle="Cancel"
                                dialogConfirmActionTitle="Delete"
                                allowConfirm={false}
                                confirmAction={deleteCategory} />}
                        </Grid>
                        <Grid item sm={2}></Grid>
                    </Grid>}
                    {!edit_mode && <Grid container item xs={12} spacing={2}>
                        <Grid item sm={4}></Grid>
                        <Grid item xs={12} sm={4}>
                            <Button fullWidth color="primary" variant="contained" type="submit">
                                Create
                    </Button>
                        </Grid>
                        <Grid item sm={4}></Grid>
                    </Grid>}

                </Grid>
            </form>

        </div>
    );
};

export default RegisterPage;
