import React from "react";
import { Card, CardHeader, CardContent, Typography, Avatar } from "@mui/material";
import profileIcon from "../../images/default profile picture.png"

import './ProfileCard.css'

export default function ProfileCard() {
    return (
        <Card className="profile-card">
            <CardHeader
                avatar={
                    <Avatar 
                        className="profile-card-icon"
                        src={profileIcon} 
                        alt="user icon" 
                        sx={{ width: 80, height: 80 }}
                    />
                }
                title={
                        <span className="prodile-card-name">Nima Sharon</span>
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
                    Second year computer science student. I like going the gym and playing
                    volleyball at drop-in sports. I also like playing games at home.
                </Typography>
                <Typography variant="body2" className="profile-card-subtitle">
                    <strong>Classes</strong>
                </Typography>
                <Typography variant="body2" className="classes-and-clubs-content">
                    <span>CMPT120</span>
                    <span>CMPT225</span>
                    <span>CMPT135</span>
                </Typography>
                <Typography variant="body2" className="profile-card-subtitle">
                    <strong>Clubs</strong>
                </Typography>
                <Typography variant="body2" className="classes-and-clubs-content">
                    <span>SFU Volleyball Club</span>
                    <span>CSSS</span>
                </Typography>
            </CardContent>
        </Card>
    )
}