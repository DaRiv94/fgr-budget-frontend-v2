import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Toasts from '../common/Toasts'
import {Redirect} from 'react-router-dom'
import Register from '../../api/Register';
import Toast from '../common/Toasts';

export class RegisterPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            password: "",
            password2: "",
            email: "",
            registeredUser:false,
        }
        this.register = this.register.bind(this);
        this.emailOnChange = this.emailOnChange.bind(this);
        this.passwordOnChange = this.passwordOnChange.bind(this);
        this.password2OnChange = this.password2OnChange.bind(this);

    }


    async register() {

        try {
            this.setState({
                loading: true
            });

            //should return response.newUser 
            await Register.register(this.state.email,this.state.password,this.state.password2);

            Toasts.success("Successfully Registered User!")
            
            this.setState({
                loading: false,
                registeredUser: true
            });

        } catch (e) {
            console.log("e: ",e)
            if(typeof(e.Error)=="string"){
                Toast.error(e.Error)
 
                this.setState({
                    loading: false
                });
            }else{
                Toast.error(JSON.stringify(e))

                this.setState({
                    loading: false
                });
            }
            
        }

    }

    emailOnChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    passwordOnChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    password2OnChange(e) {
        this.setState({
            password2: e.target.value
        })
    }

    onKeyPress(e){
        if(e.key === 'Enter'){
            document.getElementById("AddBtn").click();
        }
    }


    render() {

        let { registeredUser, email, password, password2, loading } = this.state
        if(registeredUser){
            return <Redirect 
            to="/"
            />
            // return <Redirect 
            // to={{
            //     pathname: "/",
            //     state: { toast: {type:"success",message:"Successfully Registered User!"}}
            //   }}
            // />
        }else{
            return (
                <div>
                    <h1>Register</h1>

                    {loading && <h2>Loading...</h2>}
                        <div>
                            <label>Email</label>
                            <input type="text" onKeyPress={this.onKeyPress} onChange={this.emailOnChange} value={email} />
                            <label>Password</label>
                            <input type="password" onKeyPress={this.onKeyPress} onChange={this.passwordOnChange} value={password} />
                            <label>Match Password</label>
                            <input type="password" onKeyPress={this.onKeyPress} onChange={this.password2OnChange} value={password2} />
                            <button id="AddBtn" onClick={this.register}>Register</button>
                            
                        <NavLink
                        className="btn btn-primary"
                        activeClassName="active"
                        to="/"
                        >Go Home</NavLink>

                        </div>
                </div>
            )
        }
    }
}



export default RegisterPage

