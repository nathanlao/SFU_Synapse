import React from "react";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGroupArrowsRotate } from '@fortawesome/free-solid-svg-icons'

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
                    <img src={chatLogo} alt="connection logo"/>
                </Link>
                <Link to="groups">
                    <img src={connectionLogo} alt="connection logo"/>
                </Link>
            </div>
            <Link to="setting" className="setting">
                <img src={settingLogo} alt="connection logo"/>
            </Link>
        </nav>
    )
}