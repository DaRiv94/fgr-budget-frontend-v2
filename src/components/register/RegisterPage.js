import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
// import Auth from "../../auth/auth";
import Register from '../../api/Register';

export class RegisterPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            password: "",
            password2: "",
            email: "",
            // authenticated: false
            error:"",
            errorA:[]

        }
        this.register = this.register.bind(this);
        this.emailOnChange = this.emailOnChange.bind(this);
        this.passwordOnChange = this.passwordOnChange.bind(this);
        this.password2OnChange = this.password2OnChange.bind(this);

    }

    // componentWillMount() {
    //     let token = sessionStorage.getItem('token');
    //     if (token != null) {
    //         Auth.isAuthenticated=true;
    //     }
    // }

    async register() {

        try {
            this.setState({
                loading: true
            });

            let res= await Register.register(this.state.email,this.state.password,this.state.password2);
            // console.log("Register res:", res);
            this.setState({
                error:"",
                loading: false,
                // authenticated:Auth.isAuthenticated
            });
            //ADD LOGIC TO TO REDIRECT TO HOMEPAGE
        } catch (e) {
            console.log(e);
            if(typeof(e.Error)=="string"){
                this.setState({
                    error:e.Error,
                    loading: false
                });
            }else{
                this.setState({
                    error:JSON.stringify(e),
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

        let { email, password, password2, loading } = this.state

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
                
                <h2>Error: {this.state.error}</h2>
                


            </div>
        )
    }
}

export default RegisterPage

