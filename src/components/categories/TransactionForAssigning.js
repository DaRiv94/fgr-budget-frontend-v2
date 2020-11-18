import React from 'react'
// import "./TransactionForAssigning.css";
import numeral from "numeral";


function TransactionForAssigning(props) {
    let {selected_category_id_onChange, assigned_categories, selected_category_id, categories, transaction, AddCategorytoTransaction} = props
    console.log("transaction: ", transaction)
    return (
        <div className="tagSelectDiv">
            <li key={transaction.name} ><strong>{numeral(transaction.amount).format('$0,0.00')}</strong> - {transaction.date} - {transaction.name}</li>
            {assigned_categories.length != 0 && assigned_categories.map((category)=>{return <p>{category.name}</p>})} 
                {/* <select name="select_tag" onChange={selected_category_id_onChange} value={selected_category_id}> */}
                {/* <select name="select_tag" onChange={(e)=>{selected_category_id_onChange(e);AddCategorytoTransaction(selected_category_id, transaction.id)}} value={selected_category_id}> */}
                <select name="select_tag" onChange={(e)=>{AddCategorytoTransaction(e.target.value, transaction.id)}} value={selected_category_id}>
                    <option value="">None</option>
                    {categories.map(category => {
                        return <option key={category.id} style={{ color: category.color }} value={category.id}>{category.name}</option>
                    })}
                </select>
            </div>
        
    )
}

export default TransactionForAssigning
