import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import Sidepanel from "../Sidepanel/Sidepanel";
import Notification from "../Notification/Notification"

import './GroupsLayout.css'

export default function GroupsLayout() {
    const path = useLocation().pathname

    // socketRef from MainLayout.jsx
    const { socket } = useOutletContext()

    // This state is used to persist the groupId, groupName and groupPic when switch in between discover & chat
    const [groupId, setGroupId] = useState(null);
    const [groupName, setGroupName] = useState("")
    const [groupPic, setGroupPic] = useState("")
    const [onGroupChat, setOnGroupChat] = useState(false)

    const handleSwitchSubtabs = ({ groupId, groupName, groupPic }) => {
        setGroupId(groupId)
        setGroupName(groupName)
        setGroupPic(groupPic)
    }

    // Check if its is on group chats
    useEffect(() => {
        if (path === `/groups/${groupId}` || path === `/groups/${groupId}/discover` || path === `/groups/${groupId}/settings`) {
            setOnGroupChat(true)
        } else {
            setOnGroupChat(false)
        }
    }, [path, groupId])

    return (
        <>
            <Sidepanel groups handleSwitchSubtabs={handleSwitchSubtabs} />
            {onGroupChat ? (
                <div className="groups-container">
                    {/* "from" property to indicate the current path 
                        (used this in chat component) */}
                    <Outlet context={{
                            from: path, 
                            groupId: groupId, 
                            groupName: groupName, 
                            groupPic: groupPic,
                            socketForGroup: socket
                        }} 
                    />
                </div> 
            ) : (
                <Notification isGroups/>
            )}
        </>
    )
}