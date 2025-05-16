import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleDashBoard from "../components/Dashboard/GoogleDashBoard";
import GithubDashBoard from "../components/Dashboard/GitHubDashBoard";
import FacebookDashBoard from "../components/Dashboard/FacebookDashBoard";

function Dashboard() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user-info");
  let provider = null;
  let userData = null;

  try {
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    provider = parsedUser?.authProvider || null;
    userData = parsedUser || null;
  } catch (error) {
    console.error("Failed to parse 'user-info' from localStorage:", error);
    localStorage.removeItem("user-info");
  }

  console.log("Auth Provider:", provider);

  if (provider === "google") {
    return <GoogleDashBoard userData={userData} />;
  }

  if (provider === "github") {
    return <GithubDashBoard userData={userData} />;
  }

  if (provider === "facebook") {
    return <FacebookDashBoard userData={userData} />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white px-4">
      <div className="bg-[#0d0d0d] p-12 rounded-3xl border border-gray-800 shadow-[0_30px_60px_rgba(0,0,0,0.9)] text-center w-full max-w-md transition-all duration-300">
        <h2 className="text-4xl font-extrabold mb-5 tracking-tight text-white drop-shadow-[0_2px_2px_rgba(255,255,255,0.05)]">
          🔒 Access Restricted
        </h2>
        <p className="text-base sm:text-lg mb-8 text-gray-400 leading-relaxed">
          To access your personalized dashboard, please sign in with your
          preferred provider:
          <span className="text-white font-medium"> Google</span>,
          <span className="text-white font-medium"> GitHub</span>, or
          <span className="text-white font-medium"> Facebook</span>.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-700/50 transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Go to Login →
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
