import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'

export default function LandingPage() {
    const router = useNavigate();

    return (
        <div className="landingPageContainer">

            {/* Background glow */}
            <div className="heroGlow"></div>
            <div className="heroGlowSecondary"></div>

            {/* NAVBAR */}
            <nav className="landingNavbar">
                <div className="navBrand">
                    <div className="brandIcon">
                        S
                    </div>
                    <h1>Sabha</h1>
                </div>

                <div className="navLinks">
                    <p>Features</p>
                    <p>About</p>
                    <p>Security</p>

                    <span className="navDivider"></span>

                    <p
                        onClick={() => {
                            router("/aljk23")
                        }}
                    >
                        Join as Guest
                    </p>

                    <p
                        onClick={() => {
                            router("/auth")
                        }}
                    >
                        Register
                    </p>

                    <button
                        onClick={() => {
                            router("/auth")
                        }}
                        className="navLoginBtn"
                    >
                        Login
                    </button>
                </div>
            </nav>

            {/* HERO SECTION */}
            <main className="landingHero">
                <div className="heroContent">
                    <div className="heroBadge">
                        <span className="statusDot"></span>
                        Secure video communication
                    </div>

                    <h1>
                        Connect with your&nbsp;
                        <span> loved ones.</span>
                    </h1>

                    <p className="heroDescription">
                        Make meaningful connections from anywhere.
                        Video call, share your screen and chat together
                        in one simple and secure platform.
                    </p>

                    <div className="heroActions">
                        <Link
                            to="/auth"
                            className="primaryHeroBtn"
                        >
                            Get Started
                            <span>→</span>
                        </Link>

                        <button
                            className="secondaryHeroBtn"
                            onClick={() => {
                                router("/aljk23")
                            }}
                        >
                            Join as Guest
                        </button>
                    </div>

                    <div className="heroMeta">
                        <div>
                            <span className="metaIcon">✓</span>
                            No installation required
                        </div>

                        <div>
                            <span className="metaIcon">✓</span>
                            HD video calling
                        </div>

                        <div>
                            <span className="metaIcon">✓</span>
                            Screen sharing
                        </div>
                    </div>
                </div>

                {/* PRODUCT PREVIEW */}
                <div className="productPreviewWrapper">
                    <div className="previewGlow"></div>

                    <div className="productPreview">
                        <div className="previewTopBar">
                            <div className="previewBrand">
                                <span className="previewBrandIcon">S</span>
                                Sabha
                            </div>

                            <div className="previewWindowControls">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>

                        <div className="videoPreviewContent">
                            <div className="videoPreviewMain">
                                <img
                                    src="/mobile.png"
                                    alt="Sabha video conferencing"
                                />
                            </div>

                            <div className="previewSidePanel">
                                <div className="sidePanelHeader">
                                    <span>Meeting</span>
                                    <span className="liveBadge">
                                        ● LIVE
                                    </span>
                                </div>

                                <div className="participant">
                                    <div className="participantAvatar">
                                        P
                                    </div>

                                    <div>
                                        <strong>Participants</strong>
                                        <small>Connected</small>
                                    </div>
                                </div>

                                <div className="participant">
                                    <div className="participantAvatar second">
                                        A
                                    </div>

                                    <div>
                                        <strong>Video call</strong>
                                        <small>HD quality</small>
                                    </div>
                                </div>

                                <div className="meetingFeature">
                                    <span>▣</span>
                                    Screen sharing
                                </div>

                                <div className="meetingFeature">
                                    <span>💬</span>
                                    Live chat
                                </div>
                            </div>
                        </div>


                        <div className="previewControls">
                            <button>🎤</button>
                            <button>📹</button>
                            <button>🖥</button>
                            <button>💬</button>

                            <button className="endCall">
                                End Call
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* FEATURES */}
            <section className="featuresSection">
                <div className="featureCard">
                    <div className="featureIcon">◉</div>
                    <h3>HD Video Calls</h3>
                    <p>
                        Crystal-clear video conversations
                        without unnecessary complexity.
                    </p>
                </div>

                <div className="featureCard">
                    <div className="featureIcon">▣</div>
                    <h3>Screen Sharing</h3>
                    <p>
                        Share your screen instantly and
                        collaborate with everyone.
                    </p>
                </div>

                <div className="featureCard">
                    <div className="featureIcon">💬</div>
                    <h3>Live Chat</h3>
                    <p>
                        Send messages while staying connected
                        during your video call.
                    </p>
                </div>
            </section>
        </div>
    )
}