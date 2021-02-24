import express from "express";
import mongoose from "mongoose";

import { comparePassword, encrypt } from "../utils/userUtils.js";
import UserSchema from "../models/userSchema.js";

const router = express.Router();

export const getUsers = async (req, res) => {
  try {
    const users = await UserSchema.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserSchema.findById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username or Password missing" });

  try {
    const user = await UserSchema.findOne({ username });
    if (user) {
      const isCorrect = await comparePassword(password, user.password);
      if (isCorrect) {
        const toReturn = {
          username: user.username,
          email: user.email,
          id: user._id,
        };
        return res
          .status(201)
          .json({ data: toReturn, message: "User successfully logged in" });
      }
    }
    res.status(401).json({ message: "Username or Password is incorrect" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email)
    return res
      .status(400)
      .json({ message: "Username, Email or Password missing" });

  const newUser = new UserSchema({
    username,
    password,
    email,
  });

  try {
    const userExists = await UserSchema.findOne({ username });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });
    const emailExists = await UserSchema.findOne({ email });
    if (emailExists)
      return res.status(400).json({ message: "Email already in use" });

    newUser.password = await encrypt(newUser.password);
    await newUser.save();
    res.status(201).json({ message: "User successfully created" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const  {spotifyUserId} = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);
  
  const updatedUser = { spotifyUserId: spotifyUserId, _id: id };
  console.log(updatedUser);
  await UserSchema.findByIdAndUpdate(id, updatedUser, { new: true });

  res.json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);

  await UserSchema.findByIdAndRemove(id);

  res.json({ message: "user deleted successfully." });
};

export default router;
