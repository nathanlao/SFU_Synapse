import React, { useState } from "react";
import { Link } from "react-router-dom"
import { AppBar, Toolbar, Typography, Box, Divider, Paper, InputBase, IconButton } from "@mui/material";
import Avatar from '@mui/joy/Avatar';
import SendIcon from '@mui/icons-material/Send';

import Sidepanel from "../../components/Sidepanel/Sidepanel";

import settingLogo from "../../images/settings.svg"
import tempPic from "../../images/temp.png"

import './Connections.css'
        
export default function Connections() {

    return (
        <>
            <Sidepanel connections />
            <div className="chat-window-container">
                <AppBar position="relative" className="app-bar">
                    <Toolbar className="tool-bar">
                        <Typography variant="h6">
                            Corey
                        </Typography>
                        <Link to="/setting">
                            <img className="logo" src={settingLogo} alt="setting logo"/>
                        </Link>
                    </Toolbar>
                </AppBar>

                <div className="chat-content-container">
                    {/* TODO: display the conversation here, 
                        now only a hard coded value with styling */}
                    <div className="chat-content">
                        <Avatar src={tempPic} alt="user icon" className="user-icon"/>
                        <div>
                            <Typography variant="body1">
                                <Box sx={{ fontWeight: 'bold' }}>
                                    Corey
                                </Box>
                            </Typography>
                            <Typography variant="body3">
                                whats up
                            </Typography>
                        </div>
                        <div className="chat-time">
                            <Typography variant="body1">
                                2:45pm
                            </Typography>
                        </div>
                    </div>

                    <div className="chat-content">
                        <Avatar src={tempPic} alt="user icon" className="user-icon"/>
                        <div>
                            <Typography variant="body1">
                                <Box sx={{ fontWeight: 'bold' }}>
                                    Bryan
                                </Box>
                            </Typography>
                            <Typography variant="body3">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                                consequat. 
                            </Typography>
                        </div>
                        <Typography variant="body1" className="chat-time">
                            2:46pm  
                        </Typography>
                    </div>

                    <div className="chat-content">
                        <Avatar src={tempPic} alt="user icon" className="user-icon"/>
                        <div>
                            <Typography variant="body1">
                                <Box sx={{ fontWeight: 'bold' }}>
                                    Corey
                                </Box>
                            </Typography>
                            <Typography variant="body3">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Typography>
                        </div>
                        <Typography variant="body1" className="chat-time">
                            2:47pm
                        </Typography>
                    </div>

                </div>

                <Divider />
                <Paper component="form" className="input-container">
                    <InputBase 
                        className="input-field"
                        placeholder="Type a message">
                    </InputBase>
                    <IconButton type="submit">
                        <SendIcon className="send-button"/>
                    </IconButton>
                </Paper>
            </div>
        </>
    )
}