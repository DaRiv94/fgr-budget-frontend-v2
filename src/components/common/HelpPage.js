import React, { Component } from 'react'

import { NavLink } from 'react-router-dom';




export class HelpPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
          
        }
   
    }




    render() {
 
        return (
            <div >
              <h1>HELP PAGE</h1>
              <NavLink
                    className="btn btn-primary"
                    to="/"
                >Go Home</NavLink>
            </div>
        )
    }
}

export default HelpPage
