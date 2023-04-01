import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidepanel from "../Sidepanel/Sidepanel";

import './GroupsLayout.css'

export default function GroupsLayout() {
    const path = useLocation().pathname
    // This state is used to persist the groupId when switch in between discover & chat
    const [groupId, setGroupId] = useState(null);

    return (
        <>
            <Sidepanel groups onChatSubtab={setGroupId} />
            <div className="groups-container">
                {/* "from" property to indicate the current path 
                    (used this in chatWindow component) */}
                <Outlet context={{from: path, groupId: groupId}}/>
            </div>
        </>
    )
}