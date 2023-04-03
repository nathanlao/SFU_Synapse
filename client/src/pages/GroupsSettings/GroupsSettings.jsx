import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box } from "@mui/material";
import ChatTopBar from "../../components/ChatTopBar/ChatTopBar";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import './GroupsSettings.css'

export default function GroupsSettings() {
    const [linkModalOpen, setLinkModalOpen] = useState(false);
    const [leaveModalOpen, setLeaveModalOpen] = useState(false);
    const [isCommunityCreator, setIsCommunityCreator] = useState(false);
    const [inviteID, setInviteID] = useState("LOADING...");
    const [leaveSuccess, setLeaveSuccess] = useState("");
    const { groupId } = useParams();

    function checkIfCommunityCreator() {
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }

        fetch(`/api/community/creator/${groupId}`, options).then(res => {
            if(res.status === 200) {
                res.json().then(data => {
                    (data.length === 0) ? setIsCommunityCreator(false) : setIsCommunityCreator(true)
                })
            } else {
                setIsCommunityCreator(false)
            }
        })
    }

    useEffect(() => {
        checkIfCommunityCreator();
    })

    function handleLeaveGroup() {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }

        fetch(`/api/groups/leave/${groupId}`, options).then(res => {
            if(res.status === 200) {
                res.json().then(data => {
                    data.affectedRows >= 1 ? setLeaveSuccess("Success") : setLeaveSuccess("Fail")
                })
            } else {
                setLeaveSuccess("Fail")
            }
        })
    }

    function getGroupInviteID() {
        let groupUUID = "ERROR"
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }

        fetch(`/api/groups/invite/${groupId}`, options).then(res => {
            if(res.status === 200) {
                res.json().then(data => {
                    setInviteID(data[0].group_id);
                })
            } else {
                setInviteID("INVITE-ERROR")
            }
        })
    }
    const handleLinkModalOpen = () => {
        getGroupInviteID();
        setLinkModalOpen(true);
    }
    const handleLinkModelClose = () => setLinkModalOpen(false);

    const handleLeaveModalOpen = () => {
        handleLeaveGroup();
        setLeaveModalOpen(true);
    }
    const handleLeaveModelClose = () => setLeaveModalOpen(false);
    
    function handleDeleteCommunity() {
        // TODO: Implement backend to delete community
        console.log("Delete community clicked");
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <ChatTopBar />
            <div className='groups-settings-container'>
                <Button sx={{ml: 4, mt: 4, display: "block"}} variant="contained" onClick={handleLinkModalOpen}>Get Invite Link</Button>
                {!isCommunityCreator ? <Button sx={{ml: 4, mt: 4, background: "#D30000", "&:hover": {backgroundColor: "#B30000" }}} variant="contained" onClick={handleLeaveModalOpen}>Leave Group</Button> :
                <Button sx={{ml: 4, mt: 4, background: "#D30000", "&:hover": {backgroundColor: "#B30000" }}} variant="contained" onClick={handleDeleteCommunity}>Delete Community</Button> 
                }
            </div>
            <Modal
                open={linkModalOpen}
                onClose={handleLinkModelClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Invite Link
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <input className="url-input" readOnly value={"http://" + window.location.href.split("/")[2] + "/invite/" + inviteID}>
                        </input>
                    </Typography>
                </Box>
            </Modal>
            <Modal
                open={leaveModalOpen}
                onClose={handleLeaveModelClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Leave Group
                    </Typography>
                    {leaveSuccess === "Success" ? <Typography id="modal-modal-description" sx={{ mt: 2 }}>You have left the group.</Typography> :
                    leaveSuccess === "Fail" ? <Typography id="modal-modal-description" sx={{ mt: 2 }}>Unable to leave group. You may not be a member of this group.</Typography> :
                    null
                    }
                </Box>
            </Modal>
        </>
    )
}