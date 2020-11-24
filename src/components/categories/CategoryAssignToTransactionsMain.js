//On this page I will have the form for a budget.
//This Component will be used when a user clicks the "create a budget" button
//It will pass in the title "Create" param to help the component know its creation and post
// it will pass "Update" when you select a budget to update and will pass the budget to be used for...
//...the budget patch and prepopulation of forms with the current budget values for edit.

import React, { Component } from 'react';

// import Auth from "../../auth/auth";
import Categories from '../../api/Categories';
import { Redirect } from 'react-router-dom'
import Toasts from '../common/Toasts'
import Info from '../../api/Info';
import CategoryTransaction from '../../api/CategoryTransaction';

import CategoryAssignToTransactions from './CategoryAssignToTransactions'

export class CategoryAssignToTransactionsMain extends Component {
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
        this.RemoveCategoryfromTransaction =this.RemoveCategoryfromTransaction.bind(this);
        this.AddCategorytoTransaction = this.AddCategorytoTransaction.bind(this);
    }

    async componentWillMount() {
        // let token = sessionStorage.getItem('token');
        // if (token != null) {
        //     Auth.isAuthenticated = true;
        // }
            let transactions = {}
            let categorytransactions =[]
            try {
                transactions = await Info.getAllTransactions()
                console.log("transactions: ", transactions)
                categorytransactions = await CategoryTransaction.getAllCategoryTransaction()
                console.log("categorytransactions: ", categorytransactions)
                this.setState({
                    transactions:transactions.transactions,
                    categorytransactions:categorytransactions.categorytransactions
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
    

    onKeyPress(e) {
        if (e.key === 'Enter') {
            document.getElementById("AddBtn").click();
        }
    }

    async AddCategorytoTransaction(category_id, transaction_id){
        console.log(`Will asign category ${category_id} to transaction ${transaction_id}`)
        let newCategorytransactions = this.state.categorytransactions
        let duplicate = false
        for(let i=0;i<newCategorytransactions.length;i++){
            if(newCategorytransactions[i].category_id === category_id && newCategorytransactions[i].transaction_id === transaction_id){
                duplicate = true
            }
        }

        if(!duplicate){
            try {
                
                let categorytransaction = await CategoryTransaction.CreateACategoryTransaction(category_id,transaction_id)
                console.log("categorytransaction: ", categorytransaction)
                
                newCategorytransactions.push(categorytransaction.categorytransaction)
                this.setState({
                    categorytransactions:newCategorytransactions
                })
            } catch (e) {
                console.log("e:", e)
                Toasts.error(`probelm creating ccategroytransaction: e : ${e} `)
            }
        }else{
            Toasts.error(`Category Already Added `)
        }
    }

    async RemoveCategoryfromTransaction(category_id, transaction_id) {
        let newCategorytransactions = this.state.categorytransactions
        let found = false
        let index = null
        let categorytransaction_id_for_removal = null
        for(let i=0;i<newCategorytransactions.length;i++){
            if(newCategorytransactions[i].category_id === category_id && newCategorytransactions[i].transaction_id === transaction_id){
                found = true
                categorytransaction_id_for_removal = newCategorytransactions[i].id
                index = i
                break
            }
        }
        
        if(found){
            try{
                let removed_categorytransaction = await CategoryTransaction.DeleteACategoryTransaction(categorytransaction_id_for_removal) 

                if (index > -1) {
                    newCategorytransactions.splice(index, 1);
                }
                this.setState({
                    categorytransactions:newCategorytransactions
                })
            }catch (e) {
                console.log("e:", e)
                Toasts.error(`probelm removeing categroytransaction: e : ${e} `)
            }

            
        }else{
            Toasts.error(`That Category Transaction doesnt exist `)
        }

        
    }


    render() {

        let { transactions, categorytransactions, selected_category_id, categories, loading } = this.state
        if (this.state.redirect) {
            return <Redirect
                to="/budgets"
            />
        } else {
            return (
                <div>
                    {loading && <h2>Loading...</h2>}
                    <CategoryAssignToTransactions 
                    transactions={transactions} 
                    categories={categories} 
                    categorytransactions={categorytransactions}
                    selected_category_id={selected_category_id}
                    AddCategorytoTransaction={this.AddCategorytoTransaction}
                    RemoveCategoryfromTransaction={this.RemoveCategoryfromTransaction}/>

                    
                   
                </div>
            )
        }

    }
}

export default CategoryAssignToTransactionsMain

