import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TransactionForAssigningCard from './TransactionForAssigningCard'


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

const CategoryAssignToTransactions = (props) => {
    const classes = useStyles();
    let { transactions, categorytransactions, selected_category_id,
        categories, RemoveCategoryfromTransaction, AddCategorytoTransaction } = props

    return (
        <div>

            <h1 className={classes.header} >Add Categories To Transactions</h1>

            <Grid className={classes.centerize} container spacing={2}>

                <Grid container item xs={12} spacing={2}>
                    <Grid item sm={2} ></Grid>
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
                    <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                </Grid>


            </Grid>
            <div>
                {transactions.length === 0 &&

                    <Grid container item xs={12} spacing={2}>
                        <Grid item sm={2} ></Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography style={{ fontWeight: 'bold' }} >
                                There are currently no transactions, go to the Banks page to connect a bank and add transactions
                        </Typography>
                        </Grid>


                        <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                    </Grid>

                }
                {transactions.length !== 0 && transactions.map(transaction => {
                    let assigned_categories = []
                    for (let i = 0; i < categorytransactions.length; i++) {
                        if (categorytransactions[i].transaction_id === transaction.id) {
                            for (let j = 0; j < categories.length; j++) {
                                if (categories[j].id === categorytransactions[i].category_id) {
                                    assigned_categories.push(categories[j])
                                    break
                                }
                            }
                        }
                    }
                    return <Grid key={transaction.id} container item xs={12} spacing={2}>

                        <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                        <Grid item xs={12} sm={8}>
                            <TransactionForAssigningCard
                                RemoveCategoryfromTransaction={RemoveCategoryfromTransaction}
                                assigned_categories={assigned_categories}
                                selected_category_id={selected_category_id}
                                categories={categories}
                                transaction={transaction}
                                AddCategorytoTransaction={AddCategorytoTransaction} />
                        </Grid>
                        <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                    </Grid>
                })}
            </div>
        </div>
    );
};

export default CategoryAssignToTransactions;
