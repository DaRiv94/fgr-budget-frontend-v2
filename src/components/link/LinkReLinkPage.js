import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Auth from "../../auth/auth";
import { PlaidLink } from 'react-plaid-link';
import './LinkReLinkPage.css'
import Plaid from '../../api/Plaid';

export class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            password: "",
            // authenticated: false
            error: "",
            errorA: [],
            link_token:"",
            user:{}

        }
        this.onSuccess = this.onSuccess.bind(this);
        // this.getLinkToken = this.getLinkToken.bind(this);
        // this.logout=this.logout.bind(this);
    }

    async componentWillMount() {
        let token = sessionStorage.getItem('token');
        if (token != null) {
            Auth.isAuthenticated = true;
        }

        //Make a call to get the user (Maybe change the auth check)
        // likely just add the auth user check again, and get user info,
        // use user info to get bank,
        // display banks. where clicking them would be another plaid link to update plaid
        // Will want to add some sort of notice for user if they need to update their Bank/Plaid_Item

        
        //Make request to backend to get status of accounts.
        //The backend, based on the user will query plaid on each account and see if they need to have their credentials updated
        // if something needs to be updated it will be reflected on this page.
        let link_token = await Plaid.linktokencreate()
        console.log("LINK_TOKEN: ",link_token)
        this.setState({
            link_token: link_token
        })
    }

    // getLinkToken = async () => {
    //     let link_token = await Plaid.linktokencreate()
    //     console.log("LINK_TOKEN: ",link_token)
    //     this.setState({
    //         link_token: link_token
    //     })
    //     //Make axios call to  backend and backend will get the plaid link token
    //     // return token
    // };
    onSuccess = async (token, metadata) => {
        // send token to server
        console.log("TOKEN: ", token)
        console.log("Metadata: ", metadata)
        let bank_data = await Plaid.connectbank(token)
        console.log("bank_data: ", bank_data)
        //make axios call to webhook service, That webhook service should take this public token, 
        //make the call to plaid, save the item_id and the access_token and then return a postive confirmation message
    };





    render() {

        // let { password,  loading } = this.state

        return (
            <div>
                <h1>LinkReLinkPage!</h1>


                <PlaidLink
                    style={{
                        padding: '10px 8px',
                        outline: 'none',
                        background: 'blue',
                        color: 'white'
                    }}
                    token={this.state.link_token}
                    onSuccess={this.onSuccess}
                >
                    Connect a bank account
                </PlaidLink>
                <NavLink
                    className="btn btn-primary"
                    activeClassName="active"
                    to="/"
                >Go Home</NavLink>


            </div>
        )
    }
}

export default HomePage

