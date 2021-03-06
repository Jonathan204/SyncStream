import express from "express";

import {
  getUsers,
  getUser,
  getUserSpotify,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  refreshSpotify,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/refresh/:id", refreshSpotify);
router.get("/:id", getUser);
router.get("/spotify/:id", getUserSpotify);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);

export default router;
