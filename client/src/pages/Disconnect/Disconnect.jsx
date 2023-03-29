import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button, IconButton, Dialog, DialogTitle, Divider,
    DialogContent, Avatar, Card, CardHeader, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import tempPic from "../../images/default_profile_picture.png"
import arrow from "../../images/connected-arrows.png"

import "./Disconnect.css"

export default function Disconnect() {
    const { connectionId } = useParams()
    const path = useLocation().pathname
    const nagivate = useNavigate()

    const [openPopup, setOpenPopup] = useState(false)
    useEffect(() => {
        if(path === `/connections/${connectionId}/settings`) {
            setOpenPopup(true)
        }
    },[connectionId, path])

    function handlePopupClose() {
        setOpenPopup(false);
        nagivate(`/connections/${connectionId}`)
    };
    
    // DELETE request
    async function removeConnection() {
        try {
            const response = await fetch(`/api/connections/${connectionId}/settings`, {method: "DELETE"})
            if (!response.ok) {
                // eslint-disable-next-line no-throw-literal
                throw {
                    message: "Failed to delete connection", 
                    statusText: response.statusText,
                    status: response.status
                }
            }
            const data =  await response.json()
            console.log("Disconnect successfully with Id:", connectionId)
            nagivate("/connections", {replace: true})
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Dialog open={openPopup} PaperProps={{
            style: {
                width: "600px",
                borderRadius: "30px",
                overflow: "hidden",
            },
        }}>
            <DialogTitle className="pop-up-title-container">
                Connection settings
                <IconButton onClick={handlePopupClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent className="pop-up-content-container">
                <div className="pop-up-content">
                    <Card className="dialog-card">
                        <CardHeader avatar={
                            <Avatar alt="User A profile pic" src={tempPic} />
                        }
                        title="You"
                        subheader="User A username"
                    />
                    </Card>
                    <div className="inactive-arrow">
                        <img alt="arrow" src={arrow}/>
                        <Typography variant="body2" className="inactive">Inactive</Typography>
                    </div>
                    <Card className="dialog-card">
                        <CardHeader avatar={
                            <Avatar alt="User B profile pic"  src={tempPic} />
                        }
                        title="User B name"
                        subheader="User B username"
                    />
                    </Card>
                </div>
                <div className="disconnect-prompt">
                    <Typography variant="body2" component="div">
                        Would you like to disconnect with Nathan?
                    </Typography>
                    <button onClick={removeConnection}>
                        Disconnect
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}