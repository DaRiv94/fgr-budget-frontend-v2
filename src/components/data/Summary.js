import React, { Component } from 'react'
import Info from '../../api/Info';
import { NavLink } from 'react-router-dom';
import AccountSummary from "./AccountSummary";
import Dropdown from './Dropdown';
import './Summary.css';


export class Summary extends Component {
    constructor(props) {
        super(props)

        this.state = {
            summary: {},
            transactions: [],
            loading:false,
            
        }
        this.getSummary=this.getSummary.bind(this);
    }

    async componentWillMount() {
        this.setState({
           loading:true
        })
        let summary = await Info.getSummary();
        console.log("summary:",summary )
        this.setState({
            summary, loading:false
        })
    }

    async getSummary(e){
     console.log("new value:", e.target.value)
     this.setState({
        loading:true
     })
     let summary = await Info.getSummary(e.target.value);
     console.log("summary:",summary )
     this.setState({
         summary, loading:false
     })
    }

    gainLoss(value, classes=""){

        let stringClasses = "";
        for(let i=0; i<classes.length;i++){
            stringClasses += (" "+classes[i])
        }
        let parsedValue = parseFloat(value);
        
        if(parsedValue > 0){
            stringClasses += " red";
        }else{
            stringClasses += " green";
        }
        return stringClasses
    }



    render() {
        let {loading, summary}= this.state;

        const options=['null','January','Febuary','March','April','May','June','July','August','September','October','November','December']
        

        return (
            <div className="parentSummaryDiv"> 
                <NavLink
                    className="btn btn-primary"
                    to="/"
                >Go Home</NavLink>
                {loading && <h2>Loading...</h2>}
                {!loading && <div>
                    <Dropdown getSummary={this.getSummary} options={options}/>
                    <h1 className="center">{summary.month}</h1>
                    <ul className="noPadding">{summary.summary.map((account)=>{
                        return <AccountSummary gainLoss={this.gainLoss} key={account.id} account={account}/> 
                    })}</ul>
                </div>}
                
            </div>
        )
    }
}

export default Summary
