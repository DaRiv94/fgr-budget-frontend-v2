import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        // minWidth: 275,
    },
    title: {
        fontSize: 14,
    },

    registerBtn: {
        color: "#FFFFFF",
        '&:hover': {
            color: "#FFFFFF",
            textDecoration: "none"
        }
    },
    overBudget:{
        color:"red"
    }
});

export default function BankCard(props) {
    const classes = useStyles();
    let { bank, manuallytriggerwebhook } = props

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} gutterBottom>
                Bank
                </Typography>
                <Typography  variant="h5" component="h2">
                {bank.institution_name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    className={classes.registerBtn}
                    variant="contained"
                    color="primary"
                    onClick={() => { manuallytriggerwebhook(bank.item_id) }}
                >
                    Get past 10 day transactions
            </Button>

            </CardActions>
        </Card>
    );
}