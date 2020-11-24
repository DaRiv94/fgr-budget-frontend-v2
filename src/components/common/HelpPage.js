import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
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
import { NavLink } from "react-router-dom";
import HelpPageAccordianCard from './HelpPageAccordianCard';

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
    selectDropdown: {
        borderRadius: 0,
        minHeight: 30,
        marginLeft: 0,
        width: "100%"
    },
    selectBtn: {
        borderRadius: 0,
        minHeight: 50,
        margin: 0,
        width: "37%",
        color: "#FFFFFF",
        '&:hover': {
            color: "#FFFFFF",
            textDecoration: "none"
        }
    }
});

const HelpPage = (props) => {
    const classes = useStyles();
    // const [category_id_for_edit, setCategory_id_for_edit] = React.useState("9999");
    // let { summary, getSummary, monthOptions, gainLoss } = props
    // console.log("Summary: ", summary)
    // console.log("Summary.summary: ", summary.summary)
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
