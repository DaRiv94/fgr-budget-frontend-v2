//On this page I will have the form for a budget.
//This Component will be used when a user clicks the "create a budget" button
//It will pass in the title "Create" param to help the component know its creation and post
// it will pass "Update" when you select a budget to update and will pass the budget to be used for...
//...the budget patch and prepopulation of forms with the current budget values for edit.

import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Auth from "../../auth/auth";
import Info from '../../api/Info';
import Budgets from '../../api/Budgets';
import Categories from '../../api/Categories';
import Toasts from '../common/Toasts'

export class BudgetForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            budget_name:"",
            budget_max:"",
            budget_category_id:"",
            user:{},
            categories:[],
            selected_category_id:"",
            edit_mode:false

        }
        this.budget_name_onChange = this.budget_name_onChange.bind(this);
        this.budget_max_onChange = this.budget_max_onChange.bind(this);
        this.budget_category_id_onChange = this.budget_category_id_onChange.bind(this);
        this.createOrEditBudget = this.createOrEditBudget.bind(this)
    }

    async componentWillMount() {
        let token = sessionStorage.getItem('token');
        if (token != null) {
            Auth.isAuthenticated=true;

            let BudgetToEdit ={}
            if(this.props.match.params.id){
                console.log("will edit")
                try{
                    BudgetToEdit = await Budgets.GetABudget(this.props.match.params.id)
                    console.log("BudgetToEdit:", BudgetToEdit)
                    console.log("BudgetToEdit.name:", BudgetToEdit.budget.name)
                    console.log("BudgetToEdit.budget_max:", BudgetToEdit.budget.budget_max)
                    console.log("BudgetToEdit.category_id:", BudgetToEdit.budget.category_id)
                    this.setState({
                        budget_name:BudgetToEdit.budget.name,
                        budget_max:BudgetToEdit.budget.budget_max,
                        budget_category_id:BudgetToEdit.budget.category_id,
                        edit_mode:true
                    })
                } catch (e) {
                    console.log("e:", e)
                    Toasts.error("Could Not Edit Budget")
                    this.setState({
                        loading: false,
                        redirect: true
                    });
                }
            }else{
                console.log("Will Create")
            }

            let user = await Info.getUserData()
            let categories = await Categories.getAllCategories()
            console.log("categories: ", categories.categories)
            this.setState({
                user: user,
                categories:categories.categories
            });

        }
    }

    async createOrEditBudget() {
        try {
            this.setState({
                loading: true
            });
            let response
            if(this.state.edit_mode){
                response = await Budgets.EditABudget(this.props.match.params.id, 
                    this.state.budget_name,this.state.budget_max,this.state.budget_category_id);
                // console.log("==response: ", response);
                Toasts.success("Successfully edited budget")
            }else{
                response = await Budgets.CreateABudget(this.state.budget_name,this.state.budget_max,this.state.budget_category_id);
                // console.log("==response: ", response);
                Toasts.success("Successfully created a budget")
            }
            this.setState({
                error:"",
                loading: false,
                redirect:true
            });
        } catch (e) {
            if(typeof(e.Error)=="string"){
                Toasts.error(e.Error)
            }else{
                Toasts.error(JSON.stringify(e))
            }
            this.setState({
                loading: false
            });
        }
    }


    budget_name_onChange(e) {
        this.setState({
            budget_name: e.target.value
        })
    }
    budget_max_onChange(e) {
        this.setState({
            budget_max: e.target.value
        })
    }
    budget_category_id_onChange(e) {
        this.setState({
            budget_category_id: e.target.value
        })   
    }

    onKeyPress(e){
        if(e.key === 'Enter'){
            document.getElementById("AddBtn").click();
        }
    }


    render() {

        let { budget_name, budget_max, budget_category_id,  loading } = this.state

        return (
            <div>
                <h1>BudgetForm</h1>

                {loading && <h2>Loading...</h2>}
                    <div>
                        <label>Budget name</label>
                        <input type="text" onKeyPress={this.onKeyPress} onChange={this.budget_name_onChange} value={budget_name} />
                        
                        <label>Budget max</label>
                        <input type="text" onKeyPress={this.onKeyPress} onChange={this.budget_max_onChange} value={budget_max} />
                        
                        <label>Category</label>                       
                        <div className="tagSelectDiv">
                        <select name="select_tag" onChange={this.budget_category_id_onChange} value={budget_category_id}>
                            <option value="">None</option>
                            {this.state.categories.map(category => {
                                return <option key={category.id} style={{ color: category.color }} value={category.id}>{category.name}</option>
                            })}

                        </select>
                        </div>
                        <button id="AddBtn" onClick={this.createOrEditBudget}>{this.state.edit_mode ? "Edit" : "Create"}</button>
                        
                    <NavLink
                    className="btn btn-primary"
                    activeClassName="active"
                    to="/budgets"
                    >Back To Budgets</NavLink>
                    </div>
            </div>
        )
    }
}

export default BudgetForm

