import React from "react"
import { Navigate, Outlet } from "react-router-dom"

import Login from "../pages/Login"

export default function LoginRequired() {

    //TODO: hard code key in localStorage to test login page, 
    //      will have to do the auth from server side
    const isLoggedIn = localStorage.getItem("login")

    if (!isLoggedIn) {
        return <Navigate to='/login' replace={true}/>
    }
    return <Outlet />
}