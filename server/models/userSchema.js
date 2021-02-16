import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  location: String,
  currentSongName: String,
  currentSongLink: String,
  spotifyUserId: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const UserSchema = mongoose.model("Users", userSchema);

export default UserSchema;
