import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Auth from "../../auth/auth";

export class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            password: "",
            // authenticated: false
            error:"",
            errorA:[]

        }
        // this.login = this.login.bind(this);
        // this.onChange = this.onChange.bind(this);
        // this.logout=this.logout.bind(this);
    }

    componentWillMount() {
        let token = sessionStorage.getItem('token');
        if (token != null) {
            Auth.isAuthenticated=true;
        }
    }






    render() {

        // let { password,  loading } = this.state

        return (
            <div>
                <h1>LinkReLinkPage!</h1>


                


            </div>
        )
    }
}

export default HomePage

