import React from 'react'

function Dropdown(props) {
    return (
        <div>
            <select onChange={props.getSummary} >
                {props.options.map(option=>{
                    return <option key={option} value={option}>{option}</option>
                })}
            </select>
        </div>
    )
}

export default Dropdown
