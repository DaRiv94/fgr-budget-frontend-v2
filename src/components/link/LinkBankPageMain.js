import React, { Component } from 'react';
import Toasts from '../common/Toasts'
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";
import Auth from "../../auth/auth";
import { PlaidLink } from 'react-plaid-link';
import './LinkReLinkPage.css'
import Plaid from '../../api/Plaid';
import Info from '../../api/Info';
import Triggerwebhook from '../../api/Triggerwebhook';
import LinkBankPage from './LinkBankPage'

export class LinkBankPageMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            is_sandbox: false,
            link_token: "",
            banks: []

        }
        this.onSuccess = this.onSuccess.bind(this);
        this.manuallytriggerwebhook = this.manuallytriggerwebhook.bind(this);
        // this.getLinkToken = this.getLinkToken.bind(this);
        // this.logout=this.logout.bind(this);
    }

    async componentWillMount() {
        // let token = sessionStorage.getItem('token');
        // if (token != null) {
        //     Auth.isAuthenticated = true;
        // }

        //Make a call to get the user (Maybe change the auth check)
        // likely just add the auth user check again, and get user info,
        // use user info to get bank,
        // display banks. where clicking them would be another plaid link to update plaid
        // Will want to add some sort of notice for user if they need to update their Bank/Plaid_Item
        let banksinfo = await Info.getAllBanks()


        //Make request to backend to get status of accounts.
        //The backend, based on the user will query plaid on each account and see if they need to have their credentials updated
        // if something needs to be updated it will be reflected on this page.
        let link_token = await Plaid.linktokencreate()
        console.log("LINK_TOKEN: ", link_token)

        //Call linktokencreate() with bank access_token in order to  
        // see https://plaid.com/docs/api/tokens/#linktokencreate

        // console.log("banksinfo.banks: ",banksinfo.banks)
        this.setState({
            link_token: link_token,
            banks: banksinfo.banks
        })

        if (process.env.REACT_APP_PROJECT_ENV == 'sandbox') {
            this.setState({
                is_sandbox: true
            });
        }
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

    manuallytriggerwebhook = async (item_id) => {
        

        let response = await Triggerwebhook.triggerwebhook(item_id);
        console.log("Clicked manuallytriggerwebhook response:", response);
        Toasts.success(response.detail)

    }

    onSuccess = async (token, metadata) => {
        // send token to server
        console.log("TOKEN: ", token)
        console.log("Metadata: ", metadata)
        let bank_data = await Plaid.connectbank(token, metadata)
        console.log("bank_data: ", bank_data)
        Toasts.success("Bank Successfully connected!")

        //make axios call to webhook service, That webhook service should take this public token, 
        //make the call to plaid, save the item_id and the access_token and then return a postive confirmation message
    };





    render() {
        let {is_sandbox, banks, link_token, loading} = this.state
        return (<>
        {loading && <p>LOADING...</p>}
        <LinkBankPage is_sandbox={is_sandbox} onSuccess={this.onSuccess} 
        manuallytriggerwebhook={this.manuallytriggerwebhook} 
        link_token={link_token}
        banks={banks}/>
        </>);

        // return (
        //     <div>
        //         <h1>LinkBankPageMain!</h1>


                // <PlaidLink
                //     style={{
                //         padding: '10px 8px',
                //         outline: 'none',
                //         background: 'blue',
                //         color: 'white',
                //         maxWidth:"150px"
                //     }}
                //     token={this.state.link_token}
                //     onSuccess={this.onSuccess}
                // >
                //     Connect a bank account
                // </PlaidLink>
        //         <NavLink
        //             className="btn btn-primary"
        //             activeClassName="active"
        //             to="/"
        //         >Go Home</NavLink>
        //         {this.state.is_sandbox && <p>NOTE: In demo mode you can sign into banks with the credentials USERNAME: user_good and PASSWORD: pass_good  </p>}
        //         {this.state.banks.length === 0 && <p>NO Banks Are currently connected</p>}
        //         {this.state.banks.length !== 0 && this.state.banks.map((bank) => {
        //             return <div key={bank.id}>
        //                 <p  >{bank.institution_name}</p>
        //                 <button onClick={() => { this.manuallytriggerwebhook(bank.item_id) }}>Get past 10 day transactions</button>
        //             </div>
        //         })}
        //         {/* <ToastContainer
        //             newestOnTop={false}
        //             rtl={false}
        //             pauseOnFocusLoss
        //             draggable
        //         />
        //         <ToastContainer /> */}
        //     </div>
        // )
    }
}

export default LinkBankPageMain

