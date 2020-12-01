import React, { Component } from 'react';
import Toasts from '../common/Toasts'
import { Redirect } from 'react-router-dom'
import Register from '../../api/Register';
import RegisterPage from "./RegisterPage";

export class RegisterPageMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            registeredUser: false,
        }
        this.register = this.register.bind(this);
    }

    async register(email, password, password2) {
        try {
            this.setState({
                loading: true
            });

            //should return response.newUser 
            await Register.register(email, password, password2);

            Toasts.success("Successfully Registered User!")

            this.setState({
                loading: false,
                registeredUser: true
            });

        } catch (e) {
            console.log("e: ", e)
            if (typeof (e.Error) == "string") {
                Toasts.error(e.Error)

                this.setState({
                    loading: false
                });
            } else {
                Toasts.error(JSON.stringify(e))

                this.setState({
                    loading: false
                });
            }
        }
    }
    
    render() {
        let { registeredUser, loading } = this.state
        if (registeredUser) {
            return <Redirect
                to="/"
            />
        } else {
            return <>
                {loading && <h2>Loading...</h2>}
                <RegisterPage register={this.register} />
            </>
        }
    }
}
export default RegisterPageMain

