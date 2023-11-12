const express = require("express");
const registerRoute = require("./auth/auth");
const loginRoute = require("./auth/auth");
const app = express();
const dotenv = require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", registerRoute);
app.use("/auth", loginRoute);

app.get("/", (req, res) => {
  console.log("inside route");

  res.status(201).json({ recieved: true });
});

const { Client } = require("pg");

const postgresConnectionString = {
  connectionString: process.env.POSTGRES_CONNECTION_STRING,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};

console.log(postgresConnectionString.connectionString);

async function testPostgresConnection() {
  const client = new Client(postgresConnectionString);

  try {
    await client.connect();
    console.log("Connected to PostgreSQL database successfully!");
  } catch (error) {
    console.error("Error connecting to PostgreSQL database:", error.message);
  } finally {
    await client.end();
  }
}

testPostgresConnection();

const port = 3000;

app.listen(port, () => console.log("listening on port :", port));
