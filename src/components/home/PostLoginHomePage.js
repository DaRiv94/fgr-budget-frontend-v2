import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
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



const PostLoginHomePage = (props) => {
    const classes = useStyles();

    return (
        <div>

            <h1 className={classes.header} >FGR Budget App</h1>
            <h3 className={classes.header} >(Kubernetes Demo)</h3>
            <h3 className={classes.header} >{props.user.email}</h3>


            <Grid className={classes.centerize} container spacing={2}>

                <Grid container item xs={12} spacing={2}>
                    <Grid item sm={2} ></Grid>
                    <Grid item xs={12} sm={4}>
                        <Button className={classes.registerBtn}
                            fullWidth
                            color="primary"
                            variant="contained"
                            component={Link} to="/summary">
                            Account Summary
                            </Button>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Button className={classes.registerBtn}
                            fullWidth
                            color="primary"
                            variant="contained"
                            component={Link} to="/link-bank">
                            Banks
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
                                component={NavLink} to="/budgets">
                                Budgets
                        </Button>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Button className={classes.registerBtn}
                                fullWidth
                                color="primary"
                                variant="contained"
                                component={Link} to="/newtransactionemailtemplateexample">
                                Email Example
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
                                component={Link} onClick={props.logout}>
                                Logout
                        </Button>
                        </Grid>
                        <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                    </Grid>
                </>

            </Grid>

        </div>
    );
};

export default PostLoginHomePage;
