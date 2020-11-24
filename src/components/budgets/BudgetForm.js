import React from "react";
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
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
    budget_name: yup
        .string("Enter budget name")
        .min(2, "Name should be of minimum 2 characters length")
        .required("Budget Name is required"),
    budget_max: yup
        .number("Enter budget goal")
        .typeError("Budget Goal must be a number")
        .positive("Budget Goal can not be negative")
        .required("Budget Goal is required"),
});

const RegisterPage = (props) => {

    const classes = useStyles();
    let { createOrEditBudget,
        deleteBudget,
        categories, edit_mode,
        budget_category_id,
        budget_category_id_onChange,
        budget_name, budget_max, select_error } = props

    const formik = useFormik({
        initialValues: {
            budget_name: edit_mode ? budget_name : "",
            budget_max: edit_mode ? budget_max : 0,
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            createOrEditBudget(values.budget_name, values.budget_max, budget_category_id)
        }
    });

    return (
        <div>

            {!edit_mode && <h1 className={classes.header} >Create a Budget</h1>}
            {edit_mode && <h1 className={classes.header} >Edit a Budget</h1>}
            {/* <Formik
                initialValues={{ budget_name: 'jared' }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        createOrEditBudget(values.budget_name, values.budget_max, budget_category_id)
                        actions.setSubmitting(false);
                    }, 1000);
                }}
            > */}
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
                                id="budget_name"
                                label="Budget Name"
                                variant="outlined"
                                value={formik.values.budget_name}
                                // value="Some value"
                                onChange={formik.handleChange}
                                error={formik.touched.budget_name && Boolean(formik.errors.budget_name)}
                                helperText={formik.touched.budget_name && formik.errors.budget_name}
                            />

                        </Grid>
                        <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={2}>
                        <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                fullWidth
                                id="budget_max"
                                label="Budget Goal"
                                variant="outlined"
                                value={formik.values.budget_max}
                                onChange={formik.handleChange}
                                error={formik.touched.budget_max && Boolean(formik.errors.budget_max)}
                                helperText={formik.touched.budget_max && formik.errors.budget_max}
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
                                {/* <select name="select_tag" onChange={this.budget_category_id_onChange} value={budget_category_id}>
                                 <option value="">None</option>
                                 {categories.map(category => {
                                     return <option key={category.id} style={{ color: category.color }} value={category.id}>{category.name}</option>
                                 })}
                             </select> */}
                                <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                                <Select
                                    // className={classes.selectDropdown}
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={budget_category_id}
                                    onChange={budget_category_id_onChange}
                                    label="selected_category_id"
                                    error={select_error}
                                >
                                    {/* <MenuItem value="">{monthOptions[0]}</MenuItem> */}
                                    {categories.map(category => {
                                        return <MenuItem key={category.id} style={{ color: category.color }} value={category.id}>{category.name}</MenuItem>
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
                            <ConfirmationAlert
                                className={classes.deleteBtn}
                                buttonColor="primary"
                                buttonTitle="DELETE BUDGET"
                                dialogTitle="Are you sure you want to Delete this Budget?"
                                dialogMessage="This action can NOT be undone."
                                dialogCancelActionTitle="Cancel"
                                dialogConfirmActionTitle="Delete"
                                allowConfirm={true}
                                confirmAction={deleteBudget} />
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
