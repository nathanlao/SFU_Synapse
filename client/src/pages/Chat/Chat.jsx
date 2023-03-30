import React, { useState, useEffect } from 'react'
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

    const connectionObj = location.state?.pendingConnections?.find(connection => {
        return connection.connection_id === connectionId
    })

    console.log(connectionObj)
    
    const [message, setMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    const handleInputChange = (e) => {
        setMessage(e.target.value)
    }

    const sendMessage = (e) => {
        e.preventDefault()

        if (message !== "") {
            const messageData = {
                connectionId: connectionObj.connection_id,
                sender_name: connectionObj.userA_username,
                sender_id: connectionObj.userA_id,
                receiver_id: connectionObj.userB_id,
                message: message,
                timestamp: 
                    new Date(Date.now()).getHours() + 
                    ":" + 
                    new Date(Date.now()).getMinutes()
            }
    
            socket.emit('send-private-message', messageData)
            
            // Clear the input after sent
            setMessage("")
        }
    }

    useEffect(() => {
        if (connectionId) {

            socket.emit('join-private-room', connectionId);
    
            socket.on("receive-private-message", (data) => {
                if (data.connectionId === connectionId) {
                    setMessageList(prevMessageList => [...prevMessageList, data])
                }
            })

            return () => {
                socket.off('receive-private-message');
                socket.emit('leave-private-room', connectionId);
            }
        }
    }, [connectionId])

    const messagesEl = messageList.map((messageContent, index) => {
        const sender = messageContent.sender_id === connectionObj.userA_id ? 'You' : messageContent.sender_name;
        return (
            <div className="chat-content" key={index}>
                <Avatar src={tempPic} alt="user icon" className="user-icon"/>
                <div>
                    <Box sx={{ fontWeight: 'bold' }}>
                        <Typography variant="body1">
                            {sender}
                        </Typography>
                    </Box>
                    <Typography variant="body3">
                        {messageContent.message}
                    </Typography>
                </div>
                <div className="chat-time">
                    <Typography variant="body1">
                        {messageContent.timestamp}
                    </Typography>
                </div>
            </div>
        )
    })

    return (
        <>  
            <ChatTopBar />

            <div className="chat-content-container">
                {/* TODO: display the conversation here, 
                    now only hard coded chats with styling now */}
                {messagesEl}
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