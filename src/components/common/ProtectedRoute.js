import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from '../../auth/auth'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                let token = sessionStorage.getItem('token');
                if (token != null) {
                    Auth.isAuthenticated = true
                }
                if (Auth.isAuthenticated) {
                    return <Component {...props} />
                } else {
                    return <Redirect
                        to="/"
                    />
                }

            }
            }
        />
    );
}

export default ProtectedRoute;