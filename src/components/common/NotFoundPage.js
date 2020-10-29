import React from 'react'
import { NavLink } from "react-router-dom";

function NotFoundPage() {
    return (
        <div>
            <h1>Sorry We have had a problem and can not find the page your looking for</h1>
            <NavLink
                exact
                to="/"
              >
                Go Home
              </NavLink>
        </div>
    )
}

export default NotFoundPage