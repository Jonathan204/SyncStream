import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  lat: String,
  lng: String,
  songInfo: mongoose.Schema.Types.Mixed,
  spotifyUserId: String,
  spotifyRefresh: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  profilePic: String,
});

const UserSchema = mongoose.model("Users", userSchema);

export default UserSchema;
