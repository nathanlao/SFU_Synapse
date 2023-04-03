import React from "react";
import { useLocation, useMatch } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Avatar } from "@mui/material";
import { Link, NavLink, useOutletContext, useParams } from "react-router-dom";

import settingLogo from "../../images/settings.svg"

import './ChatTopBar.css'

export default function ChatTopBar() {

    // "from" property (connctionsLayout.jsx, GroupsLayout.jsx) to indicate the current path
    const { from, groupId, groupName, groupPic } = useOutletContext()
    const isConnectionPage = from.split("/")[1] === "connections"
    const isGroupPage = from.split("/")[1] === "groups"

    const chatSubtab = useMatch(`/groups/${groupId}`)
    const discoverSubtab = useMatch(`/groups/${groupId}/discover`)

    // receiver_name, groupName, groupPic from Sidepanel.jsx
    const chatNames = useLocation().state?.receiver_name

    const { connectionId } = useParams()

    return (
        <AppBar position="relative" className="app-bar">
            <Toolbar className="tool-bar">
                {
                    isConnectionPage ? (
                        <>
                            <Typography variant="h6">
                                {chatNames}
                            </Typography>
                            <Link to={`/connections/${connectionId}/settings`}>
                                <img className="logo" src={settingLogo} alt="setting logo"/>
                            </Link>
                        </>
                    ) : (
                        <div className="group-header">
                            <Avatar src={groupPic} alt="group icon"/>
                            <Typography variant="h6">
                                {groupName}
                            </Typography>
                        </div>
                        
                    )
                }
                {
                    isGroupPage ? (
                        <div className="subtabs">
                            <NavLink
                                to={`/groups/${groupId}/discover`}
                                className={discoverSubtab ? "active-subtab" : ""}
                            >
                                DISCOVER
                            </NavLink>
                            <NavLink 
                                to={`/groups/${groupId}`}
                                className={chatSubtab ? "active-subtab" : ""}
                            >
                                CHAT
                            </NavLink>
                        </div>
                    ) : null
                }
            </Toolbar>
        </AppBar>
    )
}