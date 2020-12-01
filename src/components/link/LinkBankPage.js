import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import BankCard from './BankCard';
import { PlaidLink } from 'react-plaid-link';

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
});

const LinkBankPage = (props) => {
    const classes = useStyles();
    let { onSuccess, manuallytriggerwebhook, link_token, banks } = props

    return (
        <div>
            <h1 className={classes.header} >Banks</h1>

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
                            component={Link} to="/help">
                            Help
                            </Button>
                    </Grid>
                    <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                </Grid>
                <Grid container item xs={12} spacing={2}>

                    <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                    <Grid item xs={12} sm={8}>
                        <PlaidLink
                            style={{
                                padding: '10px 8px',
                                outline: 'none',
                                background: '#3f51b5',
                                color: 'white',
                                minWidth: "100%"
                            }}
                            token={link_token}
                            onSuccess={onSuccess}
                        >
                            Connect a bank account
                </PlaidLink>
                    </Grid>
                    <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                </Grid>
                <Grid container item xs={12} spacing={2}>
                    <Grid item sm={2} ></Grid>
                    <Grid item xs={12} sm={8}>
                        <Typography style={{ fontWeight: 'bold' }} >
                            Note: In this demo mode, dummy username and password accounts can be used with the following credentials Username: "user_good" Password: "pass_good"
                            </Typography>
                    </Grid>


                    <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                </Grid>

                {banks.length === 0 ?
                    <p>No Banks here</p> : banks.map((bank) => {

                        return <Grid key={bank.id} container item xs={12} spacing={2}>

                            <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                            <Grid item xs={12} sm={8}>
                                <BankCard bank={bank} manuallytriggerwebhook={manuallytriggerwebhook} />
                            </Grid>
                            <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                        </Grid>

                    })}

            </Grid>

        </div>
    );
};

export default LinkBankPage;
