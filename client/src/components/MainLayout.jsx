import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { requiresLogin } from "../services/authentication.service"
import { useNavigate } from 'react-router-dom';
import './MainLayout.css'

import Navbar from "./Navbar/Navbar";
import Sidepanel from "./Sidepanel/Sidepanel";

export default function Layouts() {
    const navigate = useNavigate()
    
    useEffect(() => {
        async function init() {
            // check login status
            if(await requiresLogin('user')) {
                navigate('/login', { replace: true })
            }
        }
        init()
    })
    return (
        <div className="app-layout">
            <Navbar />
            <Sidepanel />
            <Outlet />
        </div>
    )
}