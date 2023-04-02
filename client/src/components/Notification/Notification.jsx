import React from 'react'
import { Link } from 'react-router-dom'
import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';
import { Box, Paper, Typography, Button } from '@mui/material'

import "./Notification.css";

export default function Notification() {
    return (
        <div className="notification-container">
            <Paper elevation={3} style={{ margin: '4rem', padding: '2rem', borderRadius: '1rem' }}>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                >
                    <Diversity1OutlinedIcon style={{ fontSize: '8rem', color: '#11515c' }} />
                    <Typography variant="h6" color="textSecondary" style={{ maxWidth: '460px' }}>
                        There're no groups chat for you to see yet,
                        click on a group chat to start chatting, 
                        or click on the button to start joining your courses!
                    </Typography>
                    <Link to="/setting/edit-course-enrollment">
                        <Button variant="contained" style={{ backgroundColor: '#11515c'}}>
                            ADD COURSES
                        </Button>
                    </Link>
                </Box>
            </Paper>
        </div>
    )
}

