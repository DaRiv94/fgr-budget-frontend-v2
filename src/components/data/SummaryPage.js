import React from "react";
// import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
// import { useFormik } from "formik";
import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import Typography from "@material-ui/core/Typography";
// import { NavLink } from "react-router-dom";
import AccountAccordianCard from './AccountAccordianCard';


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

const SummaryPage = (props) => {
    const classes = useStyles();
    // const [category_id_for_edit, setCategory_id_for_edit] = React.useState("9999");
    let { summary, getSummary, monthOptions, gainLoss } = props
    console.log("Summary: ",summary)
    console.log("Summary.summary: ",summary.summary)
    return (
        <div>

            <h1 className={classes.header} >Account Summary</h1>

            <Grid className={classes.centerize} container spacing={2}>

                <Grid container item xs={12} spacing={2}>
                    <Grid item sm={2} ></Grid>
                    <Grid item xs={12} sm={4}>
                        <Button className={classes.registerBtn}
                            fullWidth
                            color="primary"
                            variant="contained"
                            component={Link} to="/">
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
                    <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                </Grid>
                <Grid container item xs={12} spacing={2}>
                    <Grid item sm={3} ></Grid>
                    <Grid item xs={12} sm={6}>
                        <h1 style={{textAlign:'center'}}>{summary.month}</h1>
                    </Grid>
                    <Grid item sm={3} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                </Grid>
                <Grid container item xs={12} spacing={2}>
                    <Grid item sm={3} ></Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl
                            variant="outlined"
                            className={classes.formControl}
                        >
                            <InputLabel id="demo-simple-select-outlined-label">Month</InputLabel>
                            <Select
                                // className={classes.selectDropdown}
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                // value={summary.month}
                                onChange={getSummary}
                                label="selected_category_id"
                            >
                                {/* <MenuItem value="">{monthOptions[0]}</MenuItem> */}
                                {monthOptions.map(month => {
                                    return <MenuItem key={month} value={month}>{month}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sm={3} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                </Grid>
                <Grid container item xs={12} spacing={2}>
                    <Grid item sm={2} ></Grid>
                    <Grid item xs={12} sm={8}>
                    {summary.summary && summary.summary.length === 0 &&
                        <div style={{textAlign:'center'}} >
                            <p>There are currently no accounts or transactions here</p>
                            <p>To connect your bank you can head over to the banks section!</p>
                            <p>You will also need to manually trigger the webhook to create some transactions (This can in the banks section after you connect your bank)</p>
                        </div>
                    }
                    {summary.summary && summary.summary.length !== 0 && <AccountAccordianCard accounts={summary.summary} gainLoss={gainLoss} />}
                    {/* <ul className="noPadding">{summary.summary.map((account) => {
                        return <AccountSummary gainLoss={this.gainLoss} key={account.id} account={account} />
                    })}</ul> */}
                    </Grid>
                    <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                </Grid>


            </Grid>

        </div>
    );
};

export default SummaryPage;
