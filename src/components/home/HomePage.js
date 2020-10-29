import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Auth from "../../auth/auth";

export class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            password: "",
            // authenticated: false
            error:"",
            errorA:[]

        }
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
        this.logout=this.logout.bind(this);
    }

    componentWillMount() {
        let token = sessionStorage.getItem('token');
        if (token != null) {
            Auth.isAuthenticated=true;
        }
    }

    async login() {

        try {
            this.setState({
                loading: true
            });

            let res= await Auth.login(this.state.password);
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

        let { password,  loading } = this.state

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
                    </div>

                    :
                    <div>
                        <label>Password</label>
                        <input type="password" onKeyPress={this.onKeyPress} onChange={this.onChange} value={password} type="text" />
                        <button id="AddBtn" onClick={this.login}>Login</button>
                    </div>
                }
                <h2>Error: {this.state.error}</h2>
                <NavLink
                        className="btn btn-primary"
                        activeClassName="active"
                        to="/linkrelink"
                    >linkrelink</NavLink>


            </div>
        )
    }
}

export default HomePage

