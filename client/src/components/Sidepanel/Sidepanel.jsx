import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography, Button } from "@mui/material";

import Accordion from "react-bootstrap/Accordion";
import 'bootstrap/dist/css/bootstrap.min.css';
import SidepanelItem from "../SidepanelItem/SidepanelItem";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'

import "./Sidepanel.css";

function ConnectionsSidepanel() {

    const [pendingConnections, setPendingConnections] = useState([])
    const [activeConnections, setActiveConnections] = useState([])
    const [clickedConnection, setClickedConnection] = useState(null)

    // Fetching pending connections
    useEffect(() => {
        fetch(`http://localhost:3000/connections`)
            .then(res => res.json())
            .then(data => {
                console.log("Fetching pending connections")
                setPendingConnections(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    // Fetching active connections
    const { id } = useParams()
    useEffect(() => {
        fetch(`http://localhost:3000/connections/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log("Fetching active connections")
                setActiveConnections(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [pendingConnections]) // Re-fetch whenever pendingConnections changed

    function renderAddButton(connectionId) {
        setClickedConnection(connectionId)
    }

    // Update the pending connection to be active 
    function handleUpdateConnection(connectionId) {

        console.log(`PUT request send from here with connection id: ${connectionId}`)

        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ connection_id: connectionId }),
        };
        
        fetch(`http://localhost:3000/connections/${connectionId}`, options)
            .then((res) => res.json())
            .then((data) => {
                setPendingConnections((prevConnections) =>
                prevConnections.filter((connection) => 
                    connection.connection_id !== connectionId
                ));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Map over activeConnections data return from backend
    const activeConnectionsEl = activeConnections.map((connection) => {
        return (
            <Accordion.Body key={connection.connection_id} style={{backgroundColor: '#11515c'}}>
                <SidepanelItem title={connection.userB_username} />
            </Accordion.Body>
        )
    })

    // Map over the pendingConnections
    const pendingConnectionsEl = pendingConnections.map((connection) => {
        return (
            <Link 
                to={`${connection.connection_id}`}
                key={connection.connection_id}
                state={{ pendingConnections: connection.userB_username }}
                onClick={() => renderAddButton(connection.connection_id)}
            >
                <Accordion.Body style={{backgroundColor: '#11515c'}}>
                        <SidepanelItem
                            indicator={clickedConnection === connection.connection_id 
                                ? (<Button size="small" variant="contained" color="success" 
                                        onClick={() => handleUpdateConnection(connection.connection_id)}>
                                        <PersonAddIcon />
                                    </Button>) 
                                : null}
                            title={connection.userB_username} 
                        />
                </Accordion.Body>
            </Link>
        )
    })

    return (
        <div className="sidepanel-container">
            <Typography className="sidepanel-header" variant="h4" color="common.white" gutterBottom>
                Connections
            </Typography>
            <Accordion flush style={{backgroundColor: '#11515c'}} defaultActiveKey="0">
                <Accordion.Item style={{backgroundColor: '#11515c'}} eventKey="0">
                    <Accordion.Header style={{backgroundColor: '#11515c'}}>Active connections</Accordion.Header>
                        {activeConnectionsEl}
                </Accordion.Item>
            </Accordion>
            <Accordion flush style={{backgroundColor: '#11515c'}}>
                <Accordion.Item style={{backgroundColor: '#11515c'}} eventKey="1">
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
    );
}

function GroupsSidepanel() {
    return (
        <div className="sidepanel-container">
            <Typography className="sidepanel-header" variant="h4" color="common.white" gutterBottom>
                Groups
            </Typography>
            <Accordion flush style={{backgroundColor: '#11515c'}} defaultActiveKey="0">
                <Accordion.Item style={{backgroundColor: '#11515c'}} eventKey="0">
                    <Accordion.Header style={{backgroundColor: '#11515c'}}>Courses</Accordion.Header>
                    <Accordion.Body style={{backgroundColor: '#11515c'}}>
                        <SidepanelItem title="CMPT 372" subtitle="67 members" indicator=""/>
                        <SidepanelItem title="CMPT 371" subtitle="103 members" indicator="" />
                    </Accordion.Body>
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
    )
}

function SettingsSidepanel() {
    function handleSettingsClick(event) {
        var items = document.querySelectorAll('.setting-item-div.active');

        if(items.length) 
            items[0].className = 'setting-item-div';

        event.target.className = 'setting-item-div active';
    }

    return (
        <div className="sidepanel-container">
            <Typography className="sidepanel-header" variant="h4" color="common.white" gutterBottom>
                Settings
            </Typography>
            <Link to="/setting/edit-profile">
                <div className="setting-item-div active" onClick={handleSettingsClick} >
                    Edit Profile
                </div>
            </Link>
            <Link to="/setting/change-password">
                <div className="setting-item-div" onClick={handleSettingsClick} >
                    Change Password
                </div>
            </Link>
        </div>
    )
}

export default function Sidepanel(props) {
    return (
        <>
            {props.connections && <ConnectionsSidepanel />}
            {props.groups && <GroupsSidepanel />}
            {props.settings && <SettingsSidepanel />}
        </>
    );
}
