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
import BudgetCard from './BudgetCard';

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
        width: "63%"
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

const BudgetPage = (props) => {
    const classes = useStyles();
    const [category_id_for_edit, setCategory_id_for_edit] = React.useState("9999");

    const handleChange = (event) => {
        setCategory_id_for_edit(event.target.value);
    };

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
                            component={Link} to="/help">
                            Help
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
                        <div>
                            <Button
                                className={classes.selectBtn}
                                variant="contained"
                                color="primary"
                                component={Link} to={"/category/edit/" + category_id_for_edit}
                            >
                                Edit
                                </Button>
                            <FormControl
                                error={false}
                                variant="outlined"
                                className={classes.formControl}
                            >
                                <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                                <Select
                                    className={classes.selectDropdown}
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={category_id_for_edit}
                                    onChange={handleChange}
                                    label="Category_id_for_edit"
                                >
                                    <MenuItem value="9999">None</MenuItem>
                                    {props.categories.map(category => {
                                        return <MenuItem key={category.id} style={{ color: category.color }} value={category.id}>{category.name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </div>
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
                {props.budgets.length == 0 ?
                    <p>No budgets here</p> : props.budgetObjects.map((budgetObject) => {
                        let odd_even_index = parseInt(props.budgetObjects.indexOf(budgetObject)) % 2 == 0 ? "even" : "odd"
        
                        if(odd_even_index == 'even'){
                            console.log("IS EVEN")
                        }else{
                            console.log("IS ODD")
                        }
                        return <Grid key={budgetObject.budget.id} container item xs={12} spacing={2}>
                            
                             <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                            <Grid item xs={12} sm={8}>
                                <BudgetCard budgetObject={budgetObject} />
                            </Grid>
                             <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
                        </Grid>

                        //WILL WANT TO CREATE A BUDGET COMPONENT AND PAGE IN THE CATEGORIES AND 
                        //  return <div key={budgetObject.budget.id}>
                        //      <p style={{ color: budgetObject.category.color }} >NAME: {budgetObject.budget.name} ({budgetObject.category.name}) 
                        //      <Button className={classes.registerBtn}
                        //         fullWidth
                        //         color="primary"
                        //         variant="contained"
                        //         component={Link} to={"/budgets/edit/" + budgetObject.budget.id}>
                        //         Edit
                        // </Button>
                        //      </p>
                        //      <p>Budget MAX: {budgetObject.budget.budget_max}</p>
                        //      <p>Budget Real: {budgetObject.budget.budget_real}</p>
                        //  </div>
                    })}


            </Grid>

        </div>
    );
};

export default BudgetPage;
