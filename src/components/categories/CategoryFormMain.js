import React, { Component } from 'react';
import Categories from '../../api/Categories';
import Budgets from '../../api/Budgets';
import { Redirect } from 'react-router-dom'
import Toasts from '../common/Toasts'
import CategoryForm from './CategoryForm'

export class CategoryFormMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            category_name: "",
            category_color: "black",
            colors: ["gray", "red", "orange", "green", "cyan", "blue", "magenta", "purple"],
            edit_mode: false,
            redirect: false,
            budgetList: []

        }
        this.category_name_onChange = this.category_name_onChange.bind(this);
        this.category_color_onChange = this.category_color_onChange.bind(this);
        this.createOrEditCategory = this.createOrEditCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    async componentWillMount() {

        let categoryToEdit = {}
        if (this.props.match.params.id) {
            // console.log("will edit")
            try {
                categoryToEdit = await Categories.GetACategory(this.props.match.params.id)
                let budgetinfo = await Budgets.getBudgets()
                let budgetList = []
                for (let i = 0; i < budgetinfo.budgets.length; i++) {

                    if (categoryToEdit.id === budgetinfo.budgets[i].category_id) {
                        budgetList.push(budgetinfo.budgets[i].name)
                    }

                }
                this.setState({
                    category_name: categoryToEdit.name,
                    category_color: categoryToEdit.color,
                    edit_mode: true,
                    budgetList: budgetList
                })
            } catch (e) {
                console.log("e:", e)
                Toasts.error("Could Not Edit Category")
                this.setState({
                    loading: false,
                    redirect: true
                });
            }
        } else {
            // console.log("Will Create")
        }

    }

    async createOrEditCategory(category_name, category_color) {

        try {
            this.setState({
                loading: true
            });

            if (this.state.edit_mode) {
                await Categories.EditACategory(this.props.match.params.id, category_name, category_color);
                // console.log("response: ", response);
                Toasts.success("Successfully edited a category")
            } else {
                await Categories.CreateACategory(category_name, category_color);
                // console.log("response: ", response);
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
            category_color: e.target.value,
            select_error: false
        })
    }

    onKeyPress(e) {
        if (e.key === 'Enter') {
            document.getElementById("AddBtn").click();
        }
    }


    async deleteCategory() {
        try {
            this.setState({
                loading: true
            });

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
        if (this.state.redirect) {
            return <Redirect
                to="/budgets"
            />
        } else {
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
        }
    }
}

export default CategoryFormMain

