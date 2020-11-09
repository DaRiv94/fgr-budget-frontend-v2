import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Auth from "../../auth/auth";
import { PlaidLink } from 'react-plaid-link';
// import './LinkReLinkPage.css'
import Plaid from '../../api/Plaid';
import Info from '../../api/Info';

export class BudgetsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            password: "",
            // authenticated: false
            error: "",
            errorA: [],
            link_token:"",
            user:{},
            budgets:[],
            categories:[]


        }
        // this.onSuccess = this.onSuccess.bind(this);
        // this.getLinkToken = this.getLinkToken.bind(this);
        // this.logout=this.logout.bind(this);
    }

    async componentWillMount() {
        let token = sessionStorage.getItem('token');
        if (token != null) {
            Auth.isAuthenticated = true;
        }

        let budgetinfo = await Info.getBudgets()

        this.setState({
            user:budgetinfo.user,
            budgets: budgetinfo.budgets,
            categories: budgetinfo.categories
        })
    }







    render() {

        return (
            <div>
                <h1>Budgets!</h1>

                {this.state.budgets.length == 0 ?
                <p>No budgets here</p>: this.state.budgets.map((budget)=>{
                    //WILL WANT TO CREATE A BUDGET COMPONENT AND PAGE IN THE CATEGORIES AND 
                    return <div key={budget.id}>
                        <p style={{color: this.state.categories[0].color}} >NAME: {budget.name}</p>
                        <p>Budget MAX: {budget.budget_max}</p>
                        <p>Budget Real: {budget.budget_real}</p>
                    </div>
                })}

                <NavLink
                    className="btn btn-primary"
                    activeClassName="active"
                    to="/"
                >Go Home</NavLink>



            </div>
        )
    }
}

export default BudgetsPage

