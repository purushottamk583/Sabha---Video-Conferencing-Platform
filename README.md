# Sabha 🎥

A full-stack, real-time video conferencing platform built with WebRTC, Socket.IO, and the MERN stack. 
Connect with people through peer-to-peer video calls, live chat, and screen sharing — no installation required.

**Live Demo:** [purushottam-sabha-frontend.onrender.com](https://purushottam-sabha-frontend.onrender.com)

---

## Features

- 🎦 **Peer-to-peer video & audio calling** via WebRTC
- 💬 **Real-time in-call chat** with live message sync across participants
- 🖥️ **Screen sharing** support
- 🎙️ **Mic & camera toggle** controls
- 👥 **Multi-participant support** with dynamic peer connection handling
- 🔐 **User authentication** (signup/login)
- 🕘 **Meeting history** — tracks past meetings, participants, and duration per user
- 🔗 **Shareable meeting links** — join any call via a unique room URL
- 📱 **Responsive UI** built with Material UI

---

## Tech Stack

**Frontend**
- React (Vite)
- React Router
- Material UI (MUI)
- Socket.IO Client
- Native WebRTC APIs (`RTCPeerConnection`, `getUserMedia`, `getDisplayMedia`)

**Backend**
- Node.js + Express
- Socket.IO (signaling server)
- MongoDB + Mongoose
- JWT-based authentication

**Deployment**
- Render (separate frontend static site + backend web service)

---

## How It Works

Sabha uses **WebRTC** for direct peer-to-peer media streaming and a lightweight **Socket.IO signaling server** to help peers discover each other and exchange connection information:

1. A user joins a room (identified by the URL path).
2. The signaling server notifies existing participants that a new peer has joined.
3. Peers exchange SDP offers/answers and ICE candidates through the signaling server.
4. Once negotiation completes, video/audio streams flow **directly between peers** — the server only handles signaling, not media.
5. STUN servers help peers discover their public-facing network address for connection setup.

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas account (or local MongoDB instance)
- npm

### Clone the repository
```bash
git clone https://github.com/purushottamk583/Sabha---Video-Conferencing-Platform.git
cd Sabha---Video-Conferencing-Platform
```

### Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=8000
```

Run the backend:
```bash
node app.js
```

### Frontend Setup
```bash
cd Frontend
npm install
```

Update `src/environment.js` to point to your backend URL (defaults to `localhost:8000` for local development).

Run the frontend:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Project Structure

```
Sabha/
├── Backend/
│   ├── Controllers/
│   │   └── socketManager.js      # WebRTC signaling logic
│   ├── Routes/
│   │   └── users.routes.js       # Auth & history API routes
│   ├── Models/
│   ├── app.js                    # Express + Socket.IO entry point
│   └── .env
│
└── Frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── VideoMeet.jsx     # Core video call component
    │   │   ├── LandingPage.jsx
    │   │   ├── Authentication.jsx
    │   │   └── History.jsx
    │   ├── contexts/
    │   │   └── AuthContext.jsx
    │   ├── styles/
    │   └── environment.js        # Backend server URL config
    └── index.html
```

---

## Deployment Notes

This project is deployed as **two separate Render services**:
- A **Web Service** for the Express/Socket.IO backend
- A **Static Site** for the Vite-built React frontend

Since this is a single-page app using client-side routing (React Router), the frontend requires a rewrite rule on Render to serve `index.html` for all paths:

| Source | Destination | Action |
|--------|-------------|--------|
| `/*`   | `/index.html` | Rewrite |

Environment variables (like `MONGO_URI`) are configured directly in the Render dashboard rather than committed to the repository.

---

## Known Limitations

- Uses a **STUN-only** ICE configuration — calls may fail to connect on restrictive networks (e.g., certain corporate/mobile NATs) without a TURN server.
- No recording or transcription support yet.
- Meeting rooms are not password-protected.

---

## Roadmap / Ideas

- [ ] Add a TURN server for more reliable connectivity across networks
- [ ] Room passwords / waiting rooms
- [ ] Recording support
- [ ] Reactions & raised-hand indicators
- [ ] Virtual backgrounds

---

## License

This project is open for learning and personal use. Feel free to fork and build on it.

---

## Author

**Purushottam Kumar**
[GitHub](https://github.com/purushottamk583)
