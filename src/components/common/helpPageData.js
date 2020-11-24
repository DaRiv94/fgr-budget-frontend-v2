
let pages = [
    {
        header: "What is this page?",
        body: "This page is meant to be a reference on how some of the different pages and aspects of this budget app work."
    },
    {
        header: "Banks",
        body: `Banks are connected using Plaid. On the banks page, 
        you connect your bank account and can add the last 10 days of transactions for your bank account. 
        NOTE: when connecting your bank in this demo mode, Plaid provides a demo account user the following credentials,
        Username: user_pass  |  Password: pass_good .`
    },
    {
        header: "Account Summary",
        body: `The Account Summary page is to list your bank accounts and the monthly transactions that take place on given accounts.
        Note that transactions with a negative sign (-) are actully money that was added to your account these transactions are also green, 
        where as all other expenses are red and represent cash spent. account headers will also display your accounts current balence and the net gain/lose for an account, for the month.
        You may also filter by different months to see past months transactions. Note: for the demo mode, due data not persisting over long periods of time,
        you may find that only a few transactions are available for demo during the following month.`
    },
    {
        header: "Budgets",
        body: `The Budgets page is used to display your current budgets. 
        Your budgets display their current value based on what transactions are taged with the budgets category.
        You can also create categories, create budgets and edit budgets from this page.
        you can also go to the page "ADD CATEGORIES TO TRANSACTIONS" where you can assign categories to transactions.`
    },
    {
        header: "Categories",
        body: `Categories are used on budgets to help group transactions for desired budgets. 
        For Example, You might create a category "automotive" and 
        on the ADD CATEGORIES TO TRANSACTIONS page you would assign your automotive category to transactions related to automotive expenses.
        If you created a budget with the automotive category, your budgets net value would be the total net value of all the transactions taged with your automtive category.`
    },
    {
        header: "Email Notification Example",
        body: `The email notification page is an example of the type of email you might receive using the full featured version of this app.
        In the full featured version, plaid hits a webhook service which adds transactions to your account and when you login you would find them and be able to add categories to them.`
    }
]

export default pages;