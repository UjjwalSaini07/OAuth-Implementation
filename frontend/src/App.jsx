import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./Home";
import Dashboard from "./Dashboard";
import RefreshHandler from "./RefreshHandler";
import NotFound from "./Error404";

function App() {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Sync authentication state with localStorage
  useEffect(() => {
    const userInfo = localStorage.getItem("user-info");
    setIsAuthenticated(!!userInfo);
  }, []);

  // Function to handle authentication updates
  const handleAuthentication = (userInfo) => {
    if (userInfo) {
      localStorage.setItem("user-info", JSON.stringify(userInfo));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("user-info");
      setIsAuthenticated(false);
    }
  };

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/login" element={<Home setIsAuthenticated={handleAuthentication} />}/>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
