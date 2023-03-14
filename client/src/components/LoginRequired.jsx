import React from "react"
import { Navigate, Outlet } from "react-router-dom"

import Login from "../pages/Login"

export default function LoginRequired() {

    //TODO: hard code token to test login page, will have to do the auth
    //      from server side
    const auth = {token: null}

    if (!auth.token) {
        return <Navigate to='/login' replace={true}/>
    }
    return <Outlet />
}