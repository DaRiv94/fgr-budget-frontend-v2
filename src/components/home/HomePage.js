import React, { Component } from 'react';
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
            had_notification: false,
            api_url: ""

        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.backendHealthCheck = this.backendHealthCheck.bind(this);
        this.backendHealthOnChange = this.backendHealthOnChange.bind(this);
    }

    async componentWillMount() {

        // console.log("process.env.REACT_APP_FGR_BUDGET_BACKEND_URL: ", process.env.REACT_APP_FGR_BUDGET_BACKEND_URL)
        // console.log("process.env.REACT_APP_PROJECT_ENV: ", process.env.REACT_APP_PROJECT_ENV)
        // console.log("process.env.REACT_APP_FGR_CHECK_BACKEND_HEALTH: ", process.env.REACT_APP_FGR_CHECK_BACKEND_HEALTH)

        let token = sessionStorage.getItem('token');
        if (token != null) {

            Auth.isAuthenticated = true

            let user = await Info.getUserData()
            // console.log("user: ", user)
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
            // console.log("res:", res);
            this.setState({
                loading: false,
            });
            Toasts.success("Logged In!", 1.5)
            Toasts.info("Auth Token will expire in one hour", 5)
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

    backendHealthOnChange(e) {
        this.setState({ api_url: e.target.value })
    }

    async backendHealthCheck() {
        console.log("Checking backend health")
        console.log("api_url:", this.state.api_url)
        try {
            let response = await Info.getbackendhealth(this.state.api_url)
            Toasts.success(response.data)
            console.log("success")
        } catch (e) {
            console.log("error: ", e)
            Toasts.error(e)
        }

    }




    render() {

        let { loading } = this.state

        return (
            <div>

                {loading && <h2>Loading...</h2>}

                {Auth.isAuthenticated ?
                    <PostLoginHomePage logout={this.logout} user={this.state.user} />
                    :
                    <><PreLoginHomePage login={this.login}
                        loading={loading}
                        backendHealthOnChange={this.backendHealthOnChange}
                        backendHealthCheck={this.backendHealthCheck} />
                    </>
                }
            </div>
        )
    }
}

export default HomePage

