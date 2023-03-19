import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidepanel from "../Sidepanel/Sidepanel";

import './ConnectionsLayout.css'
        
export default function Connections() {
    const path = useLocation().pathname

    return (
        <>
            <Sidepanel connections />
            <div className="connection-container">
                <Outlet context={{from: path}}/>
            </div>
        </>
    )
}