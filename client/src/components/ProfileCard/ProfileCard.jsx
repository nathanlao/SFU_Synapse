import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, Typography, Avatar } from "@mui/material";
import profileIcon from "../../images/default_profile_picture.png"

import './ProfileCard.css'
import { useParams } from "react-router-dom";

export default function ProfileCard() {

    const { groupId } = useParams()
    const [unconnectedMembers, setUnconnectedMembers] = useState([])
    
    useEffect(() => {
        async function fetchUnconnectedGroupMembers() {
            try {
                const response = await fetch(`/api/groups/discover/${groupId}`)
                if (!response.ok) {
                    // eslint-disable-next-line no-throw-literal
                    throw {
                        message: "Failed to fetch community info", 
                        statusText: response.statusText,
                        status: response.status
                    }
                }
                const data = await response.json()
                setUnconnectedMembers(data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchUnconnectedGroupMembers()
    }, [])

    console.log(unconnectedMembers)

    const profileCardEl = unconnectedMembers.map(unconnectedMember => {
        return (
            <Card className="profile-card" key={unconnectedMember.user_id}>
                <CardHeader
                    avatar={
                        <Avatar 
                            className="profile-card-icon"
                            src={unconnectedMember.photo} 
                            alt="user icon" 
                            sx={{ width: 80, height: 80 }}
                        />
                    }
                    title={
                            <span className="prodile-card-name">{`${unconnectedMember.first_name} ${unconnectedMember.last_name}`}</span>
                    }
                    subheader={
                        <div className="profile-card-hashtags">
                            <span>#volleyball</span>
                            <span>#cs</span>
                            <span>#secondyear</span>
                            <span>#volrant</span>
                        </div>
                    }
                />
                <CardContent className="profile-card-content">
                    <Typography variant="body2" className="profile-card-bio">
                        {unconnectedMember.bio}
                    </Typography>
                    <Typography variant="body2" className="profile-card-subtitle">
                        <strong>Classes</strong>
                    </Typography>
                    <Typography variant="body2" className="classes-and-clubs-content">
                        <span>CMPT120</span>
                    </Typography>
                    <Typography variant="body2" className="profile-card-subtitle">
                        <strong>Clubs</strong>
                    </Typography>
                    <Typography variant="body2" className="classes-and-clubs-content">
                        <span>CSSS</span>
                    </Typography>
                </CardContent>
            </Card>
        )
    })

    return (
        <>
            {profileCardEl}
        </>
    )
}