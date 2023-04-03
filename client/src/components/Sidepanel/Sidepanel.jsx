import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

import Accordion from "react-bootstrap/Accordion";
import 'bootstrap/dist/css/bootstrap.min.css';
import SidepanelItem from "../SidepanelItem/SidepanelItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import binocularsIcon from "../../images/binoculars.png";
import CommunityBrowser from "../../pages/CommunityBrowser/CommunityBrowser"

import "./Sidepanel.css";

function ConnectionsSidepanel({ handleClickChat, currentUserId }) {

    const { connectionId } = useParams()

    const [pendingConnections, setPendingConnections] = useState([])
    const [activeConnections, setActiveConnections] = useState([])
    const [inactiveConnections, setInactiveConnections] = useState([])
    const [error, setError] = useState(null)

    function formatTimestampForDisplay(timestamp) {
        const date = new Date(timestamp);
        const hours24 = date.getHours();
        const ampm = hours24 < 12 ? "AM" : "PM";
        const hours12 = hours24 % 12 || 12;
        const minutes = date.getMinutes();
        const formattedHours = hours12.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    async function fetchLatestMessage(sender_id, receiver_id) {
        try {
            const res = await fetch(`/api/connections/chat/latest/${sender_id}/${receiver_id}`)
            const data = await res.json()

            if (data[0]) {
                return data[0]
            } else {
                return null
            }
        } catch (err) {
            console.error(err)
        }
        return null
    }

    async function getPendingConnections() {
        try {
            const response = await fetch(`/api/connections`)
            if (!response.ok) {
                // eslint-disable-next-line no-throw-literal
                throw {
                    message: "Failed to fetch pending connections", 
                    statusText: response.statusText,
                    status: response.status
                }
            }
            const data =  await response.json()
            
            // New array for message and timestamp
            const updatedConnections = [];
            for (const connection of data) {
                const otherUserId = (connection.userA_id === currentUserId) 
                    ? connection.userB_id 
                    : connection.userA_id
                const latestMessage = await fetchLatestMessage(currentUserId, otherUserId)
                updatedConnections.push({ ...connection, latestMessage: latestMessage?.message, latestTime: latestMessage?.timestamp})
            }

            setPendingConnections(updatedConnections)
        } catch (err) {
            console.log(err)
            setError(err)
        }
    }

    async function getActiveConnections() {
        try {
            const response = await fetch(`/api/connections/active-connections/${connectionId}`)
            if (!response.ok) {
                // eslint-disable-next-line no-throw-literal
                throw {
                    message: "Failed to fetch active connections", 
                    statusText: response.statusText,
                    status: response.status
                }
            }
            const data =  await response.json()

            const updatedConnections = [];
            for (const connection of data) {
                const otherUserId = (connection.userA_id === currentUserId) 
                    ? connection.userB_id 
                    : connection.userA_id
                const latestMessage = await fetchLatestMessage(currentUserId, otherUserId)
                updatedConnections.push({ ...connection, latestMessage: latestMessage?.message, latestTime: latestMessage?.timestamp})
            }

            setActiveConnections(updatedConnections)
        } catch (err) {
            console.log(err)
            setError(err)
        }
    }

    async function getInactiveConnections() {
        try {
            const response = await fetch('/api/connections/inactive-connections')
            if (!response.ok) {
                // eslint-disable-next-line no-throw-literal
                throw {
                    message: "Failed to fetch inactive connections", 
                    statusText: response.statusText,
                    status: response.status
                }
            }
            const data = await response.json()

            const updatedConnections = [];
            for (const connection of data) {
                const otherUserId = (connection.userA_id === currentUserId) 
                    ? connection.userB_id 
                    : connection.userA_id
                const latestMessage = await fetchLatestMessage(currentUserId, otherUserId)
                updatedConnections.push({ 
                    ...connection, 
                    latestMessage: latestMessage?.message, 
                    latestTime: latestMessage?.timestamp
                })
            }

            setInactiveConnections(updatedConnections)
        } catch (err) {
            console.log(err)
            setError(err)
        }
    }

    async function fetchAllConnections() {
        await getPendingConnections()
        await getActiveConnections()
        await getInactiveConnections()
    }

    // Fetching pending/active/inactive connections
    useEffect(() => {
        if (currentUserId) {
            fetchAllConnections()
            const intervalId = setInterval(() => {
                fetchAllConnections()
            }, 5000) // Fetch connections every 5 seconds
    
            return () => {
                clearInterval(intervalId)
            }
        }
    }, [currentUserId])
    
    // Map over the pendingConnections
    const pendingConnectionsEl = pendingConnections.map((connection) => {
        return (
            <Link 
                to={`/connections/${connection.connection_id}`}
                key={connection.connection_id}
                state={{ 
                    sender_id: currentUserId,
                    receiver_name: connection.userA_id === currentUserId ? connection.userB_username : connection.userA_username, 
                    pendingConnections: pendingConnections
                }}
                onClick={() => handleClickChat({connectionId: connection.connection_id})}
            >
                <Accordion.Body style={{backgroundColor: '#11515c'}}>
                        <SidepanelItem
                            image={
                                connection.userA_id === currentUserId
                                    ? connection.userB_photo
                                    : connection.userA_photo
                            }
                            title={
                                connection.userA_id === currentUserId
                                ? connection.userB_username
                                : connection.userA_username
                            }
                            subtitle={connection.latestMessage ? connection.latestMessage : "No messages yet"}
                            indicator={connection.latestTime ? formatTimestampForDisplay(connection.latestTime) : ""}
                        />
                </Accordion.Body>
            </Link>
        )
    })

    // Map over activeConnections data return from backend
    const activeConnectionsEl = activeConnections.map((connection) => {
        return (
            <Link
                to={`/connections/${connection.connection_id}`}
                key={connection.connection_id}
                state={{ 
                    sender_id: currentUserId,
                    receiver_name: connection.userA_id === currentUserId ? connection.userB_username : connection.userA_username, 
                    pendingConnections: activeConnections
                }}
                onClick={() => handleClickChat({connectionId: connection.connection_id})}
            >
                <Accordion.Body style={{backgroundColor: '#11515c'}}>
                    <SidepanelItem 
                        image={connection.userA_id === currentUserId 
                            ? connection.userB_photo 
                            : connection.userA_photo
                        } 
                        title={ connection.userA_id === currentUserId
                            ? connection.userB_username
                            : connection.userA_username
                        } 
                        subtitle={connection.latestMessage ? connection.latestMessage : "No messages yet"}
                        indicator={connection.latestTime ? formatTimestampForDisplay(connection.latestTime) : ""}
                    />
                </Accordion.Body>
            </Link>
        )
    })

    // Map over inactiveConnections data return from backend
    const inactiveConnectionsEl = inactiveConnections.map((connection) => {
        return (
            <Accordion.Body key={connection.connection_id} style={{backgroundColor: '#11515c'}}>
                <SidepanelItem 
                    image={connection.userA_id === currentUserId 
                        ? connection.userB_photo 
                        : connection.userA_photo
                    } 
                    title={ connection.userA_id === currentUserId
                        ? connection.userB_username
                        : connection.userA_username
                    } 
                    subtitle={connection.latestMessage ? connection.latestMessage : "No messages yet"}
                    indicator={connection.latestTime ? formatTimestampForDisplay(connection.latestTime) : ""}
                />
            </Accordion.Body>
        )
    })

    if (error) {
        return <h4>There was an error: {error.message}</h4>
    }

    return (
        <div className="sidepanel-container">
            <div className="scroll-content">
                <Typography className="sidepanel-header" variant="h4" color="common.white" gutterBottom>
                    Connections
                </Typography>
                <Accordion flush style={{backgroundColor: '#11515c'}} defaultActiveKey="0">
                    <Accordion.Item style={{backgroundColor: '#11515c'}} eventKey="0">
                        <Accordion.Header style={{backgroundColor: '#11515c'}}>Active connections</Accordion.Header>
                            {activeConnectionsEl}
                    </Accordion.Item>
                </Accordion>
                <Accordion flush style={{backgroundColor: '#11515c'}} defaultActiveKey="0">
                    <Accordion.Item style={{backgroundColor: '#11515c'}} eventKey="0">
                        <Accordion.Header style={{backgroundColor: '#11515c'}}>Pending connections</Accordion.Header>
                            {pendingConnectionsEl}
                    </Accordion.Item>
                </Accordion>
                <Accordion flush style={{backgroundColor: '#11515c'}} defaultActiveKey="0">
                    <Accordion.Item style={{backgroundColor: '#11515c'}} eventKey="0">
                        <Accordion.Header style={{backgroundColor: '#11515c'}}>Inactive connections</Accordion.Header>
                        <Accordion.Body style={{backgroundColor: '#11515c'}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu
                            fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit
                            anim id est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

            </div>
        </div>
    );
}

function GroupsSidepanel({ handleSwitchSubtabs, currentUserId }) {

    const [courseGroups, setCourseGroups] = useState([])
    const [communityBrowser, setCommunityBrowser] = useState(false)

    useEffect(() => {
        async function getGroupsOfCourses() {
            try {
                const response = await fetch('/api/groups/courses')
                if (!response.ok) {
                    // eslint-disable-next-line no-throw-literal
                    throw {
                        message: "Failed to fetch courses in groups", 
                        statusText: response.statusText,
                        status: response.status
                    }
                }
                const data = await response.json()
                setCourseGroups(data)
            } catch(err) {
                console.log(err)
            }
        }
        getGroupsOfCourses()
    }, [])

    const courseGroupsEl = courseGroups.map(group => {
        const moreThanOneMember = (group.num_members > 1) ? "members" : "member"

        return (
            <Link 
                to={`/groups/${group.group_id}`} 
                key={group.group_id}
                onClick={() => handleSwitchSubtabs({groupId: group.group_id, groupName: group.group_name, groupPic: group.photo})}
                state={{
                    user_id: currentUserId
                }}
            >
                <Accordion.Body style={{backgroundColor: '#11515c'}}>
                    <SidepanelItem 
                        image={group.photo}
                        title={group.group_name} 
                        subtitle={`${group.num_members} ${moreThanOneMember}`} 
                        indicator=""
                    />
                </Accordion.Body>
            </Link>
        )
    })

    async function handleBrowseBtnClick() {
        setCommunityBrowser(true)
    }

    return (
        <div className="sidepanel-container">
            <div className="scroll-content">
                <Typography className="sidepanel-header" variant="h4" color="common.white" gutterBottom>
                    Groups
                </Typography>
                <Accordion flush style={{backgroundColor: '#11515c'}} defaultActiveKey="0">
                    <Accordion.Item style={{backgroundColor: '#11515c'}} eventKey="0">
                        <Accordion.Header style={{backgroundColor: '#11515c'}}>Courses</Accordion.Header>
                            {courseGroupsEl}
                    </Accordion.Item>
                </Accordion>
                <Accordion flush style={{backgroundColor: '#11515c'}}>
                    <Accordion.Item style={{backgroundColor: '#11515c'}} eventKey="0">
                        <Accordion.Header style={{backgroundColor: '#11515c'}}>Communities</Accordion.Header>
                        <Accordion.Body style={{backgroundColor: '#11515c'}}>
                            <SidepanelItem title="Wildin'" subtitle="9 members" indicator={<FontAwesomeIcon icon={faLock}/>}/>
                            <SidepanelItem title="Dog Owners" subtitle="78 members" indicator=""/>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            <div className="nav-buttons">
                <button type="button" id="exploreBtn" onClick={handleBrowseBtnClick}><img src={binocularsIcon} alt="" /> Explore communities</button>
            </div>
            {communityBrowser && <CommunityBrowser notifyClosure={() => setCommunityBrowser(false)} />}
        </div>
    )
}

function SettingsSidepanel() {
    const path = useLocation().pathname;

    function handleSettingsClick(event) {
        var items = document.querySelectorAll('.setting-item-div.active');

        if(items.length) 
            items[0].className = 'setting-item-div';

        event.target.className = 'setting-item-div active';
    }

    return (
        <div className="sidepanel-container">
            <div className="scroll-content">
                <Typography className="sidepanel-header" variant="h4" color="common.white" gutterBottom>
                    Settings
                </Typography>
                <Link to="/setting/edit-profile">
                    {(path === "/setting/edit-profile") ? 
                    <div className="setting-item-div active" onClick={handleSettingsClick} >Edit profile</div> : 
                    <div className="setting-item-div" onClick={handleSettingsClick} >Edit profile</div> 
                    }
                </Link>
                <Link to="/setting/change-password">
                    {(path === "/setting/change-password") ? 
                    <div className="setting-item-div active" onClick={handleSettingsClick} >Change password</div> : 
                    <div className="setting-item-div" onClick={handleSettingsClick} >Change password</div> 
                    }
                </Link>
                <Link to="/setting/edit-course-enrollment">
                    {(path === "/setting/edit-course-enrollment") ? 
                    <div className="setting-item-div active" onClick={handleSettingsClick} >Edit course enrollment</div> : 
                    <div className="setting-item-div" onClick={handleSettingsClick} >Edit course enrollment</div> 
                    }
                </Link>
                <Link to="/setting/delete-account">
                    {(path === "/setting/delete-account") ? 
                    <div className="setting-item-div active" onClick={handleSettingsClick} >Delete account</div> : 
                    <div className="setting-item-div" onClick={handleSettingsClick} >Delete account</div> 
                    }
                </Link>
                <Link to="/setting/logout">
                    {(path === "/setting/logout") ? 
                    <div className="setting-item-div active" onClick={handleSettingsClick} >Logout</div> : 
                    <div className="setting-item-div" onClick={handleSettingsClick} >Logout</div> 
                    }
                </Link>
                
            </div>
        </div>
    )
}

export default function Sidepanel(props) {

    const [currentUserId, setCurrentUserId] = useState(null);
    useEffect(() => {
        async function getCurrentLoginUser() {
            try {
                const response = await fetch("/api/currentuser")
                if (!response.ok) {
                    // eslint-disable-next-line no-throw-literal
                    throw {
                        message: "Failed to fetch current login user", 
                        statusText: response.statusText,
                        status: response.status
                    }
                }
                const data =  await response.json()
                setCurrentUserId(data[0].user_id)
            } catch (err) {
                console.log(err)
            }
        }
        getCurrentLoginUser()
    }, [])

    return (
        <>
            {props.connections && <ConnectionsSidepanel handleClickChat={props.handleClickChat} currentUserId={currentUserId} />}
            {props.groups && <GroupsSidepanel handleSwitchSubtabs={props.handleSwitchSubtabs} currentUserId={currentUserId} />}
            {props.settings && <SettingsSidepanel />}
        </>
    );
}
