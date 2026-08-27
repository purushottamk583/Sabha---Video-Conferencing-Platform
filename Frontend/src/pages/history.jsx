import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, IconButton, Button, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TagIcon from '@mui/icons-material/Tag';

import styles from '../styles/history.module.css';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                // Handle error or show notification
            }
        };

        fetchHistory();
    }, [getHistoryOfUser]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    return (
        <div className={styles.historyContainer}>
            {/* Navbar */}
            <nav className={styles.navbar}>
                <div className={styles.navBrand} onClick={() => routeTo('/home')}>
                    <span className={styles.logoBadge}>S</span>
                    <h2>Sabha</h2>
                </div>
                <Button 
                    variant="outlined" 
                    startIcon={<HomeIcon />} 
                    onClick={() => routeTo('/home')}
                    className={styles.homeBtn}
                >
                    Back to Home
                </Button>
            </nav>

            {/* Main Content Area */}
            <Container maxWidth="lg" className={styles.contentArea}>
                <div className={styles.headerSection}>
                    <h1>Meeting History</h1>
                    <p>View your past video calls and room codes</p>
                </div>

                {meetings.length !== 0 ? (
                    <div className={styles.cardGrid}>
                        {meetings.map((e, i) => (
                            <Card key={i} className={styles.historyCard} variant="outlined">
                                <CardContent className={styles.cardContent}>
                                    <div className={styles.cardHeader}>
                                        <div className={styles.iconWrapper}>
                                            <VideoCallIcon />
                                        </div>
                                        <Typography variant="h6" className={styles.meetingCode}>
                                            <TagIcon fontSize="small" /> {e.meetingCode}
                                        </Typography>
                                    </div>
                                    <div className={styles.cardDetails}>
                                        <Typography className={styles.dateText}>
                                            <CalendarTodayIcon fontSize="small" /> {formatDate(e.date)}
                                        </Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <VideoCallIcon className={styles.emptyIcon} />
                        <h3>No Meeting History Found</h3>
                        <p>Your past scheduled or joined meetings will appear here.</p>
                        <Button 
                            variant="contained" 
                            onClick={() => routeTo('/home')}
                            className={styles.actionBtn}
                        >
                            Return Home
                        </Button>
                    </div>
                )}
            </Container>
        </div>
    );
}