import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    githubId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String },
    avatarUrl: { type: String },
    accessToken: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("github-Oauth", userSchema);

export default User;
