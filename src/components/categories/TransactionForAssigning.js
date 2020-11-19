import React from 'react'
// import "./TransactionForAssigning.css";
import numeral from "numeral";


function TransactionForAssigning(props) {
    let {RemoveCategoryfromTransaction, assigned_categories, selected_category_id, categories, transaction, AddCategorytoTransaction} = props
    return (
        <div className="tagSelectDiv">
            <li key={transaction.name} ><strong>{numeral(transaction.amount).format('$0,0.00')}</strong> - {transaction.date} - {transaction.name}</li>
            
            {assigned_categories.length != 0 && assigned_categories.map((category)=>{
                return <button onClick={()=>{RemoveCategoryfromTransaction(category.id, transaction.id)}} 
                key={category.id}>{category.name}</button>})} 

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
