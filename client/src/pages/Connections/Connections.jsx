import React from "react";
import { Outlet } from "react-router-dom";
import Sidepanel from "../../components/Sidepanel/Sidepanel";

import './Connections.css'
        
export default function Connections() {

    return (
        <>
            <Sidepanel connections />
            <div className="connection-container">
                <Outlet />
            </div>
        </>
    )
}