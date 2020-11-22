import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
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

const BudgetPage = (props) => {
    const classes = useStyles();

    return (
        <div>

            <h1 className={classes.header} >Budgets</h1>

            <Grid className={classes.centerize} container spacing={2}>

                <Grid container item xs={12} spacing={2}>
                    <Grid item sm={2} ></Grid>
                    <Grid item xs={12} sm={4}>
                        <Button className={classes.registerBtn}
                            fullWidth
                            color="primary"
                            variant="contained"
                            component={Link} to="/">
                            Main Menu
                            </Button>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Button className={classes.registerBtn}
                            fullWidth
                            color="primary"
                            variant="contained"
                            component={Link} to="/category/assign-to-transaction">
                            Add categories to transactions
                            </Button>
                    </Grid>
                    <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                </Grid>
                    <>
                    <Grid container item xs={12} spacing={2}>
                        <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                        <Grid item xs={12} sm={4}>
                            <Button className={classes.registerBtn}
                                fullWidth
                                color="primary"
                                variant="contained"
                                component={Link} to="/budgets/create">
                                New Budget
                        </Button>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Button className={classes.registerBtn}
                                fullWidth
                                color="primary"
                                variant="contained"
                                component={Link} to="/category/create">
                                New Category
                        </Button>
                        </Grid>
                        <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={2}>
                        <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                        <Grid item xs={12} sm={4}>
                            <Button className={classes.registerBtn}
                                fullWidth
                                color="primary"
                                variant="contained"
                                component={Link} to="/help">
                                Help
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
                        <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                    </Grid>
                    </>

            </Grid>

        </div>
    );
};

export default BudgetPage;
