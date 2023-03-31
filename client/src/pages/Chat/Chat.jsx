import React, { useState, useEffect, useRef } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import io from 'socket.io-client'
import { Typography, Box, Divider, Paper, InputBase, IconButton } from "@mui/material";
import Avatar from '@mui/joy/Avatar';
import SendIcon from '@mui/icons-material/Send';
import ChatTopBar from "../../components/ChatTopBar/ChatTopBar";

import './Chat.css'

export default function Chat() {
    const socketRef = useRef();

    const { connectionId } = useParams()
    // state value from sidepanel.jsx
    const location = useLocation()
    const connectionObj = location.state?.pendingConnections?.find(connection => {
        return connection.connection_id === connectionId
    })
    
    const [input, setInput] = useState("")
    const [messageList, setMessageList] = useState([])

    function formatTimestamp(date) {
        const hours24 = date.getHours()
        const ampm = hours24 < 12 ? "AM" : "PM"
        const hours12 = hours24 % 12 || 12
        const minutes = date.getMinutes()

        const formattedHours = hours12.toString().padStart(2, '0')
        const formattedMinutes = minutes.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    function handleInputChange(e) {
        setInput(e.target.value)
    }

    function sendMessage(e) {
        e.preventDefault()

        if (input !== "") {
            const messageData = {
                sender_id: connectionObj.userA_id,
                receiver_id: connectionObj.userB_id,
                message: input,
                timestamp: formatTimestamp(new Date(Date.now()))
            }
    
            socketRef.current.emit('sendMessage', messageData)
            
            // Update the messageList state with the sent message
            setMessageList((prevMessages) => [...prevMessages, messageData]);

            // Clear the input after sent
            setInput("")
        }
    }

    useEffect(() => {
        if (connectionId) {

            async function fetchChatHistory() {
                const sender_id = connectionObj.userA_id;
                const receiver_id = connectionObj.userB_id;
            
                try {
                    const res = await fetch(`/api/connections/chat/${sender_id}/${receiver_id}`);
                    const data = await res.json();
                    setMessageList(data);
                } catch (err) {
                    console.error(err);
                }
            }
            fetchChatHistory()

            socketRef.current = io.connect('http://localhost:8080');

            socketRef.current.on("receiveMessage", (message) => {
                setMessageList((prevMessages) => [...prevMessages, message]);
            })

            return () => {
                socketRef.current.disconnect()
            }
        }
    }, [connectionId])

    const messagesEl = messageList.map((messageContent, index) => {
        const sender = (messageContent.sender_id === connectionObj.userA_id) 
            ? connectionObj.userA_username 
            : connectionObj.userB_username

        const profilePic = (messageContent.sender_id === connectionObj.userA_id)
            ? connectionObj.userA_photo
            : connectionObj.userB_photo

        return (
            <div className="chat-content" key={index}>
                <Avatar src={profilePic} alt="user icon" className="user-icon"/>
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
                {messagesEl}
            </div>

            <Divider />
            <Paper component="form" onSubmit={sendMessage} className="input-container">
                <InputBase 
                    className="input-field"
                    placeholder="Type a message"
                    value={input}
                    onChange={handleInputChange}>
                </InputBase>
                <IconButton type="submit">
                    <SendIcon className="send-button"/>
                </IconButton>
            </Paper>
        </>
    )
}