import React from "react";
import { useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Avatar } from "@mui/material";
import { Link, NavLink, useOutletContext } from "react-router-dom";

import settingLogo from "../../images/settings.svg"
import groupPic from "../../images/group_profile/course_random_default_3.png"

import './ChatTopBar.css'

export default function ChatTopBar() {

    // "from" property to indicate the current path
    const { from } = useOutletContext()
    const isConnectionPage = from.split("/")[1] === "connections"
    const isGroupPage = from.split("/")[1] === "groups"

    // testData from Sidepanel.jsx
    const chatNames = useLocation().state?.pendingConnections

    const activeStyle = {
        fontWeight: 'bold',
        borderBottom: '2px solid #11515D',
        color: '#11515D',
    }

    return (
        <AppBar position="relative" className="app-bar">
            <Toolbar className="tool-bar">
                {
                    isConnectionPage ? (
                        <Typography variant="h6">
                            {chatNames}
                        </Typography>
                    ) : (
                        <div className="group-header">
                            <Avatar src={groupPic} alt="group icon"/>
                            <Typography variant="h6">
                                CMPT 372
                            </Typography>
                        </div>
                        
                    )
                }
                {
                    isGroupPage ? (
                        <div className="subtabs">
                            <NavLink
                                to="/groups/discover"
                                style={({isActive}) => isActive ? activeStyle : null}
                            >
                                DISCOVER
                            </NavLink>
                            <NavLink 
                                to={`/groups/chat`}
                                style={({isActive}) => isActive ? activeStyle : null}
                            >
                                CHAT
                            </NavLink>
                        </div>
                    ) : null
                }
                <Link to="/setting">
                    <img className="logo" src={settingLogo} alt="setting logo"/>
                </Link>
            </Toolbar>
        </AppBar>
    )
}