const express = require("express");
const fs = require("fs");
const { generateHash } = require("../utils/helpers");
const knex = require("../db/knex");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const existingUser = await knex("users").select("*").where("email", email);

  if (existingUser.length > 0) {
    res.status(400).json("There is already a user with this email");
  } else {
    try {
      const hashedPassword = await generateHash(password, 10);
      const userCreated = await knex("users")
        .insert({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashedPassword,
        })
        .returning("*");

      res.status(200).json(userCreated[0]);
    } catch (error) {
      console.error(error);
      res.status(400).json("Error registering user");
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await knex("users").select("*").where("email", email);

    console.log("user :", user);

    if (!user) {
      console.error("No user found");
    }

    const comparison = await bcrypt.compare(password, user[0].password);

    if (!comparison) {
      console.error("passwords didn't match");
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("there was error logging in");
    res.status(404).json("error loggin in");
  }
});

module.exports = router;
