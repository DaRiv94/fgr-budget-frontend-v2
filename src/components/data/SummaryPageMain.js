import React, { Component } from 'react'
import Info from '../../api/Info';
import { NavLink } from 'react-router-dom';
import AccountSummary from "./AccountSummary";
import Dropdown from './Dropdown';
import './Summary.css';
import SummaryPage from './SummaryPage'


export class Summary extends Component {
    constructor(props) {
        super(props)

        this.state = {
            summary: {},
            transactions: [],
            loading: false,
            

        }
        this.getSummary = this.getSummary.bind(this);
    }

    async componentWillMount() {
        this.setState({
            loading: true
        })
        let summary = await Info.getSummary();
        console.log("summary:", summary)
        this.setState({
            summary, loading: false
        })
    }

    async getSummary(e) {
        console.log("new value:", e.target.value)
        this.setState({
            loading: true
        })
        let summary = await Info.getSummary(e.target.value);
        console.log("summary:", summary)
        this.setState({
            summary, loading: false
        })
    }

    gainLoss(value, classes = "") {

        let stringClasses = "";
        for (let i = 0; i < classes.length; i++) {
            stringClasses += (" " + classes[i])
        }
        let parsedValue = parseFloat(value);

        if (parsedValue > 0) {
            stringClasses += " red";
        } else {
            stringClasses += " green";
        }
        return stringClasses
    }



    render() {
        let { loading, summary } = this.state;
        console.log("SummaryMainPage summary:",summary)
        const options = [ 'January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        // const options = ['null', 'January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        return <SummaryPage summary={summary} monthOptions={options} getSummary={this.getSummary} gainLoss={this.gainLoss} />
        // return (
        //     <div className="parentSummaryDiv">
        //         <NavLink
        //             className="btn btn-primary"
        //             to="/"
        //         >Go Home</NavLink>
        //         {loading && <h2>Loading...</h2>}
        //         {!loading && <div>
        //             <Dropdown getSummary={this.getSummary} options={options} />
        //             <h1 className="center">{summary.month}</h1>
                    // {summary.summary.length === 0 &&
                    //     <div>
                    //         <p>There are currently no accounts or transactions here</p>
                    //         <p>To connect your bank you can head over to the banks section!</p>
                    //         <p>You will also need to manually trigger the webhook to create some transactions (This can in the banks section after you connect your bank)</p>
                    //         <NavLink
                    //             className="btn btn-primary"
                    //             to="/linkrelink"
                    //         >Banks</NavLink>
                    //     </div>
                    // }
                    // <ul className="noPadding">{summary.summary.map((account) => {
                    //     return <AccountSummary gainLoss={this.gainLoss} key={account.id} account={account} />
                    // })}</ul>
        //         </div>}

        //     </div>
        // )
    }
}

export default Summary
