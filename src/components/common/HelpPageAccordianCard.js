import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import helpPageData from './helpPageData'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    padding: 5
  }
}));

export default function HelpPageAccordianCard(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {helpPageData.map((page) => {
        return <Accordion key={page.header}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading} style={{ fontWeight: 'bold' }} >{page.header}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{page.body}</Typography>

          </AccordionDetails>
        </Accordion>
      })}
    </div>
  );
}
