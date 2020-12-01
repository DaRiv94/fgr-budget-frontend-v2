import React, { Component } from 'react'
import Info from '../../api/Info';
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
        // console.log("summary:", summary)
        this.setState({
            summary, loading: false
        })
    }

    async getSummary(e) {
        this.setState({
            loading: true
        })
        let summary = await Info.getSummary(e.target.value);
        // console.log("summary:", summary)
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
        let { summary } = this.state;
        // console.log("SummaryMainPage summary:", summary)
        const options = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        return <SummaryPage summary={summary} monthOptions={options} getSummary={this.getSummary} gainLoss={this.gainLoss} />
    }
}

export default Summary
