import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import numeral from "numeral";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
    formControl: {
        maxHeight: 50,
        margin: '0.5em',
        width: "40%"
    },
    title: {
        fontSize: 14,
    },
    chip: {
        margin: '0.5em',
    },
});

export default function TransactionForAssigningCard(props) {
    const classes = useStyles();
    let { RemoveCategoryfromTransaction, assigned_categories, selected_category_id, transaction, AddCategorytoTransaction } = props

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography className={classes.title} gutterBottom>
                    {transaction.date} - {transaction.name}
                </Typography>
                <Typography variant="h5" component="h2">
                    <strong>{numeral(transaction.amount).format('$0,0.00')}</strong>
                </Typography>
                <FormControl
                    variant="outlined"
                    className={classes.formControl}
                >
                    <InputLabel id="demo-simple-select-outlined-label">Add Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={selected_category_id}
                        onChange={(e) => { AddCategorytoTransaction(e.target.value, transaction.id) }}
                        label="selected_category_id"
                    >
                        <MenuItem value="9999">None</MenuItem>
                        {props.categories.map(category => {
                            return <MenuItem key={category.id} style={{ color: category.color }} value={category.id}>{category.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                {assigned_categories.length !== 0 && assigned_categories.map((category) => {
                    return <Chip
                        key={category.id}
                        label={category.name}
                        onDelete={() => { RemoveCategoryfromTransaction(category.id, transaction.id) }}
                        style={{ color: category.color }}
                        className={classes.chip}
                    />
                })}
            </CardContent>
        </Card>
    );
}