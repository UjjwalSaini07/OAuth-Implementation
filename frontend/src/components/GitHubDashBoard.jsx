import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GitHubDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('user-info');
    if (data) {
      try {
        setUserInfo(JSON.parse(data));
      } catch (error) {
        console.error("Error parsing user info:", error);
        localStorage.removeItem('user-info');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user-info');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0d1117] border border-white/10 rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.05)] p-8 text-center">
        {userInfo ? (
          <>
            <div className="flex justify-center mb-6">
              <img
                src={userInfo.avatarUrl}
                alt={userInfo.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-white/10 shadow-md hover:shadow-purple-500/30 transition duration-300"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-1 tracking-wide">
              Welcome, <span className="text-purple-500">{userInfo.name}</span>
            </h1>
            <p className="text-gray-400 mb-2">
              <span className="font-medium text-white">GitHub ID:</span> {userInfo.githubId}
            </p>
            {userInfo.email ? (
              <p className="text-gray-400 mb-6">{userInfo.email}</p>
            ) : (
              <p className="text-gray-500 italic mb-6">No public email available</p>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-500/40"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="text-white">
            <h2 className="text-xl font-bold mb-4">Loading user data...</h2>
            <p className="text-gray-400">Please wait or try logging in again.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubDashboard;
