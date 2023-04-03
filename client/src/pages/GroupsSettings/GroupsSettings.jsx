import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Typography, Box } from "@mui/material";
import ChatTopBar from "../../components/ChatTopBar/ChatTopBar";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';

import './GroupsSettings.css'

export default function GroupsSettings() {
    const [linkModalOpen, setLinkModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [leaveModalOpen, setLeaveModalOpen] = useState(false);
    const [isCommunityCreator, setIsCommunityCreator] = useState(false);
    const [inviteID, setInviteID] = useState("LOADING...");
    const [leaveSuccess, setLeaveSuccess] = useState("");
    const [groupName, setGroupName] = useState("");
    const [isGroupInfoObtained, setIsGroupInfoObtained] = useState(false);
    const { groupId } = useParams();
    const [groupDescription, setGroupDescription] = useState("");
    const [communityVisibile, setCommunityVisibile] = useState(true);

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

    function getGroupInfo() {
        if (!isGroupInfoObtained) {
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }

            fetch(`/api/groups/name/${groupId}`, options).then(res => {
                if(res.status === 200) {
                    res.json().then(data => {
                        console.log(data)
                        setGroupName(data[0].group_name)
                    })
                } else {
                    setGroupName("Error getting group name")
                }
            })

            fetch(`/api/groups/description/${groupId}`, options).then(res => {
                if(res.status === 200) {
                    res.json().then(data => {
                        setGroupDescription(data[0].group_description)
                    })
                } else {
                    setGroupDescription("Error getting group description")
                }
            })

            fetch(`/api/community/visibility/${groupId}`, options).then(res => {
                if(res.status === 200) {
                    res.json().then(data => {
                        console.log(data)
                        (data[0].visibility === "public") ? setCommunityVisibile(true) : setCommunityVisibile(false)
                    })
                } else {
                    //setCommunityVisibile("Error getting community visibility")
                }
            })

            setIsGroupInfoObtained(true);
        }
    }

    useEffect(() => {
        getGroupInfo();
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

    const handleEditModalOpen = () => {
        setEditModalOpen(true);
    }

    const handleEditModalClose = () => setEditModalOpen(false);

    const handleLeaveModalOpen = () => {
        handleLeaveGroup();
        setLeaveModalOpen(true);
    }
    const handleLeaveModelClose = () => setLeaveModalOpen(false);
    
    function handleDeleteCommunity() {
        // TODO: Implement backend to delete community
        console.log("TODO: Delete community clicked. Implement query");
    }

    const handleSwitchChange = (event) => {
        setCommunityVisibile(event.target.checked)
    }

    function handleSaveButton() {
        // TODO: query to make all the changes
        console.log("TODO: Save button clicked. Query needs to be ran")
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

    const AntSwitch = styled(Switch)(({ theme }) => ({
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
        '&:active': {
          '& .MuiSwitch-thumb': {
            width: 15,
          },
          '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
          },
        },
        '& .MuiSwitch-switchBase': {
          padding: 2,
          '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              opacity: 1,
              backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
          },
        },
        '& .MuiSwitch-thumb': {
          boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
          width: 12,
          height: 12,
          borderRadius: 6,
          transition: theme.transitions.create(['width'], {
            duration: 200,
          }),
        },
        '& .MuiSwitch-track': {
          borderRadius: 16 / 2,
          opacity: 1,
          backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
          boxSizing: 'border-box',
        },
      }));

    return (
        <>
            <ChatTopBar />
            <div className='groups-settings-container'>
                <Button sx={{ml: 4, mt: 4, display: "block"}} variant="contained" onClick={handleLinkModalOpen}>Get Invite Link</Button>
                {isCommunityCreator && <Button sx={{ml: 4, mt: 4, display: "block"}} variant="contained" onClick={handleEditModalOpen}>Edit Community</Button>}
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
                open={editModalOpen}
                onClose={handleEditModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Community
                    </Typography>
                    <TextField
                        id="outlined-controlled"
                        label="Group Name"
                        value={groupName}
                        onChange={(event) => {
                            setGroupName(event.target.value);
                        }}
                        sx={{width: 400, mt: 3}}
                    />
                    <TextField
                        id="outlined-controlled"
                        label="Group Description"
                        value={groupDescription}
                        onChange={(event) => {
                            setGroupDescription(event.target.value);
                        }}
                        sx={{width: 400, mt: 3, mb: 3}}
                    />
                    <Typography variant="body2" sx={{mb: 1, color: "#7f7f7f"}}>Group Visibility</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography>Private</Typography>
                        <AntSwitch onClick={handleSwitchChange} checked={communityVisibile} inputProps={{ 'aria-label': 'ant design' }} />
                        <Typography>Public</Typography>
                    </Stack>
                    <Button sx={{ml: 55, mt: 4, display: "block"}} variant="contained" onClick={handleSaveButton}>Save</Button>
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