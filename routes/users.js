const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const userService = require("../services/user.service");

router.get("/me", auth, async (req, res) => {
  const user = await userService.getUser(req.user._id);
  res.send(user);
});

router.post("/", async (req, res) => {
  await userService
    .createUser(req.body)
    .then((user) => {
      const token = user.generateAuthToken();
      res
        .header("x-auth-token", token)
        .send(_.pick(user, ["_id", "name", "email"]));
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
});

module.exports = router;
