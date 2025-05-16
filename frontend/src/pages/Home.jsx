import React, { useState } from "react";
import NodeAuth from "../components/NodejsAuth/NodeAuth";
import FireAuth from "../components/FireBaseAuth/FireAuth";

const Home = () => {
  const [mode, setMode] = useState("Nodejs-OAuth");

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
  };

  const renderContent = () => {
    switch (mode) {
      case "Nodejs-OAuth":
        return <NodeAuth />;
      case "Firebase-OAuth":
        return <FireAuth />;
      default:
        return <NodeAuth />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex flex-col">
      <header className="w-full flex justify-center py-4 bg-black mt-4 fixed overflow-hidden">
        <div className="flex bg-black rounded-full px-1 py-1 border-2 border-white shadow-md">
          {["Nodejs-OAuth", "Firebase-OAuth"].map((item) => (
            <button
              key={item}
              onClick={() => handleModeChange(item)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out ${
                mode === item
                  ? "bg-white text-black shadow-xl transform scale-105"
                  : "text-white hover:bg-gray-900"
              }`}
            >
              <span>{item}</span>
              {mode === item && (
                <span className="w-2.5 h-2.5 bg-black rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-grow w-full">{renderContent()}</main>
    </div>
  );
};

export default Home;
