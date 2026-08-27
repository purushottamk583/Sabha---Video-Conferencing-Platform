import * as React from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "../styles/Authentication.css";


const defaultTheme = createTheme();


export default function Authentication() {

    const router = useNavigate();
    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [name, setName] = React.useState();
    const [error, setError] = React.useState();
    const [message, setMessage] = React.useState();
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {

        try {
            if (formState === 0) {
                let result = await handleLogin(username, password);
            }

            if (formState === 1) {
                let result = await handleRegister(
                    name,
                    username,
                    password
                )

                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("");
                setFormState(0);
                setPassword("");
            }
        } catch (err) {
            let message = err.response?.data?.message || "Something went wrong";
            setError(message);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <div className="authPage">
                <CssBaseline />

                <nav className="landingNavbar authNavbar">
                    <div className="navBrand">
                        <div className="brandIcon">S</div>
                        <h1>Sabha</h1>
                    </div>

                    <div className="navLinks">
                        <p onClick={() => router("/")}>Features</p>
                        <p onClick={() => router("/")}>About</p>
                        <p onClick={() => router("/")}>Security</p>
                        <span className="navDivider"></span>
                        <p onClick={() => router("/aljk23")}>Join as Guest</p>
                    </div>
                </nav>

                <div className="authMain">

                {/* =================================================
                    LEFT BRAND / INFORMATION SECTION
                ================================================= */}

                <div className="authBrandSection">
                    <div className="authBrandContent">
                        {/* Main heading */}

                        <div className="authIntro">
                            <div className="authSmallBadge">
                                <span></span>
                                Secure communication
                            </div>


                            <h1>
                                Stay connected.
                                <br />
                                <span>Stay closer.</span>
                            </h1>
                            <p>
                                Connect with your loved ones from
                                anywhere. Make video calls, share your
                                screen and chat together with Sabha.
                            </p>
                        </div>


                        {/* Features */}

                        <div className="authFeatures">
                            <div className="authFeature">
                                <div className="authFeatureIcon">
                                    ◉
                                </div>

                                <div>
                                    <h3>
                                        HD Video Calls
                                    </h3>
                                    <p>
                                        Clear and reliable video
                                        communication.
                                    </p>
                                </div>
                            </div>


                            <div className="authFeature">
                                <div className="authFeatureIcon">
                                    ▣
                                </div>

                                <div>
                                    <h3>
                                        Screen Sharing
                                    </h3>
                                    <p>
                                        Share your screen instantly
                                        with everyone.
                                    </p>
                                </div>
                            </div>


                            <div className="authFeature">
                                <div className="authFeatureIcon">
                                    💬
                                </div>
                                <div>
                                    <h3>
                                        Live Chat
                                    </h3>
                                    <p>
                                        Talk and send messages while
                                        staying on the call.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="authFooterText">
                            <span>●</span>
                            Simple. Secure. Connected.
                        </div>
                    </div>
                </div>



                {/* =================================================
                    AUTHENTICATION SECTION
                ================================================= */}

                <div className="authFormSection">
                    <div className="authCard">

                        {/* Heading */}
                        <div className="authHeading">
                            <h2>
                                {formState === 0
                                    ? "Welcome back"
                                    : "Create your account"
                                }
                            </h2>
                            <p>
                                {formState === 0
                                    ? "Sign in to continue to Sabha."
                                    : "Join Sabha and start connecting."
                                }
                            </p>
                        </div>

                        {/* Sign in / Sign up switch */}
                        <div className="authTabs">
                            <button
                                type="button"
                                className={
                                    formState === 0
                                        ? "authTab active"
                                        : "authTab"
                                }

                                onClick={() => {
                                    setFormState(0);
                                    setError("");
                                }}
                            >
                                Sign In
                            </button>

                            <button
                                type="button"
                                className={
                                    formState === 1
                                        ? "authTab active"
                                        : "authTab"
                                }

                                onClick={() => {
                                    setFormState(1);
                                    setError("");
                                }}
                            >
                                Sign Up
                            </button>
                        </div>


                        {/* FORM */}
                        <Box
                            component="form"
                            noValidate
                            className="authForm"
                        >
                            {/* FULL NAME */}
                            {formState === 1 && (
                                <div className="authInputGroup">
                                    <label>
                                        Full Name
                                    </label>

                                    <TextField
                                        required
                                        fullWidth
                                        id="name"
                                        name="name"
                                        placeholder="Enter your full name"
                                        value={name || ""}
                                        autoFocus
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="sabhaTextField"
                                    />
                                </div>
                            )}

                            {/* USERNAME */}
                            <div className="authInputGroup">
                                <label>
                                    Username
                                </label>

                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    name="username"
                                    placeholder="Enter your username"
                                    value={username || ""}
                                    autoFocus={formState === 0}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }

                                    className="sabhaTextField"
                                />
                            </div>

                            {/* PASSWORD */}
                            <div className="authInputGroup">
                                <div className="passwordLabel">
                                    <label>
                                        Password
                                    </label>

                                    {formState === 0 && (
                                        <span>
                                            Forgot password?
                                        </span>
                                    )}
                                </div>

                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    placeholder="Enter your password"
                                    value={password || ""}
                                    type="password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }

                                    id="password"
                                    className="sabhaTextField"
                                />
                            </div>

                            {/* ERROR */}
                            {error && (
                                <div className="authError">
                                    {error}
                                </div>
                            )}

                            {/* LOGIN / REGISTER */}
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                className="authSubmitBtn"
                                onClick={handleAuth}
                            >
                                {formState === 0
                                    ? "Sign In"
                                    : "Create Account"
                                }
                                <span>
                                   →
                                </span>
                            </Button>

                            {/* SWITCH TEXT */}
                            <div className="authSwitchText">
                                {formState === 0
                                    ? "Don't have an account?"
                                    : "Already have an account?"
                                }
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFormState(
                                            formState === 0 ? 1 : 0
                                        );
                                        setError("");
                                    }}
                                >
                                    {formState === 0
                                        ? "Sign up"
                                        : "Sign in"
                                    }
                                </button>
                            </div>
                        </Box>

                        {/* Divider */}
                        <div className="authDivider">
                            <span></span>
                            <p>
                                OR
                            </p>
                            <span></span>
                        </div>

                        {/* Social buttons */}
                        <div className="socialButtons">
                            <button
                                type="button"
                                className="socialBtn"
                            >
                                <span className="googleIcon">
                                    G
                                </span>
                                Continue with Google
                            </button>
                            <button
                                type="button"
                                className="socialBtn"
                            >
                                <span className="guestIcon">
                                    →
                                </span>
                                Continue as Guest
                            </button>
                        </div>

                        {/* Bottom */}
                        <div className="authSecurityText">
                            🔒 Your connection is secure
                        </div>
                    </div>
                </div>

                </div>

                <footer className="landingFooter authFooter">
                    <div className="footerContainer">
                        <div className="footerTop">
                            <div className="footerBrandInfo">
                                <div className="navBrand">
                                    <div className="brandIcon">S</div>
                                    <h1>Sabha</h1>
                                </div>
                                <p className="footerDescription">
                                    Connect effortlessly with high-quality video calls, screen sharing, and real-time chat.
                                </p>
                            </div>

                            <div className="footerNavGrid">
                                <div className="footerColumn">
                                    <h4>Product</h4>
                                    <p onClick={() => router("/")}>Features</p>
                                    <p onClick={() => router("/")}>Security</p>
                                    <p>Enterprise</p>
                                </div>
                                <div className="footerColumn">
                                    <h4>Account</h4>
                                    <p onClick={() => router("/auth")}>Login</p>
                                    <p onClick={() => router("/auth")}>Register</p>
                                    <p onClick={() => router("/aljk23")}>Join as Guest</p>
                                </div>
                                <div className="footerColumn">
                                    <h4>Company</h4>
                                    <p>About Us</p>
                                    <p>Privacy Policy</p>
                                    <p>Terms of Service</p>
                                </div>
                            </div>
                        </div>

                        <div className="footerBottom">
                            <p>© {new Date().getFullYear()} Sabha. All rights reserved.</p>
                            <div className="footerSocials">
                                <span>GitHub</span>
                                <span>Twitter</span>
                                <span>LinkedIn</span>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>


            <Snackbar
                open={open}
                autoHideDuration={3000}
                message={message}
                onClose={() => setOpen(false)}
            />
        </ThemeProvider>
    );
}