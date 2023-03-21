import React from "react";
import { Link } from "react-router-dom"

import appLogo from "../../images/app_logo.png"
import homeLogo from "../../images/home.svg"
import chatLogo from "../../images/chat.svg"
import connectionLogo from "../../images/connections.svg"
import settingLogo from "../../images/settings.svg"

import './Navbar.css'

export default function Navbar() {
    return (
        <nav className="nav-container">
            <img src={appLogo} alt="sfu synapse logo"/>
            <div className="logo-container">
                <Link to="/">
                    <img src={homeLogo} alt="home logo"/>
                </Link>
                <Link to="connections">
                    <img src={chatLogo} alt="chat logo"/>
                </Link>
                <Link to="groups">
                    <img src={connectionLogo} alt="connection logo"/>
                </Link>
            </div>
            <Link to="setting/edit-profile" className="setting">
                <img src={settingLogo} alt="setting logo"/>
            </Link>
        </nav>
    )
}