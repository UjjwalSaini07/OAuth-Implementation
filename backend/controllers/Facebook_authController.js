import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import jwt from "jsonwebtoken";
import FacebookUser from "../models/facebook.modal.js";

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL:
        process.env.FACEBOOK_CALLBACK_URL ||
        "http://localhost:8080/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await FacebookUser.findOne({ facebookId: profile.id });

        if (!user) {
          user = new FacebookUser({
            facebookId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value || null,
            avatarUrl: profile.photos?.[0]?.value || null,
            accessToken,
          });
          await user.save();
        } else {
          user.accessToken = accessToken;
          user.updatedAt = new Date();
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        console.error("Error in Facebook Strategy:", error);
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await FacebookUser.findById(id);
    done(null, user);
  } catch (error) {
    console.error("Error deserializing user:", error);
    done(error, null);
  }
});

export const facebookAuth = passport.authenticate("facebook", {
  scope: ["email"],
});

export const facebookCallback = (req, res) => {
  passport.authenticate("facebook", (err, user) => {
    if (err) {
      console.error("Error in Passport Callback:", err);
      const isTokenError =
        err.type === "OAuthException" &&
        err.code === 100 &&
        err.subcode === 36009;
      return res.status(isTokenError ? 400 : 500).json({
        status: "error",
        message: isTokenError
          ? "Authorization code has been used or expired. Please try logging in again."
          : "An internal server error occurred.",
      });
    }

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication failed. Please try again.",
      });
    }

    try {
      const token = jwt.sign(
        { id: user._id, facebookId: user.facebookId },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      const userInfo = {
        facebookId: user.facebookId,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        authProvider: "facebook",
      };

      const html = `
                <script>
                    window.opener.postMessage(
                        ${JSON.stringify({ token, user: userInfo })},
                        "http://localhost:5173"
                    );
                    window.close();
                </script>
            `;

      res.send(html);
    } catch (error) {
      console.error("Error generating token:", error);
      res.status(500).json({
        status: "error",
        message: "Authentication succeeded, but token generation failed.",
      });
    }
  })(req, res);
};
