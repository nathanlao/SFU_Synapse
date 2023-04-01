import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidepanel from "../Sidepanel/Sidepanel";

import './GroupsLayout.css'

export default function GroupsLayout() {
    const path = useLocation().pathname
    // This state is used to persist the groupId, groupName and groupPic when switch in between discover & chat
    const [groupId, setGroupId] = useState(null);
    const [groupName, setGroupName] = useState("")
    const [groupPic, setGroupPic] = useState("")

    const handleSwitchSubtabs = ({ groupId, groupName, groupPic }) => {
        setGroupId(groupId)
        setGroupName(groupName)
        setGroupPic(groupPic)
    }

    return (
        <>
            <Sidepanel groups handleSwitchSubtabs={handleSwitchSubtabs} />
            <div className="groups-container">
                {/* "from" property to indicate the current path 
                    (used this in chatWindow component) */}
                <Outlet context={{
                    from: path, 
                    groupId: groupId, 
                    groupName: groupName, 
                    groupPic: groupPic
                }}
                />
            </div>
        </>
    )
}