const express = require("express");
const fs = require("fs");
const { generateSalt, generateHash, comparePW } = require("../utils/helpers");
const path = require("path");
const router = express.Router();
const bcrypt = require("bcrypt");

let users = [];

const filePath = path.join(__dirname, "..", "data", "data.txt");

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const hash = await generateHash(password, 10, (err, result) => {
    if (err) {
      console.error("error hashing");
      return;
    }
  });

  try {
    const usersFromFile = await fs.promises.readFile(filePath, "utf-8");

    users = JSON.parse(usersFromFile);

    const user = { id: users.length + 1, firstName, lastName, email, hash };

    users.push(user);

    await fs.promises.writeFile(filePath, JSON.stringify(users));
    console.log(" successfully written");
  } catch (error) {
    console.error(error);
  }

  try {
    const userFromFile = await fs.promises.readFile(filePath, "utf-8");
    console.log("users from readFile :", userFromFile);
  } catch (error) {
    console.error(error);
  }

  res.status(201).json(true);
});

router.post("/login", async (req, res) => {
  try {
    const usersFromFile = await fs.promises.readFile(filePath, "utf-8");

    parsedUsers = JSON.parse(usersFromFile);

    console.log("length :", parsedUsers.length);

    const { email, password } = req.body;

    const user = parsedUsers.find((u) => u.email === email);

    console.log("user :", user);

    if (!user) {
      console.error("No user found");
    }

    const comparison = await bcrypt.compare(password, user.hash);

    if (!comparison) {
      console.error("passwords didn't match");
    }
  } catch (error) {}

  res.status(201).json(true);
});

module.exports = router;
