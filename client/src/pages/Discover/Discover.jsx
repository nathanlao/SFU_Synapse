import React from "react";
import { Divider, Paper, InputBase, IconButton } from "@mui/material";
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import ChatTopBar from "../../components/ChatTopBar/ChatTopBar";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import settingLogo from "../../images/settings.svg"

import './Discover.css'

export default function Discover() {

    return (
        <>
            <ChatTopBar />

            {/* TODO: users' profile cards go here */}
            <div className="profile-cards-layout">
                <div className="profile-cards-container">
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
                </div>
            </div>
            <Divider />
            <Paper component="form" className="input-container">
                <InputBase 
                    className="input-field"
                    placeholder="Hi Nima! I'm from CMPT 120 too">
                </InputBase>
                <IconButton type="submit">
                    <GroupAddIcon className="send-button"/>
                </IconButton>
            </Paper>
        </>
    )
}