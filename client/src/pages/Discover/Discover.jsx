import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Divider, Paper, InputBase, IconButton } from "@mui/material";
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import ChatTopBar from "../../components/ChatTopBar/ChatTopBar";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

import './Discover.css'

export default function Discover() {

    // ProfileCard is selected
    const [isSelected, setIsSelected] = useState(false)
    const [input, setInput] = useState("")

    function handleInputChange(e) {
        const { value } = e.target
        setInput(value)
    }

    function createPendingConnection(e) {
        e.preventDefault()

        
    }

    return (
        <>
            <ChatTopBar />

            {/* TODO: users' profile cards go here */}
            <div className="profile-cards-layout">
                <div className="profile-cards-container">
                    {/* TODO: Link is for isSelected state and enable the use of sending function for now*/}
                    <Link 
                        to="/groups/discover"
                        onClick={() => setIsSelected(true)}
                    >
                        <ProfileCard />
                    </Link>
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
                </div>
            </div>
            <Divider />
            <Paper component="form" onSubmit={createPendingConnection} className="input-container">
                <InputBase
                    className="input-field"
                    disabled={isSelected ? false : true}
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Hi Nima! I'm from CMPT 120 too">
                </InputBase>
                <IconButton type="submit" disabled={isSelected ? false : true}>
                    <GroupAddIcon className="send-button"/>
                </IconButton>
            </Paper>
        </>
    )
}