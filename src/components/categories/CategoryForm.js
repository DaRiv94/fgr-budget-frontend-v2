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
import {Redirect} from 'react-router-dom'
import Toasts from '../common/Toasts'

export class CategoryForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            category_name:"",
            category_color:"black",
            is_sandbox: false,
            user:{},
            colors:["blue","purple"],
            edit_mode:false,
            redirect:false

        }
        this.category_name_onChange = this.category_name_onChange.bind(this);
        this.category_color_onChange = this.category_color_onChange.bind(this);
        this.createOrEditCategory = this.createOrEditCategory.bind(this);
    }

    async componentWillMount() {
        let token = sessionStorage.getItem('token');
        if (token != null) {
            Auth.isAuthenticated=true;

            if(this.props.match.params.id){
                console.log("will edit")

                let categoryToEdit = await Categories.GetACategory(this.props.match.params.id)

                this.setState({
                    category_name:categoryToEdit.name,
                    category_color:categoryToEdit.color,
                    edit_mode:true
                })

            }else{
                console.log("Will Create")
            }

            let user = await Info.getUserData()
            this.setState({
                user: user
            });
        }

        // console.log("process.env.REACT_APP_PROJECT_ENV: ", process.env.REACT_APP_PROJECT_ENV)
        if(process.env.REACT_APP_PROJECT_ENV == 'sandbox'){
            this.setState({
                is_sandbox: true
            });
        }
    }

    async createOrEditCategory() {
        try {
            this.setState({
                loading: true
            });
            let response
            if(this.state.edit_mode){
                response = await Categories.EditACategory(this.props.match.params.id, this.state.category_name,this.state.category_color);
                // console.log("==response: ", response);
                Toasts.success("Successfully edited a category")
            }else{
                response = await Categories.CreateACategory(this.state.category_name,this.state.category_color);
                // console.log("==response: ", response);
                Toasts.success("Successfully created a category")
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

    onKeyPress(e){
        if(e.key === 'Enter'){
            document.getElementById("AddBtn").click();
        }
    }


    render() {

        let { category_name, category_color,  loading } = this.state
        if(this.state.redirect ){
            return <Redirect 
            to="/budgets"
            />
        }else{
            return (
                <div>
                    <h1>CategoryForm</h1>
    
                    {loading && <h2>Loading...</h2>}
                        <div>
                            <label>Category name</label>
                            <input type="text" onKeyPress={this.onKeyPress} onChange={this.category_name_onChange} value={category_name} />
    
                            <label>Color</label>                       
                            <div className="tagSelectDiv">
                            <select name="select_tag" onChange={this.category_color_onChange} value={category_color}>
                                <option value="black">black</option>
                                {this.state.colors.map(color => {
                                    return <option key={color} style={{color:color}}  value={color}>{color}</option>
                                })}
    
                            </select>
                            </div>
                            <button id="AddBtn" onClick={this.createOrEditCategory}>{this.state.edit_mode ? "Edit" : "Create"}</button>
                            
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

export default CategoryForm

