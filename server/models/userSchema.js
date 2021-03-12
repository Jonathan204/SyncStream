import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  lat: String,
  lng: String,
  currentSongName: String,
  currentSongLink: String,
  spotifyUserId: String,
  spotifyRefresh: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const UserSchema = mongoose.model("Users", userSchema);

export default UserSchema;
