
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FGR_icon from './images/FGR_Transparent.png'

const useStyles = makeStyles({
        centerize: {
                marginTop: "2vh",
                justifyContent: "center",
                textAlign: "center"
        },
        icon: {
                padding: "3px",
                maxHeight: "100%",
                width: "100%",
                minWidth: "20px",
                maxWidth: "40px"
        }
});

const Footer = () => {
        const classes = useStyles();
        return (
                <Grid className={classes.centerize} container spacing={2}>
                        <Grid container item xs={12} spacing={2}>
                                <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                                <Grid item xs={12} sm={8}>

                                        {/* <p className={classes.centerize} >Learn more about this <a href="https://frankieriviera.com/portfolio/kubernetes-demo" >kubernetes demo here</a></p> */}
                                        <p className={classes.centerize} >Created by <a href="Https://frankieriviera.com" >frankieriviera.com <img className={classes.icon} src={FGR_icon} /></a></p>

                                </Grid>
                                <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                        </Grid>
                </Grid>
        );
};

export default Footer;
