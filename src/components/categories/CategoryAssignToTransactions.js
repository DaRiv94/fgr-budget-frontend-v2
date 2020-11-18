//On this page I will have the form for a budget.
//This Component will be used when a user clicks the "create a budget" button
//It will pass in the title "Create" param to help the component know its creation and post
// it will pass "Update" when you select a budget to update and will pass the budget to be used for...
//...the budget patch and prepopulation of forms with the current budget values for edit.

import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Auth from "../../auth/auth";
import Categories from '../../api/Categories';
import { Redirect } from 'react-router-dom'
import Toasts from '../common/Toasts'
import Info from '../../api/Info';
import TransactionForAssigning from './TransactionForAssigning'

export class CategoryAssignToTransactions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            transactions: [],
            user: {},
            categories: [],
            selected_category: "",
            redirect: false,
            categorytransactions:[],
            

        }
        this.category_name_onChange = this.category_name_onChange.bind(this);
        this.category_color_onChange = this.category_color_onChange.bind(this);
        this.createOrEditCategory = this.createOrEditCategory.bind(this);
        this.selected_category_id_onChange =this.selected_category_id_onChange.bind(this);
    }

    async componentWillMount() {
        let token = sessionStorage.getItem('token');
        if (token != null) {
            Auth.isAuthenticated = true;
            let transactions = {}
            try {
                transactions = await Info.getAllTransactions()
                console.log("transactions: ", transactions)
                this.setState({
                    transactions:transactions.transactions
                })
            } catch (e) {
                console.log("e:", e)
                Toasts.error("Could Not load Assign Categories to transactions page")
                this.setState({
                    loading: false,
                    redirect: true
                });
            }
            let user = await Info.getUserData()
            let categories = await Categories.getAllCategories()
            console.log("categories: ", categories.categories)
            this.setState({
                user: user,
                categories: categories.categories
            });
        }


    }

    async createOrEditCategory() {
        try {
            this.setState({
                loading: true
            });
            let response
            if (this.state.edit_mode) {
                response = await Categories.EditACategory(this.props.match.params.id, this.state.category_name, this.state.category_color);
                // console.log("==response: ", response);
                Toasts.success("Successfully edited a category")
            } else {
                response = await Categories.CreateACategory(this.state.category_name, this.state.category_color);
                // console.log("==response: ", response);
                Toasts.success("Successfully created a category")
            }
            this.setState({
                error: "",
                loading: false,
                redirect: true
            });
        } catch (e) {
            if (typeof (e.Error) == "string") {
                Toasts.error(e.Error)
            } else {
                Toasts.error(JSON.stringify(e))
            }
            this.setState({
                loading: false
            });
        }
    }

    category_name_onChange(e) {
        this.setState({
            category_name: e.target.value
        })
    }
    category_color_onChange(e) {
        this.setState({
            category_color: e.target.value
        })
    }
    selected_category_id_onChange(e) {
        console.log("event: ",e)
        console.log("event.target: ",e.target)
        this.setState({
            selected_category_id: e.target.value
        })
    }

    onKeyPress(e) {
        if (e.key === 'Enter') {
            document.getElementById("AddBtn").click();
        }
    }

    AddCategorytoTransaction(category_id, transaction_id){
        console.log(`Will asign category ${category_id} to transaction ${transaction_id}`)
        //I NEED TO CREATE AN API FOR CATEGORYTRANSACTIONS
        //i NEED TO CREATE THE ENDPOINTS ON THE BACKEND TO CREATE AND GET A LIST OF ALL
        //IN THIS METHOD I WILL CREATE A NEW A NEW CATEGORYTRANSACTION AND ADD IT TO categorytransactions SO IT WILL GET recgznied
        

    }


    render() {

        let { categorytransactions, selected_category_id, categories, loading } = this.state
        if (this.state.redirect) {
            return <Redirect
                to="/budgets"
            />
        } else {
            return (
                <div>
                    <h1>CategoryAssignToTransactions</h1>

                    {loading && <h2>Loading...</h2>}
                    <div>
                        <label>Assign Categories to Transactions</label>
                        {this.state.transactions.length == 0 && <p>No transactions here</p>}
                        {this.state.transactions.length !== 0 && this.state.transactions.map(transaction => {
                            let assigned_categories=[]
                            for(let i =0; i<categorytransactions.length;i++){
                                if(categorytransactions[i].transaction_id == transaction.id){
                                    for(let j=0; j<categories.length; j++){
                                        if(categories[j].id==categorytransactions[i].category_id){
                                            assigned_categories.push(categories[j])
                                            break
                                        }
                                    }
                                }
                            }
                            return <TransactionForAssigning key={transaction.id}
                             selected_category_id_onChange={this.selected_category_id_onChange} 
                             assigned_categories={assigned_categories} 
                             selected_category_id={selected_category_id} 
                             categories={categories} 
                             transaction={transaction} 
                             AddCategorytoTransaction={this.AddCategorytoTransaction}  />
                                
                        })}

                        <NavLink
                            className="btn btn-primary"
                            activeClassName="active"
                            to="/budgets"
                        >Back to budgets</NavLink>
                    </div>
                </div>
            )
        }

    }
}

export default CategoryAssignToTransactions

