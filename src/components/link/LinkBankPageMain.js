import React, { Component } from 'react';
import Toasts from '../common/Toasts'
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
    }

    async componentWillMount() {

        let banksinfo = await Info.getAllBanks()
        // console.log("banksinfo.banks: ",banksinfo.banks)

        let link_token = await Plaid.linktokencreate()
        // console.log("LINK_TOKEN: ", link_token)

        this.setState({
            link_token: link_token,
            banks: banksinfo.banks
        })

        if (process.env.REACT_APP_PROJECT_ENV === 'sandbox') {
            this.setState({
                is_sandbox: true
            });
        }
    }

    manuallytriggerwebhook = async (item_id) => {
        let response = await Triggerwebhook.triggerwebhook(item_id);
        // console.log("Clicked manuallytriggerwebhook response:", response);
        Toasts.success(response.detail)
    }

    onSuccess = async (token, metadata) => {
        // send token to server
        // console.log("TOKEN: ", token)
        // console.log("Metadata: ", metadata)
        let bank_data = await Plaid.connectbank(token, metadata)
        // console.log("bank_data: ", bank_data)
        Toasts.success("Bank Successfully connected!")
    };


    render() {
        let { is_sandbox, banks, link_token, loading } = this.state
        return (<>
            {loading && <p>LOADING...</p>}
            <LinkBankPage is_sandbox={is_sandbox} onSuccess={this.onSuccess}
                manuallytriggerwebhook={this.manuallytriggerwebhook}
                link_token={link_token}
                banks={banks} />
        </>);
    }
}

export default LinkBankPageMain

