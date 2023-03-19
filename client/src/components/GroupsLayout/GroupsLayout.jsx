import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidepanel from "../Sidepanel/Sidepanel";

import './GroupsLayout.css'

export default function Groups() {
    const path = useLocation().pathname

    return (
        <>
            <Sidepanel groups />
            <div className="groups-container">
                {/* "from" property to indicate the current path 
                    (used this in chatWindow component) */}
                <Outlet context={{from: path}}/>
            </div>
        </>
    )
}