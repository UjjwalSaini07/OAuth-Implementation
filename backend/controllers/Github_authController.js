import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";
import User from "../models/github.model.js";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const CALLBACK_URL = process.env.GITHUB_CALLBACK_URL || "http://localhost:8080/auth/github/callback";

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
          user = new User({
            githubId: profile.id,
            name: profile.displayName || profile.username,
            email: profile.emails?.[0]?.value || null,
            avatarUrl: profile.photos?.[0]?.value || null,
            accessToken,
          });
          await user.save();
        }

        done(null, user);
      } catch (error) {
        console.error("Error during GitHub authentication:", error);
        done(error, null);
      }
    }
  )
);

// Serialize/deserialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Export authentication handlers
export const githubAuth = passport.authenticate("github");

export const githubCallback = (req, res) => {
  const { user } = req;
  const token = user.accessToken;

  const html = `
    <script>
      window.opener.postMessage(
        ${JSON.stringify({ token, user })},
        "http://localhost:5173"
      );
      window.close();
    </script>
  `;

  res.send(html);
};

export default passport;

// export const githubCallback = (req, res) => {
//   res.status(200).json({
//     message: "GitHub Authentication successful!",
//     user: req.user,
//   });
// };