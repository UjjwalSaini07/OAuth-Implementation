import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./api";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult.code);
        const { email, name, image } = result.data.user;
        const token = result.data.token;
        const obj = { email, name, token, image };
        localStorage.setItem("user-info", JSON.stringify(obj));
        navigate("/dashboard");
      } else {
        console.log(authResult);
        throw new Error(authResult);
      }
    } catch (e) {
      console.log("Error while Google Login...", e);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-[#111] p-8 sm:p-10 rounded-3xl border border-white/10 shadow-[0_0_25px_rgba(255,255,255,0.06)] w-full max-w-sm text-center">
        <h1 className="text-white text-2xl font-bold mb-8 tracking-wide">
          Sign in with Google
        </h1>
        <button
          onClick={googleLogin}
          className="flex items-center justify-center gap-3 w-full bg-white text-black py-3 px-6 rounded-full font-medium shadow-md hover:shadow-xl hover:-translate-y-[1px] transition-all duration-200"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;
