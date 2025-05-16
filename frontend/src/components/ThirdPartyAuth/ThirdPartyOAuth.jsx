import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const ThirdPartyOAuth = () => {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
  } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-t-transparent border-gray-600 rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-300 tracking-wide">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  }
  console.log("Authentication: " + isAuthenticated);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 gap-6">
      {!isAuthenticated ? (
        <h2
          className="text-white text-4xl font-extrabold tracking-wide mb-6"
          style={{
            textShadow: `
              0 0 5px rgba(255,255,255,0.7),
              0 0 10px rgba(255,255,255,0.5),
              0 0 20px rgba(255,255,255,0.3)
            `,
          }}
        >
          Auth0 OAuth Authentication
        </h2>
      ):(
        <></>
      )}
      <Card className="relative p-10 sm:p-12 w-full max-w-md text-center rounded-4xl overflow-hidden bg-[#0a0a0a] border border-gray-800 shadow-[0_0_60px_rgba(255,255,255,0.06)]">
        <div className="absolute inset-0 z-0 rounded-3xl pointer-events-none">
          <div className="absolute -inset-[2px] rounded-[inherit] bg-white/10 blur-xl opacity-30 shadow-[0_0_20px_rgba(255,255,255,0.05)]"></div>
        </div>

        <div className="relative z-10">
          <CardHeader>
            <CardTitle className="text-white text-3xl font-extrabold mb-8 tracking-tight drop-shadow-[0_2px_6px_rgba(255,255,255,0.08)]">
              {isAuthenticated ? "Welcome Back!" : "Sign in with your Socials"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isAuthenticated ? (
              <div className="space-y-6">
                <div className="text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-lg rounded-full h-32 w-32 mx-auto"></div>
                  {user.picture && (
                    <img
                      src={user.picture}
                      alt={`Profile picture of ${user.name}`}
                      className="w-32 h-32 mx-auto rounded-full shadow-lg border-4 border-gray-800 relative z-10"
                    />
                  )}
                  <h3 className="text-2xl font-extrabold text-white mt-4 drop-shadow-md">
                    Hello, {user.name}!
                  </h3>
                  {user.email && (
                    <p className="text-base text-gray-300 mt-2">
                      <span className="font-semibold text-white">Email:</span> {user.email}
                    </p>
                  )}
                  {user.nickname && (
                    <p className="text-base text-gray-300 mt-1">
                      <span className="font-semibold text-white">Nickname:</span> {user.nickname}
                    </p>
                  )}
                  {user.updated_at && (
                    <p className="text-sm text-gray-500 mt-2 italic">
                      Last updated on {new Date(user.updated_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white py-3 px-6 rounded-full font-bold shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                className="flex items-center justify-center gap-3 w-full bg-white hover:bg-grey-400 text-black py-3 px-6 rounded-full font-semibold shadow-md hover:shadow-lg hover:-translate-y-[2px] hover:scale-[1.03] transition-all duration-300"
                onClick={() => loginWithRedirect()}
              >
                <img
                  src="https://cdn.worldvectorlogo.com/logos/microsoft-authenticator.svg"
                  alt="Provider"
                  className="w-5 h-5"
                />
                Login with Third Party AppProvider
              </Button>
            )}
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ThirdPartyOAuth;