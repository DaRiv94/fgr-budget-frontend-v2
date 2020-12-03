
let pages = [
    {
                header: "What is this page?",
                body: "This page is a reference on how the pages in this budget app work."
            },
            {
                header: "Banks",
                body: `Banks are connected using Plaid. On the banks page, you can connect your bank account. After connecting to your bank, you can click the "Get Transactions" button to get the last 90 days of transactions. NOTE: When the FGR Budget App is in demo mode, you can connect to sandbox bank accounts with the following credentials, Username: user_pass  |  Password: pass_good .`
            },
            {
                header: "Account Summary",
                body: `The Account Summary page is to list your bank accounts and the monthly transactions that are associated with those accounts. Note that transactions with a negative sign (-) are actually money that was earned and has been added to your account. These transactions are also green. All other expenses are red and represent cash spent. Account headers will display the account's current balance and the net gain/loss for that account, for the month. You may filter by different months to see past transactions on a monthly basis. NOTE: When the FGR Budget App is in demo mode, data does not persist greatly over time. After you click "Get Transactions" for your bank on the Banks page, you may only find a handful of sandbox transactions available for display over the past few months.`
            },
            {
                header: "Budgets",
                body: `The Budgets page is used to display your current budgets. Each Budget has a category that the budget will be based on. Create and edit categories from this page. Create and Edit Budgets from this page. Go to the page "ADD CATEGORIES TO TRANSACTIONS" where you can categorize transactions`
            },
            {
                header: "Add Categories To Transactions",
                body: `This page lists your transactions so they can be categorized by "tagging" a transaction with one or more category. Budgets that use a category will reflect the aggregated value of each transaction that is "tagged" with the specific category.`
            },
            {
                header: "Email Notification Example",
                body: `The email notification page is an example of the type of email you might receive using the full featured version of the FGR Budget App. In the full featured version, When new transactions are found and added to your accounts, the Plaid API informs the FGR Budget App. The FGR Budget App then sends an email notification similar to this page to notify you about new transactions. You would then be able to find the new transactions in your account, and be able to add categories to them.`
            }
]

export default pages;