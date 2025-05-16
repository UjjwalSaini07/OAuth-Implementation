import mongoose from "mongoose";

const FacebookUserSchema = new mongoose.Schema(
  {
    facebookId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
    },
    accessToken: {
      type: String,
    },
  },
  { timestamps: true }
);

const FacebookUser = mongoose.model("facebook-Oauth", FacebookUserSchema);

export default FacebookUser;
