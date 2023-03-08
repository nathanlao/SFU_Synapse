import React from "react";
import { Outlet } from "react-router-dom";

import './MainLayout.css'

import Navbar from "./Navbar/Navbar";
import Sidepanel from "./Sidepanel/Sidepanel";

export default function Layouts() {
    return (
        <div className="app-layout">
            <Navbar />
            <Sidepanel />
            <Outlet />
        </div>
    )
}