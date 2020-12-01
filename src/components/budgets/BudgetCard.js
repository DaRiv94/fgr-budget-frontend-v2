import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
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

export default function BudgetCard(props) {
    const classes = useStyles();
    let { budgetObject } = props

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography className={classes.title} style={{ color: budgetObject.category.color }} gutterBottom>
                    {budgetObject.budget.name} ({ budgetObject.category.name})
                </Typography>
                <Typography className={ budgetObject.budget.budget_real > budgetObject.budget.budget_max ? classes.overBudget: ''} variant="h5" component="h2">
                    {'$' + budgetObject.budget.budget_real}
                </Typography>
                <Typography variant="body2" component="p">
                    Budgeted: {'$' + budgetObject.budget.budget_max}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    className={classes.registerBtn}
                    variant="contained"
                    color="primary"
                    component={Link} to={"/budgets/edit/" + budgetObject.budget.id}
                >
                    Edit
            </Button>

            </CardActions>
        </Card>
    );
}