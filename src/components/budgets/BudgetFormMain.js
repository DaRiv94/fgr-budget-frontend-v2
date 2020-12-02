import React, { Component } from 'react';
import Info from '../../api/Info';
import Budgets from '../../api/Budgets';
import Categories from '../../api/Categories';
import Toasts from '../common/Toasts'
import { Redirect } from 'react-router-dom'
import BudgetForm from './BudgetForm'

export class BudgetFormMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            budget_name: "",
            budget_max: "",
            budget_category_id: "",
            user: {},
            categories: [],
            edit_mode: false,
            redirect: false,
            select_error: false

        }
        this.budget_name_onChange = this.budget_name_onChange.bind(this);
        this.budget_max_onChange = this.budget_max_onChange.bind(this);
        this.budget_category_id_onChange = this.budget_category_id_onChange.bind(this);
        this.createOrEditBudget = this.createOrEditBudget.bind(this)
        this.deleteBudget = this.deleteBudget.bind(this)
    }

    async componentWillMount() {

        let BudgetToEdit = {}
        if (this.props.match.params.id) {
            // console.log("will edit")
            try {
                BudgetToEdit = await Budgets.GetABudget(this.props.match.params.id)

                this.setState({
                    budget_name: BudgetToEdit.budget.name,
                    budget_max: BudgetToEdit.budget.budget_max,
                    budget_category_id: BudgetToEdit.budget.category_id,
                    edit_mode: true
                })
            } catch (e) {
                console.log("e:", e)
                Toasts.error("Could Not Edit Budget")
                this.setState({
                    loading: false,
                    redirect: true
                });
            }
        } else {
            // console.log("Will Create")
        }

        let user = await Info.getUserData()
        let categories = await Categories.getAllCategories()
        // console.log("categories: ", categories.categories)
        this.setState({
            user: user,
            categories: categories.categories
        });


    }

    async createOrEditBudget(budget_name, budget_max, budget_category_id) {

        if (!budget_category_id) {
            this.setState({
                select_error: true
            });
            Toasts.error("Category is required")
        } else {
            try {
                this.setState({
                    loading: true,
                    select_error: false
                });
                // let response
                if (this.state.edit_mode) {
                    await Budgets.EditABudget(this.props.match.params.id,
                        budget_name, budget_max, budget_category_id);
                    // console.log("response: ", response);
                    Toasts.success("Successfully edited budget")
                } else {
                    await Budgets.CreateABudget(budget_name, budget_max, budget_category_id);
                    // console.log("response: ", response);
                    Toasts.success("Successfully created a budget")
                }
                this.setState({
                    error: "",
                    loading: false,
                    redirect: true
                });
            } catch (e) {
                console.log("e:",e)
                if(e && e.Error && e.Error.response && e.Error.response && e.Error.response.data && e.Error.response.data.detail){
                    Toasts.error(e.Error.response.data.detail)
                }else if(typeof (e.Error) == "string"){
                    Toasts.error(e.Error)
                }else{
                    Toasts.error(JSON.stringify(e))
                }

                this.setState({
                    loading: false
                });
            }
        }


    }

    async deleteBudget() {
        try {
            this.setState({
                loading: true
            });

            await Budgets.DeleteABudget(this.props.match.params.id);

            Toasts.success("successfully deleted budget")

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
            budget_category_id: e.target.value,
            select_error: false
        })
    }

    onKeyPress(e) {
        if (e.key === 'Enter') {
            document.getElementById("AddBtn").click();
        }
    }


    render() {

        let { budget_name, budget_max, budget_category_id, loading, edit_mode, categories, select_error } = this.state
        if (this.state.redirect) {
            return <Redirect
                to="/budgets"
            />
        } else {
            return (<>
                {loading && <p>Loading...</p>}
                <BudgetForm budget_name={budget_name}
                    budget_max={budget_max}
                    budget_category_id={budget_category_id}
                    budget_category_id_onChange={this.budget_category_id_onChange}
                    edit_mode={edit_mode}
                    categories={categories}
                    select_error={select_error}
                    createOrEditBudget={this.createOrEditBudget}
                    deleteBudget={this.deleteBudget}
                />
            </>

            )
        }
    }
}

export default BudgetFormMain

