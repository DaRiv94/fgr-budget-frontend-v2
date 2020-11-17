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
            categories:[],
            budgetObjects:[]


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

        let budgetObjects = []
        for(let i=0;i< budgetinfo.budgets.length; i++){
            for(let j=0;j< budgetinfo.categories.length; j++){
                if(budgetinfo.categories[j].id == budgetinfo.budgets[i].category_id ){
                    console.log(`budget ${budgetinfo.budgets[i].id} has category with id ${budgetinfo.categories[j].id} `)
                    let budget_object = {budget:budgetinfo.budgets[i], category: budgetinfo.categories[j]}
                    budgetObjects.push(budget_object)
                }
            }
        }
        // console.log("budgetObjects: ", budgetObjects)

        this.setState({
            user:budgetinfo.user,
            budgets: budgetinfo.budgets,
            categories: budgetinfo.categories,
            budgetObjects:budgetObjects
        })
    }







    render() {

        return (
            <div>
                <h1>Budgets!</h1>

                {this.state.budgets.length == 0 ?
                <p>No budgets here</p>: this.state.budgetObjects.map((budgetObject)=>{
                    //WILL WANT TO CREATE A BUDGET COMPONENT AND PAGE IN THE CATEGORIES AND 
                    return <div key={budgetObject.budget.id}>
                        <p style={{color: budgetObject.category.color}} >NAME: {budgetObject.budget.name} ({budgetObject.category.name})</p>
                        <p>Budget MAX: {budgetObject.budget.budget_max}</p>
                        <p>Budget Real: {budgetObject.budget.budget_real}</p>
                    </div>
                })}

                <NavLink
                    className="btn btn-primary"
                    activeClassName="active"
                    to="/"
                >Go Home</NavLink>
                <NavLink
                    className="btn btn-primary"
                    activeClassName="active"
                    to="/category/create"
                >New Category</NavLink>



            </div>
        )
    }
}

export default BudgetsPage

