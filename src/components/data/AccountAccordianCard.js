import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import numeral from "numeral";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    // fontWeight: theme.typography.fontWeightRegular,
    padding: 5
  }
}));

export default function AccountAccordianCard(props) {
  const classes = useStyles();
    let {accounts , gainLoss } = props

  return (
    <div className={classes.root}>
        {accounts.map((account)=>{
            return <Accordion key={account.id} >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading} style={{fontWeight:'bold'}} >{account.name}<span style={{fontWeight:'normal'}} > ({account.institution_name})</span>  </Typography>
              <Typography className={classes.heading}>Balance: {numeral(account.balence).format('$0,0.00')}</Typography>
              <Typography className={classes.heading} style={{color:gainLoss(account.monthly_net_spending.net)}}>Monthly Earn/Spend: {numeral(account.monthly_net_spending.net).format('$0,0.00')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <ul>{account.monthly_net_spending.transactions.map(transaction=>{
                    return <Typography key={transaction.name} style={{color:gainLoss(transaction.value)}} ><strong>{numeral(transaction.value).format('$0,0.00')}</strong> - {transaction.date} - {transaction.name}</Typography>
                })}</ul>
              {/* <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography> */}
            </AccordionDetails>
          </Accordion>
        })}
      
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>
            Disabled Accordion
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}
