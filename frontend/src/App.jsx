import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RefreshHandler from "./components/utils/RefreshHandler";
import NotFound from "./components/common/Error404";
import ThirdPartyOAuth from "./components/ThirdPartyAuth/ThirdPartyOAuth";

function App() {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("user-info");
    const authMode = localStorage.getItem("authMode");
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
    return isAuthenticated ? element : <Navigate to="/" />;
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<Home setIsAuthenticated={handleAuthentication} />}/>
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />}/>
          <Route path="/auth0/authentic" element={<ThirdPartyOAuth/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;