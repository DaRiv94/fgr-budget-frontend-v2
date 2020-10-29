import React from 'react'
import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';
import "./AccountSummary.css";
import numeral from "numeral";


function AccountSummary(props) {
    return (
        <div className="summaryDiv">
           
           <h3 className="leftBreather">{props.account.name}</h3>
           <p className="leftBreather">Balence: {numeral(props.account.balence).format('$0,0.00')}</p>
           <ul className="noPadding">
               <li className={props.gainLoss(props.account.monthly_net_spending.net, ["leftBreather"])}>Net spending: {numeral(props.account.monthly_net_spending.net).format('$0,0.00')}</li>
               <li className={props.gainLoss(props.account.monthly_net_spending.out, ["leftBreather"])}>Out: {numeral(props.account.monthly_net_spending.out).format('$0,0.00')}</li>
               <Accordion atomic={true}>

                <AccordionItem title={props.account.name + " values"}>
                <ul>{props.account.monthly_net_spending.transactions.map(transaction=>{
                    return <li key={transaction.name} className={props.gainLoss(transaction.value, ["tranactionBreather"])} ><strong>{numeral(transaction.value).format('$0,0.00')}</strong> - {transaction.date} - {transaction.name}</li>
                })}</ul>
                </AccordionItem>
            </Accordion>
           </ul>
        </div>
    )
}

export default AccountSummary
