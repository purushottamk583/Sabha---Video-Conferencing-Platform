import './App.css'
import LandingPage from './pages/LandingPage'
import { Route,  BrowserRouter as Router, Routes } from 'react-router-dom';
import Authentication from './pages/Authentication';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <div className='App'>
       <Router>
        <AuthProvider>
          <Routes>

            <Route path='/' element={<LandingPage />} /> 

            <Route path="/auth" element={<Authentication/>} />
          </Routes>
        </AuthProvider>
       </Router>
    </div>
  );
};

export default App;
