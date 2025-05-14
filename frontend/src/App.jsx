import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from './Dashboard';
import GoogleLogin from './GoogleLogin';
import RefreshHandler from './RefreshHandler';
import NotFound from './NotFound';

function App() {
    const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const PrivateRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/login" />;
    };

    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <BrowserRouter>
                <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
                <Routes>
                    <Route path="/login" element={<GoogleLogin />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;
