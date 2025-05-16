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
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="relative bg-[#0d0d0d] p-12 rounded-3xl border border-gray-800 shadow-[0_0_40px_rgba(0,191,255,0.15)] text-center w-full max-w-lg overflow-hidden">
        <div className="absolute inset-0 rounded-3xl pointer-events-none z-0">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 blur-2xl opacity-50"></div>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold mb-6 tracking-tight text-white drop-shadow-[0_1px_4px_rgba(0,191,255,0.2)]">
            🔒 Access Restricted
          </h2>
          <p className="text-base sm:text-lg mb-8 text-gray-400 leading-relaxed max-w-sm mx-auto">
            You must sign in using{" "}
            <span className="text-white font-medium">Google</span>,{" "}
            <span className="text-white font-medium">GitHub</span>, or{" "}
            <span className="text-white font-medium">Facebook</span> to access
            the dashboard.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-7 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-cyan-600/40 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            Continue to Login →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
