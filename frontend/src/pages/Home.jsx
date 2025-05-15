import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../components/utils/api";

const Home = () => {
  const navigate = useNavigate();

  const handleAuthSuccess = (result) => {
    const { email, name, image } = result.data.user;
    const token = result.data.token;
    const userInfo = { email, name, token, image, authProvider: "google" };
    localStorage.setItem("user-info", JSON.stringify(userInfo));
    navigate("/dashboard");
  };

  const handleAuthError = (error) => {
    console.error("Authentication Error:", error);
  };

  const handleGoogleResponse = async (authResult) => {
    try {
      if (authResult?.code) {
        const result = await googleAuth(authResult.code);
        handleAuthSuccess(result);
      } else {
        throw new Error("Google auth code missing or invalid.");
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const initiateGoogleLogin = useGoogleLogin({
    onSuccess: handleGoogleResponse,
    onError: handleAuthError,
    flow: "auth-code",
  });

  const handleGitHubLogin = () => {
    const authWindow = window.open(
      "http://localhost:5000/auth/github",
      "GitHub Login",
      "width=500,height=600"
    );

    const receiveMessage = (event) => {
      if (event.origin !== "http://localhost:5000") return;

      const { token, user } = event.data;

      if (token && user) {
        const userInfo = { ...user, token, authProvider: "github" };
        localStorage.setItem("user-info", JSON.stringify(userInfo));
        window.removeEventListener("message", receiveMessage);
        navigate("/dashboard");
      } else {
        console.error("Invalid data received from GitHub login:", event.data);
      }
    };

    window.addEventListener("message", receiveMessage);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-[#111] p-8 sm:p-10 rounded-3xl border border-white/10 shadow-[0_0_25px_rgba(255,255,255,0.06)] w-full max-w-sm text-center">
        <h1 className="text-white text-2xl font-bold mb-8 tracking-wide">
          Sign in with your Socials
        </h1>

        <div className="flex flex-col gap-4">
          <button
            onClick={initiateGoogleLogin}
            className="flex items-center justify-center gap-3 w-full bg-white text-black py-3 px-6 rounded-full font-medium shadow-md hover:shadow-xl hover:-translate-y-[1px] transition-all duration-200"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>

          <button
            onClick={handleGitHubLogin}
            className="flex items-center justify-center gap-3 w-full bg-white text-black py-3 px-6 rounded-full font-medium shadow-md hover:shadow-xl hover:-translate-y-[1px] transition-all duration-200"
          >
            <img
              src="https://img.icons8.com/ios-glyphs/30/github.png"
              alt="GitHub"
              className="w-6 h-6"
            />
            Sign in with GitHub
          </button>

          <button
            className="flex items-center justify-center gap-3 w-full bg-white text-black py-3 px-6 rounded-full font-medium shadow-md hover:shadow-xl hover:-translate-y-[1px] transition-all duration-200"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/2048px-Facebook_f_logo_%282021%29.svg.png"
              alt="Facebook"
              className="w-5 h-5"
            />
            Sign in with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
