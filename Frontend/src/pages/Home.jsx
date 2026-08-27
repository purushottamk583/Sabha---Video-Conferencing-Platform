import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';
import "../styles/Home.css";


function HomeComponent() {


    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");


    const {addToUserHistory} = useContext(AuthContext);
    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    return (
        <div className="sabhaHomePage">

            <div className="navBar">

                <div className="homeBrand">
                    <div className="brandLogo">S</div>
                    <h2>Sabha</h2>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                        onClick={() => {
                            navigate("/history")
                        }}
                        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                    >
                        <IconButton>
                            <RestoreIcon />
                        </IconButton>
                        <p>History</p>
                    </div>

                    <Button onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/auth")
                    }}>
                        Logout
                    </Button>
                </div>


            </div>


            <div className="meetContainer">
                <div className="leftPanel">

                    <div className="homeBadge">
                        <span></span>
                        Secure video communication
                    </div>

                    <h1>
                        Connect with your
                        <span> loved ones.</span>
                    </h1>

                    <p className="homeDescription">
                        Join a video meeting from anywhere. Connect with your
                        friends, classmates and loved ones through secure video,
                        screen sharing and live chat.
                    </p>

                    <div className="meetingJoinBox">

                        <div className="meetingInput">
                            <TextField
                                onChange={e => setMeetingCode(e.target.value)}
                                id="outlined-basic"
                                label="Meeting Code"
                                variant="outlined"
                            />
                        </div>

                        <Button
                            onClick={handleJoinVideoCall}
                            variant="contained"
                            className="joinButton"
                        >
                            Join Meeting →
                        </Button>

                    </div>

                    <div className="homeFeatures">

                        <div>
                            <span>✓</span>
                            HD Video Calls
                        </div>

                        <div>
                            <span>✓</span>
                            Screen Sharing
                        </div>

                        <div>
                            <span>✓</span>
                            Live Chat
                        </div>

                    </div>

                </div>


                <div className="rightPanel">
                    <div className="visualGlow"></div>

                    <div className="visualCard">
                        <img src="/logo3.png" alt="Sabha video meeting" />
                    </div>

                    <div className="floatingCard floatingCardOne">
                        <span>●</span>
                        HD Video
                    </div>

                    <div className="floatingCard floatingCardTwo">
                        <span>✦</span>
                        Screen Share
                    </div>
                </div>
            </div>
        </div>
    )
}


export default withAuth(HomeComponent)