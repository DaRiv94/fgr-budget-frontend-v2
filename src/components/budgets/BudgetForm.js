//On this page I will have the form for a budget.
//This Component will be used when a user clicks the "create a budget" button
//It will pass in the title "Create" param to help the component know its creation and post
// it will pass "Update" when you select a budget to update and will pass the budget to be used for...
//...the budget patch and prepopulation of forms with the current budget values for edit.

import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Auth from "../../auth/auth";
import Info from '../../api/Info';
import Categories from '../../api/Categories';

export class BudgetForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            budget_name:"",
            budget_max:"",
            budget_real:"",
            budget_category_id:"",
            is_sandbox: false,
            user:{},
            categories:[],
            selected_category_id:""

        }
        this.budget_name_onChange = this.budget_name_onChange.bind(this);
        this.budget_max_onChange = this.budget_max_onChange.bind(this);
        this.budget_real_onChange = this.budget_real_onChange.bind(this);
        this.budget_category_id_onChange = this.budget_category_id_onChange.bind(this);
    }

    async componentWillMount() {
        let token = sessionStorage.getItem('token');
        if (token != null) {
            Auth.isAuthenticated=true;

            let user = await Info.getUserData()
            let categories = await Categories.getAllCategories()
            console.log("categories: ", categories.categories)
            this.setState({
                user: user,
                categories:categories.categories
            });

            

        }

        // console.log("process.env.REACT_APP_PROJECT_ENV: ", process.env.REACT_APP_PROJECT_ENV)
        if(process.env.REACT_APP_PROJECT_ENV == 'sandbox'){
            this.setState({
                is_sandbox: true
            });
        }
    }

    // async login() {

    //     try {
    //         this.setState({
    //             loading: true
    //         });

    //         let res= await Auth.login(this.state.email,this.state.password);
    //         console.log("res:", res);
    //         this.setState({
    //             error:"",
    //             loading: false,
    //             // authenticated:Auth.isAuthenticated
    //         });
    //     } catch (e) {
    //         console.log(e);
    //         if(typeof(e.Error)=="string"){
    //             this.setState({
    //                 error:e.Error,
    //                 loading: false
    //             });
    //         }else{
    //             this.setState({
    //                 error:JSON.stringify(e),
    //                 loading: false
    //             });
    //         }
            
    //     }

    // }

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
    budget_real_onChange(e) {
        this.setState({
            budget_real: e.target.value
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

        let { budget_name, budget_max, budget_real, budget_category_id,  loading } = this.state

        return (
            <div>
                <h1>BudgetForm</h1>

                {loading && <h2>Loading...</h2>}
                    <div>
                        <label>Budget name</label>
                        <input type="text" onKeyPress={this.onKeyPress} onChange={this.budget_name_onChange} value={budget_name} />
                        
                        <label>Budget max</label>
                        <input type="text" onKeyPress={this.onKeyPress} onChange={this.budget_max_onChange} value={budget_max} />
                        
                        <label>Budget real</label>
                        <input type="text" onKeyPress={this.onKeyPress} onChange={this.budget_real_onChange} value={budget_real} />
                        
                        <label>Category</label>                       
                        <div className="tagSelectDiv">
                        <select name="select_tag" onChange={this.budget_category_id_onChange} value={this.state.budget_category_id}>
                            <option value="">None</option>
                            {this.state.categories.map(category => {
                                return <option key={category.id} value={category.id}>{category.name}</option>
                            })}

                        </select>
                        <button onClick={this.addTag}>Add Tag</button>
                        </div>
                        <button id="AddBtn" onClick={this.login}>Login</button>
                        
                    <NavLink
                    className="btn btn-primary"
                    activeClassName="active"
                    to="/register"
                    >Register</NavLink>
                    <h2>Error: {this.state.error}</h2>
                    </div>
            </div>
        )
    }
}

export default BudgetForm

