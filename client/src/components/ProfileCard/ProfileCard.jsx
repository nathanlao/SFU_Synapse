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

    const profileCardEl = unconnectedMembers.map(unconnectedMember => {
        return (
            <Card className="profile-card" key={unconnectedMember.user.user_id}>
                <CardHeader
                    avatar={
                        <Avatar 
                            className="profile-card-icon"
                            src={unconnectedMember.user.photo} 
                            alt="user icon" 
                            sx={{ width: 80, height: 80 }}
                        />
                    }
                    title={
                            <span className="prodile-card-name">{`${unconnectedMember.user.first_name} ${unconnectedMember.user.last_name}`}</span>
                    }
                    subheader={
                        <div className="profile-card-hashtags">
                            {unconnectedMember.user.username}
                        </div>
                    }
                />
                <CardContent className="profile-card-content">
                    <Typography variant="body2" className="profile-card-bio">
                        {unconnectedMember.user.bio}
                    </Typography>
                    <Typography variant="body2" className="profile-card-subtitle">
                        <strong>Classes</strong>
                    </Typography>
                    <Typography variant="body2" className="classes-and-clubs-content">
                        {unconnectedMember.courses.map(course => (
                            <span key={course.group_name}>{course.group_name}</span>
                        ))}
                    </Typography>
                    <Typography variant="body2" className="profile-card-subtitle">
                        <strong>Clubs</strong>
                    </Typography>
                    <Typography variant="body2" className="classes-and-clubs-content">
                        {unconnectedMember.communities.map(community => (
                            <span key={community.group_name}>{community.group_name}</span>
                        ))}
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