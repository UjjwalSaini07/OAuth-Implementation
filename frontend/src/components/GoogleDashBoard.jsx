import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('user-info');
    if (data) {
      const userData = JSON.parse(data);
      setUserInfo(userData);
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
      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.05)] p-8 text-center">
        {userInfo && (
          <>
            <div className="flex justify-center mb-6">
              <img
                src={userInfo.image}
                alt={userInfo.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-white/10 shadow-md hover:shadow-red-500/30 transition duration-300"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-1 tracking-wide">
              Welcome, <span className="text-red-500">{userInfo.name}</span>
            </h1>
            <p className="text-gray-400 mb-6">{userInfo.email}</p>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-500/40"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleDashboard;
