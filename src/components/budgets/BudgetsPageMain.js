import React, { Component } from 'react';
import Info from '../../api/Info';
import BudgetPage from './BudgetsPage'

export class BudgetsPageMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            budgets: [],
            categories: [],
            budgetObjects: [],
            category_id_for_edit: "99999" //This will take this user to category/edit/9999 which will yield a redirect to this page


        }
    }

    async componentWillMount() {

        let budgetinfo = await Info.getBudgets()
        let budgetObjects = []
        for (let i = 0; i < budgetinfo.budgets.length; i++) {
            for (let j = 0; j < budgetinfo.categories.length; j++) {
                if (budgetinfo.categories[j].id === budgetinfo.budgets[i].category_id) {
                    // console.log(`budget ${budgetinfo.budgets[i].id} has category with id ${budgetinfo.categories[j].id} `)
                    let budget_object = { budget: budgetinfo.budgets[i], category: budgetinfo.categories[j] }
                    budgetObjects.push(budget_object)
                }
            }
        }
        // console.log("budgetObjects: ", budgetObjects)

        this.setState({
            user: budgetinfo.user,
            budgets: budgetinfo.budgets,
            categories: budgetinfo.categories,
            budgetObjects: budgetObjects
        })
    }

    render() {
        let { budgetObjects, budgets, categories } = this.state
        return (
            <BudgetPage budgetObjects={budgetObjects} budgets={budgets} categories={categories} />
        );
    }
}

export default BudgetsPageMain

