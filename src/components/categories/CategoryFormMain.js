//On this page I will have the form for a budget.
//This Component will be used when a user clicks the "create a budget" button
//It will pass in the title "Create" param to help the component know its creation and post
// it will pass "Update" when you select a budget to update and will pass the budget to be used for...
//...the budget patch and prepopulation of forms with the current budget values for edit.

import React, { Component } from 'react';
// import { NavLink } from "react-router-dom";
// import Auth from "../../auth/auth";
import Categories from '../../api/Categories';
import Budgets from '../../api/Budgets';
import {Redirect} from 'react-router-dom'
import Toasts from '../common/Toasts'
// import ConfirmationAlert from '../common/ConfirmationAlert'
import CategoryForm from './CategoryForm'

export class CategoryFormMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            category_name:"",
            category_color:"black",
            colors:["gray","red","orange","green","cyan","blue","magenta","purple"], //black is included as the default
            edit_mode:false,
            redirect:false,
            budgetList:[]

        }
        this.category_name_onChange = this.category_name_onChange.bind(this);
        this.category_color_onChange = this.category_color_onChange.bind(this);
        this.createOrEditCategory = this.createOrEditCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    async componentWillMount() {
        // let token = sessionStorage.getItem('token');
        // if (token != null) {
        //     Auth.isAuthenticated=true;
        // }
            let categoryToEdit ={}
            if(this.props.match.params.id){
                console.log("will edit")
                try{
                    categoryToEdit = await Categories.GetACategory(this.props.match.params.id)
                    let budgetinfo = await Budgets.getBudgets()
                    let budgetList=[]
                    for (let i = 0; i < budgetinfo.budgets.length; i++) {
                        
                            if (categoryToEdit.id === budgetinfo.budgets[i].category_id) {
                                budgetList.push(budgetinfo.budgets[i].name)
                            }
                        
                    }
                    this.setState({
                        category_name:categoryToEdit.name,
                        category_color:categoryToEdit.color,
                        edit_mode:true,
                        budgetList:budgetList
                    })
                } catch (e) {
                    console.log("e:", e)
                    Toasts.error("Could Not Edit Category")
                    this.setState({
                        loading: false,
                        redirect: true
                    });
                }
            }else{
                console.log("Will Create")
            }
        
    }

    async createOrEditCategory(category_name, category_color) {
        // console.log("category_name: ",category_name)
        // console.log("category_color: ", category_color)
        
        try {
            this.setState({
                loading: true
            });
            let response
            if(this.state.edit_mode){
                response = await Categories.EditACategory(this.props.match.params.id, category_name,category_color);
                // console.log("==response: ", response);
                Toasts.success("Successfully edited a category")
            }else{
                 await Categories.CreateACategory(category_name,category_color);
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
            category_color: e.target.value,
            select_error: false
        })   
    }

    onKeyPress(e){
        if(e.key === 'Enter'){
            document.getElementById("AddBtn").click();
        }
    }


    async deleteCategory() {
        try {
            this.setState({
                loading: true
            });
            // console.log(`DELETEING budget ${this.props.match.params.id} `)

             await Categories.DeleteACategory(this.props.match.params.id);

            Toasts.success("successfully deleted category")

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


    render() {

        let { category_name, category_color, budgetList, edit_mode, colors, select_error, loading } = this.state
        if(this.state.redirect ){
            return <Redirect 
            to="/budgets"
            />
        }else{
            return (
                <>
                {loading && <p>Loading...</p>}
                <CategoryForm 
                    budgetList={budgetList}
                    category_name={category_name}
                    category_color={category_color}
                    category_color_onChange={this.category_color_onChange}
                    edit_mode={edit_mode}
                    colors={colors}
                    select_error={select_error}
                    createOrEditCategory={this.createOrEditCategory}
                    deleteCategory={this.deleteCategory}
                />
            </>
            )

            // return (
            //     <div>
            //         <h1>CategoryForm</h1>
    
            //         {loading && <h2>Loading...</h2>}
            //             <div>
            //                 <label>Category name</label>
            //                 <input type="text" onKeyPress={this.onKeyPress} onChange={this.category_name_onChange} value={category_name} />
    
            //                 <label>Color</label>                       
            //                 <div className="tagSelectDiv">
            //                 <select name="select_tag" onChange={this.category_color_onChange} value={category_color}>
            //                     <option value="black">black</option>
            //                     {this.state.colors.map(color => {
            //                         return <option key={color} style={{color:color}}  value={color}>{color}</option>
            //                     })}
    
            //                 </select>
            //                 </div>
            //                 <button id="AddBtn" onClick={this.createOrEditCategory}>{this.state.edit_mode ? "Edit" : "Create"}</button>
                            
            //             <NavLink
            //             className="btn btn-primary"
            //             activeClassName="active"
            //             to="/budgets"
            //             >Back to budgets</NavLink>
            //             </div>
            //             {this.state.budgetList.length===0 &&  this.state.edit_mode && <ConfirmationAlert 
            //             buttonColor="secondary"
            //             buttonTitle="DELETE CATEGORY"
            //             dialogTitle="Are you sure you want to Delete this Category?"
            //             dialogMessage="This action can NOT be undone" 
            //             dialogCancelActionTitle="Cancel"
            //             dialogConfirmActionTitle="Delete"
            //             allowConfirm={true}
            //             confirmAction={this.deleteBudget} />}
            //             {this.state.budgetList.length!==0 &&  this.state.edit_mode && <ConfirmationAlert 
            //             buttonColor="secondary"
            //             buttonTitle="DELETE CATEGORY"
            //             dialogTitle="Are you sure you want to Delete this Category?"
            //             dialogMessage={<p>Cannot delete category while the following budgets are using it. {this.state.budgetList.map((budgetname)=>{return <b>{budgetname} </b>})}</p>}
            //             dialogCancelActionTitle="Cancel"
            //             dialogConfirmActionTitle="Delete"
            //             allowConfirm={false}
            //             confirmAction={this.deleteBudget} />}
                       
            //     </div>
            // )
        }
       
    }
}

export default CategoryFormMain

