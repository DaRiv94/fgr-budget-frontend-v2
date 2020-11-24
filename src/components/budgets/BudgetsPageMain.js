import React, { Component } from 'react';
// import { NavLink } from "react-router-dom";
// import Auth from "../../auth/auth";
// import { PlaidLink } from 'react-plaid-link';
// import './LinkReLinkPage.css'
// import Plaid from '../../api/Plaid';
import Info from '../../api/Info';
import BudgetPage from './BudgetsPage'

export class BudgetsPageMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            // password: "",
            // // authenticated: false
            // error: "",
            // errorA: [],
            // link_token: "",
            user: {},
            budgets: [],
            categories: [],
            budgetObjects: [],
            category_id_for_edit:"99999" //This will take this user to category/edit/9999 which will yield a redirect to this page


        }
        // this.onSuccess = this.onSuccess.bind(this);
        // this.getLinkToken = this.getLinkToken.bind(this);
        // this.logout=this.logout.bind(this);
    }

    async componentWillMount() {
        // let token = sessionStorage.getItem('token');
        // if (token != null) {
        //     Auth.isAuthenticated = true;
        // }

        let budgetinfo = await Info.getBudgets()

        

        let budgetObjects = []
        for (let i = 0; i < budgetinfo.budgets.length; i++) {
            for (let j = 0; j < budgetinfo.categories.length; j++) {
                if (budgetinfo.categories[j].id === budgetinfo.budgets[i].category_id) {
                    console.log(`budget ${budgetinfo.budgets[i].id} has category with id ${budgetinfo.categories[j].id} `)
                    let budget_object = { budget: budgetinfo.budgets[i], category: budgetinfo.categories[j] }
                    budgetObjects.push(budget_object)
                }
            }
        }
        console.log("budgetObjects: ", budgetObjects)

        this.setState({
            user: budgetinfo.user,
            budgets: budgetinfo.budgets,
            categories: budgetinfo.categories,
            budgetObjects: budgetObjects
        })
    }







    render() {
        let {budgetObjects, budgets, categories } = this.state
        return (
            <BudgetPage budgetObjects={budgetObjects} budgets={budgets} categories={categories} />
        );

        // return (
        //     <div>
        //         <h1>Budgets!</h1>

        //         {this.state.budgets.length == 0 ?
        //             <p>No budgets here</p> : this.state.budgetObjects.map((budgetObject) => {
        //                 //WILL WANT TO CREATE A BUDGET COMPONENT AND PAGE IN THE CATEGORIES AND 
        //                 return <div key={budgetObject.budget.id}>
        //                     <p style={{ color: budgetObject.category.color }} >NAME: {budgetObject.budget.name} ({budgetObject.category.name}) <NavLink
        //             className="btn btn-primary"
        //             activeClassName="active"
        //             to={"/budgets/edit/" + budgetObject.budget.id}
        //         >Edit</NavLink></p>
        //                     <p>Budget MAX: {budgetObject.budget.budget_max}</p>
        //                     <p>Budget Real: {budgetObject.budget.budget_real}</p>
        //                 </div>
        //             })}

        //         <NavLink
        //             className="btn btn-primary"
        //             activeClassName="active"
        //             to="/"
        //         >Go Home</NavLink>
        //         <NavLink
        //             className="btn btn-primary"
        //             activeClassName="active"
        //             to="/budgets/create"
        //         >New Budget</NavLink>
        //         <NavLink
        //             className="btn btn-primary"
        //             activeClassName="active"
        //             to="/category/create"
        //         >New Category</NavLink>

        //         <label>Edit Category</label>
        //         <div className="tagSelectDiv">
        //             <select name="select_tag" onChange={(event)=>{this.setState({category_id_for_edit: event.target.value})}} value={this.state.category_id_for_edit}>
        //         <option value="9999">None</option>
        //                 {this.state.categories.map(category => {
        //                     return <option key={category.id} style={{ color: category.color }} value={category.id}>{category.name}</option>
        //                 })}

        //             </select>
        //         </div>
        //         <NavLink
        //             className="btn btn-primary"
        //             activeClassName="active"
        //             to={"/category/edit/" + this.state.category_id_for_edit}
        //         >Edit Category</NavLink>
        //         <NavLink
        //             className="btn btn-primary"
        //             activeClassName="active"
        //             to="/category/assign-to-transaction"
        //         >Assign Categories to Transactions</NavLink>
                



        //     </div>
        // )
    }
}

export default BudgetsPageMain

