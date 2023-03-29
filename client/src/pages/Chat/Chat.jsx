import React, { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import io from 'socket.io-client'
import { Typography, Box, Divider, Paper, InputBase, IconButton } from "@mui/material";
import Avatar from '@mui/joy/Avatar';
import SendIcon from '@mui/icons-material/Send';
import ChatTopBar from "../../components/ChatTopBar/ChatTopBar";

import tempPic from "../../images/temp.png"

import './Chat.css'

const socket = io.connect("http://localhost:8080")

export default function Chat() {

    const { connectionId } = useParams()
    // state value from sidepanel.jsx
    const location = useLocation()
    const userA_id = location?.state?.userAId
    const userB_id = location?.state?.userBId
    console.log(userA_id, "sending to " , userB_id)

    const [message, setMessage] = useState("")

    const handleInputChange = (e) => {
        setMessage(e.target.value)
    }

    const sendMessage = (e) => {
        e.preventDefault()

        socket.emit('private-chat', {
            sender_id: userA_id,
            receiver_id: userB_id,
            message: message,
            timestamp: Date.now()
        })
        // Clear the input after sent
        setMessage("")
    }

    return (
        <>  
            <ChatTopBar />

            <div className="chat-content-container">
                {/* TODO: display the conversation here, 
                    now only hard coded chats with styling now */}
                <div className="chat-content">
                    <Avatar src={tempPic} alt="user icon" className="user-icon"/>
                    <div>
                        <Box sx={{ fontWeight: 'bold' }}>
                            <Typography variant="body1">
                                Corey
                            </Typography>
                        </Box>
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
                        <Box sx={{ fontWeight: 'bold' }}>
                            <Typography variant="body1">
                                Bryan
                            </Typography>
                        </Box>
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
                        <Box sx={{ fontWeight: 'bold' }}>
                            <Typography variant="body1">
                                Corey
                            </Typography>
                        </Box>
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
            <Paper component="form" onSubmit={sendMessage} className="input-container">
                <InputBase 
                    className="input-field"
                    placeholder="Type a message"
                    value={message}
                    onChange={handleInputChange}>
                </InputBase>
                <IconButton type="submit">
                    <SendIcon className="send-button"/>
                </IconButton>
            </Paper>
        </>
    )
}