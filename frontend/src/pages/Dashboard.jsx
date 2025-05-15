import React from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleDashBoard from '../components/Dashboard/GoogleDashBoard';
import GithubDashBoard from '../components/Dashboard/GitHubDashBoard';

function Dashboard() {
    const navigate = useNavigate();

    const storedUser = localStorage.getItem('user-info');
    let provider = null;
    let userData = null;

    try {
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        provider = parsedUser?.authProvider || null;
        userData = parsedUser || null;
    } catch (error) {
        console.error("Failed to parse 'user-info' from localStorage:", error);
        localStorage.removeItem('user-info');
    }

    console.log("Auth Provider:", provider);
    // console.log("User Data:", userData);

    if (provider === 'google') {
        return <GoogleDashBoard userData={userData} />;
    }

    if (provider === 'github') {
        return <GithubDashBoard userData={userData} />;
    }

    return (
        <div className="flex items-center justify-center h-screen bg-black text-white">
            <div className="bg-gray-900 p-10 rounded-2xl shadow-2xl text-center w-full max-w-md">
                <h2 className="text-3xl font-bold mb-4">Access Restricted</h2>
                <p className="text-lg mb-6 text-gray-300">
                    You must log in using Google or GitHub to access the dashboard.
                </p>
                <button
                    onClick={() => navigate('/login')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
