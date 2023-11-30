import express from "express";
import { config, db } from "../knexfile";
import routes from "./routes/index";
import status from "./configs/status";
import expressSession from "express-session";
import { authenticate } from "./utils/helpers";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");

  next();
});

app.use(
  expressSession({
    secret: "secret",
    resave: false, // don't save to session store unless there was a change in sessioin data
    saveUninitialized: false, // until smth is stored in it, don't create a session
    store: config.sessionStore,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
    },
  })
);

// app.use(authenticate);
app.use("/api/v1", routes);

app.get("/", async (req: any, res: any) => {
  console.log("inside route");

  try {
    const query = db.select("*").from("users");
    const result = await query;

    if (!result || result.length === 0) {
      // If there's no result, send an empty array or an appropriate message
      return res.status(404).json({ message: "No users found" });
    }

    // Send the result as a JSON response
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    // If an error occurs, send an error response
    return res.status(500).json({ error: "Internal server error" });
  }
});

// catch 404
app.use((req: any, res: any, next: any) => {
  res.statusCode = 404;
  res.json(status.getStatus("url_missing"));
});

// check db
const dbSelfCheck = async () => {
  const dbSelfCheckQuery = db.select(db.raw("now()"));
  try {
    const result = await dbSelfCheckQuery;
    console.log("POSTGRES-DATABASE IS UP AND RUNNING");
  } catch (error) {
    console.log("PORSTGRES DB ERROR: ", error);
  }
};
dbSelfCheck();

// global error handler
app.use((err: any, req: any, res: any, next: any) => {
  if (err) {
    console.log(new Date().toISOString(), err);
  }
  if (err.hasOwnProperty("error")) {
    res.json(err);
  } else {
    let err = status.getStatus("generic_fail");
    res.json(err);
  }
});

app.listen(config.serverConfig.SERVER_PORT, () =>
  console.log("listening on port:  ", config.serverConfig.SERVER_PORT)
);
