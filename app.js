const express = require("express");
const authRoute = require("./auth/auth");
const app = express();

app.use(express.json());

app.use("/auth", authRoute);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  console.log("inside route");

  res.status(201).json({ recieved: true });
});

const port = 3000;

app.listen(port, () => console.log("listening on port :", port));
