import express from "express";
import mongoose from "mongoose";

import { encrypt } from "../utils/userUtils.js";
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

export const createUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username or Password missing" });

  const newUser = new UserSchema({
    username,
    password,
  });

  try {
    const userExists = await UserSchema.findOne({ username });
    if (!userExists) {
      newUser.password = await encrypt(newUser.password);
      await newUser.save();
      res.status(201).json({ message: "User successfully created" });
    } else {
      res.status(400).json({ message: "User already exists" });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);

  const updatedUser = { creator, title, message, tags, selectedFile, _id: id };

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
