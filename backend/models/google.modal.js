import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    image: { type: String },
    accessToken: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("google-Oauth", userSchema);

export default User;
