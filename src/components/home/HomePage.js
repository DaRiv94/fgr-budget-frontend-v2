import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Auth from "../../auth/auth";
import Info from '../../api/Info';
import Toasts from '../common/Toasts'
import PreLoginHomePage from './PreLoginHomePage'
import PostLoginHomePage from './PostLoginHomePage'

export class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
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
            console.log("user: ", user)
            this.setState({
                user: user.user
            });
        }
    }

    async login(email, password) {

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
            Toasts.success("Logged In!", 1.5)
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
        Toasts.success("Logged Out!", 1.5)
    }


    render() {

        let { loading } = this.state

        return (
            <div>
                
                {loading && <h2>Loading...</h2>}

                {Auth.isAuthenticated ?
                //Pass in logout, not_sandbox
                    <PostLoginHomePage logout={this.logout} user={this.state.user} />
                    // <div>
                    //     <h1>Home</h1>
                    //     <h2>{this.state.user.email}</h2>
                    //     <NavLink
                    //         className="btn btn-primary"
                    //         activeClassName="active"
                    //         to="/summary"
                    //     >Summary</NavLink>

                    //     <button onClick={this.logout}>logout</button>
                    //     <NavLink
                    //         className="btn btn-primary"
                    //         activeClassName="active"
                    //         to="/linkrelink"
                    //     >linkrelink</NavLink>
                    //     <NavLink
                    //         className="btn btn-primary"
                    //         activeClassName="active"
                    //         to="/budgets"
                    //     >budgets</NavLink>
                    // </div>
                    :
                    <PreLoginHomePage login={this.login} loading={loading} />
                }

            </div>
        )
    }
}

export default HomePage

