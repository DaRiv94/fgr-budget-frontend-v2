import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Auth from "../../auth/auth";
import { PlaidLink } from 'react-plaid-link';
import './LinkReLinkPage.css'

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
        this.onSuccess = this.onSuccess.bind(this);
        this.getLinkToken = this.getLinkToken.bind(this);
        // this.logout=this.logout.bind(this);
    }

    componentWillMount() {
        let token = sessionStorage.getItem('token');
        if (token != null) {
            Auth.isAuthenticated=true;
        }
        //Make request to backend to get status of accounts.
        //The backend, based on the user will query plaid on each account and see if they need to have their credentials updated
        // if something needs to be updated it will be reflected on this page.
    }

    getLinkToken = () => {
        //Make axios call to get token to plaid
        // return token
      };
     onSuccess = (token, metadata) => {
        // send token to server
        console.log("TOKEN: ", token)
        console.log("Metadata: ", metadata)

        //make axios call to webhook service, That webhook service should take this public token, 
        //make the call to plaid, save the item_id and the access_token and then return a postive confirmation message
      };





    render() {

        // let { password,  loading } = this.state

        return (
            <div>
                <h1>LinkReLinkPage!</h1>


                <PlaidLink
                // style={background-color: orange;}
      token={this.getLinkToken}
      onSuccess={this.onSuccess}
      >
      Connect a bank account
    </PlaidLink>


            </div>
        )
    }
}

export default HomePage

