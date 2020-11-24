import React from 'react'
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";

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

function NotFoundPage() {
  const classes = useStyles();
  return (
    <><h1 className={classes.header} >OH no...</h1>
      <p className={classes.header} >We couldnt find the page you were looking for</p>
      <Grid className={classes.centerize} container spacing={2}>
        <Grid className={classes.gridmargin} container item xs={12} spacing={2}>
          <Grid item sm={2} ></Grid>

          <Grid item xs={12} sm={8}>
            <Button className={classes.registerBtn}
              fullWidth
              color="primary"
              variant="contained"
              component={Link} to="/">
              Go Home
                    </Button>
          </Grid>
          <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
        </Grid>


      </Grid></>
  )
}

export default NotFoundPage