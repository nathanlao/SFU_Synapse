import React from "react"
import { Navigate, Outlet } from "react-router-dom"

export default function CheckLoginStatus() {

    const loggedIn = false

    if (!loggedIn) {
        return <Navigate to='/login' replace={true}/>
    }
    
    return <Outlet />
}