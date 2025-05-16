import React from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const FireAuth = () => {
  const navigate = useNavigate();

  const handleAuthSuccess = (user, providerName) => {
    const { displayName, email, photoURL, accessToken } = user;
    const userInfo = {
      name: displayName,
      email,
      image: photoURL,
      token: accessToken,
      authProvider: providerName,
    };

    localStorage.setItem("user-info", JSON.stringify(userInfo));
    setTimeout(() => {
      navigate("/dashboard");
    }, 500);
  };

  const handleAuthError = async (error, provider) => {
    if (error.code === "auth/account-exists-with-different-credential") {
      const email = error.customData?.email;
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods?.includes("google.com")) {
        alert(
          "This email is associated with a Google account. Sign in with Google first."
        );
      } else {
        alert(
          "This email is associated with another provider. Sign in with that provider first."
        );
      }
    } else {
      console.error("Error during sign-in:", error);
      alert("Authentication failed. Please try again.");
    }
  };

  const handleSignIn = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential =
        provider instanceof GoogleAuthProvider
          ? GoogleAuthProvider.credentialFromResult(result)
          : provider instanceof GithubAuthProvider
          ? GithubAuthProvider.credentialFromResult(result)
          : FacebookAuthProvider.credentialFromResult(result);

      const token = credential?.accessToken;

      // Extract provider name and remove ".com" if present
      let providerName = provider.providerId.replace(".com", "");

      handleAuthSuccess({ ...result.user, accessToken: token }, providerName);
    } catch (error) {
      handleAuthError(error, provider);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="relative p-10 sm:p-12 w-full max-w-md text-center rounded-4xl overflow-hidden bg-[#0a0a0a] border border-gray-800 shadow-[0_0_60px_rgba(255,255,255,0.06)]">
        <div className="absolute inset-0 z-0 rounded-3xl pointer-events-none">
          <div className="absolute -inset-[2px] rounded-[inherit] bg-white/10 blur-xl opacity-30 shadow-[0_0_20px_rgba(255,255,255,0.05)]"></div>
        </div>

        <div className="relative z-10">
          <h1 className="text-white text-3xl font-extrabold mb-8 tracking-tight drop-shadow-[0_2px_6px_rgba(255,255,255,0.08)]">
            Sign in with your Socials
          </h1>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => handleSignIn(new GoogleAuthProvider())}
              className="flex items-center justify-center gap-3 w-full bg-white text-black py-3 px-6 rounded-full font-semibold shadow-md hover:shadow-lg hover:-translate-y-[2px] hover:scale-[1.03] transition-all duration-300"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign in with Google
            </button>

            <button
              onClick={() => handleSignIn(new GithubAuthProvider())}
              className="flex items-center justify-center gap-3 w-full bg-[#171717] text-white py-3 px-6 rounded-full font-semibold shadow-md hover:shadow-lg hover:-translate-y-[2px] hover:scale-[1.03] transition-all duration-300"
            >
              <img
                src="https://img.icons8.com/ios-glyphs/30/github.png"
                alt="GitHub"
                className="w-6 h-6 invert"
              />
              Sign in with GitHub
            </button>

            <button
              onClick={() => handleSignIn(new FacebookAuthProvider())}
              className="flex items-center justify-center gap-3 w-full bg-[#0866FF] text-white py-3 px-6 rounded-full font-semibold shadow-md hover:shadow-xl hover:-translate-y-[2px] hover:scale-[1.03] transition-all duration-300"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
              Sign in with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FireAuth;
