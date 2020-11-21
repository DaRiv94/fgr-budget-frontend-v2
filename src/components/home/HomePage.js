import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Auth from "../../auth/auth";
import Info from '../../api/Info';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Toasts from '../common/Toasts'
import PreLoginHomePage from './PreLoginHomePage'

export class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            is_sandbox: false,
            user: {},
            had_notification: false

        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    async componentWillMount() {
        let token = sessionStorage.getItem('token');
        if (token != null) {
            Auth.isAuthenticated = true;

            let user = await Info.getUserData()
            this.setState({
                user: user
            });
        }

        if (process.env.REACT_APP_PROJECT_ENV == 'sandbox') {
            this.setState({
                is_sandbox: true
            });
        }
    }

    async login(email, password) {

        console.log("submitted via login email: ", email)
        console.log("submitted via login password: ", password)
        try {
            this.setState({
                loading: true
            });

            let res = await Auth.login(email, password);
            console.log("res:", res);
            this.setState({
                loading: false,
                // authenticated:Auth.isAuthenticated
            });
        } catch (e) {
            if (typeof (e.Error) == "string") {
                console.log("typeof(e.Error)=='string'")
                Toasts.error(e.Error)
                this.setState({
                    loading: false
                });
            } else {
                if (e.Error.detail) {
                    Toasts.error(e.Error.detail)
                } else {
                    Toasts.error(JSON.stringify(e))
                }

                this.setState({
                    loading: false
                });
            }
        }

    }

    logout() {
        Auth.logout();
        //force update with similated state update
        this.forceUpdate();
    }

    onKeyPress(e) {
        if (e.key === 'Enter') {
            document.getElementById("AddBtn").click();
        }
    }


    render() {

        let { loading } = this.state

        return (
            <div>
                
                {loading && <h2>Loading...</h2>}

                {Auth.isAuthenticated ?
                    <div>
                        <h1>PostHomepage</h1>
                        <NavLink
                            className="btn btn-primary"
                            activeClassName="active"
                            to="/Summary"
                        >Summary</NavLink>

                        <button onClick={this.logout}>logout</button>
                        <NavLink
                            className="btn btn-primary"
                            activeClassName="active"
                            to="/linkrelink"
                        >linkrelink</NavLink>
                        <NavLink
                            className="btn btn-primary"
                            activeClassName="active"
                            to="/budgets"
                        >budgets</NavLink>
                    </div>
                    :
                    <PreLoginHomePage login={this.login} loading={loading} />
                }

                {Auth.isAuthenticated && this.state.is_sandbox &&
                    <div>

                        <NavLink
                            className="btn btn-primary"
                            activeClassName="active"
                            to="/newtransactionemailtemplateexample"
                        >See Example of New Transactions Email</NavLink>

                    </div>}

            </div>
        )
    }
}

export default HomePage

