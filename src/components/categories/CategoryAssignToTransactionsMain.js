import React, { Component } from 'react';
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
        this.RemoveCategoryfromTransaction =this.RemoveCategoryfromTransaction.bind(this);
        this.AddCategorytoTransaction = this.AddCategorytoTransaction.bind(this);
    }

    async componentWillMount() {

            let transactions = {}
            let categorytransactions =[]
            try {
                transactions = await Info.getAllTransactions()
                // console.log("transactions: ", transactions)
                categorytransactions = await CategoryTransaction.getAllCategoryTransaction()
                // console.log("categorytransactions: ", categorytransactions)
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
            // console.log("categories: ", categories.categories)
            this.setState({
                user: user,
                categories: categories.categories
            });
        


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
        // console.log(`Will asign category ${category_id} to transaction ${transaction_id}`)
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
                // console.log("categorytransaction: ", categorytransaction)
                
                newCategorytransactions.push(categorytransaction.categorytransaction)
                this.setState({
                    categorytransactions:newCategorytransactions
                })
            } catch (e) {
                console.log("e:",e)
                if(e && e.Error && e.Error.response && e.Error.response && e.Error.response.data && e.Error.response.data.detail){
                    Toasts.error(e.Error.response.data.detail)
                }else if(typeof (e.Error) == "string"){
                    Toasts.error(e.Error)
                }else{
                    Toasts.error(JSON.stringify(e))
                }
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
                 await CategoryTransaction.DeleteACategoryTransaction(categorytransaction_id_for_removal) 

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

