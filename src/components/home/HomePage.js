import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Auth from "../../auth/auth";
import Info from '../../api/Info';

export class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            password: "",
            email: "",
            // authenticated: false
            error:"",
            errorA:[],
            is_sandbox: false,
            user:{},

        }
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
        this.emailOnChange = this.emailOnChange.bind(this);
        this.logout=this.logout.bind(this);
    }

    async componentWillMount() {
        let token = sessionStorage.getItem('token');
        if (token != null) {
            Auth.isAuthenticated=true;

            let user = await Info.getUserData()
            this.setState({
                user: user
            });
        }

        // console.log("process.env.REACT_APP_PROJECT_ENV: ", process.env.REACT_APP_PROJECT_ENV)
        if(process.env.REACT_APP_PROJECT_ENV == 'sandbox'){
            this.setState({
                is_sandbox: true
            });
        }

        
    }

    async login() {

        try {
            this.setState({
                loading: true
            });

            let res= await Auth.login(this.state.email,this.state.password);
            console.log("res:", res);
            this.setState({
                error:"",
                loading: false,
                // authenticated:Auth.isAuthenticated
            });
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

    logout() {
        Auth.logout();
        //force update with similated state update
        this.forceUpdate();
    }

    emailOnChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    onKeyPress(e){
        if(e.key === 'Enter'){
            document.getElementById("AddBtn").click();
        }
    }


    render() {

        let { email, password,  loading } = this.state

        return (
            <div>
                <h1>Homepage</h1>

                {loading && <h2>Loading...</h2>}

                {Auth.isAuthenticated ?
                    <div>
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
                    <div>
                        <label>Email</label>
                        <input type="text" onKeyPress={this.onKeyPress} onChange={this.emailOnChange} value={email} />
                        <label>Password</label>
                        <input type="password" onKeyPress={this.onKeyPress} onChange={this.onChange} value={password} />
                        <button id="AddBtn" onClick={this.login}>Login</button>
                        
                    <NavLink
                    className="btn btn-primary"
                    activeClassName="active"
                    to="/register"
                >Register</NavLink>
                    <h2>Error: {this.state.error}</h2>
                    </div>
                }
                
                {Auth.isAuthenticated && this.state.is_sandbox && 
                <div>

                        <NavLink
                    className="btn btn-primary"
                    activeClassName="active"
                    to="/newtransactionemailtemplateexample"
                >See Example of New Transactions Email</NavLink>

                </div> }


            </div>
        )
    }
}

export default HomePage

