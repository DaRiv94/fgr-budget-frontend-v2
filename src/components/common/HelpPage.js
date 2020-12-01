import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import HelpPageAccordianCard from './HelpPageAccordianCard';

const useStyles = makeStyles({
    registerBtn: {
        color: "#FFFFFF",
        '&:hover': {
            color: "#FFFFFF",
            textDecoration: "none"
        }
    },
    centerize: {
        justifyContent: "center"
    }
});

const HelpPage = (props) => {
    const classes = useStyles();
    return (
        <div>
            <Grid className={classes.centerize} container spacing={2}>
                <Grid container item xs={12} spacing={2}>
                    <Grid item sm={3} ></Grid>
                    <Grid item xs={12} sm={6}>
                        <h1 style={{ textAlign: 'center' }}>Help Page</h1>
                    </Grid>
                    <Grid item sm={3} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                </Grid>
                <Grid container item xs={12} spacing={2}>
                    <Grid item sm={2} ></Grid>
                    <Grid item xs={12} sm={8}>
                        <Button className={classes.registerBtn}
                            fullWidth
                            color="primary"
                            variant="contained"
                            component={Link} to="/">
                            Main Menu
                            </Button>
                    </Grid>
                    <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                </Grid>

                <Grid container item xs={12} spacing={2}>
                    <Grid item sm={2} ></Grid>
                    <Grid item xs={12} sm={8}>
                        <HelpPageAccordianCard />

                    </Grid>
                    <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                </Grid>


            </Grid>

        </div>
    );
};

export default HelpPage;
