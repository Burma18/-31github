import express from "express";
const app = express();
import { config, db } from "../src/configs/enironments/env";
import routes from "./routes/index";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");

  next();
});

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

// app.get("/todos", async (req, res) => {
//   try {
//     const data = await knex.select("*").from("todos");
//     res.status(200).json(data);
//   } catch (error) {
//     console.error("error fetching data :", error);
//   }
// });

// app.post("/todos", async (req, res) => {
//   try {
//     const newTodo = await knex("todos")
//       .insert({
//         title: "finish 31github challenge",
//         user_id: 1,
//       })
//       .returning("*"); // Use 'returning' to get the inserted row

//     res.status(200).json(newTodo[0]); // Return the first element of the returned array
//   } catch (error) {
//     console.error("error creating todo :", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.put("/todos/:id", async (req, res) => {
//   try {
//     const todo = await knex("todos")
//       .where("id", req.params.id)
//       .update({
//         title: req.body.title,
//         completed: req.body.completed,
//       })
//       .returning("*");

//     res.status(200).json(todo[0]);
//   } catch (error) {
//     console.error("error updating todos :", error);
//   }
//   res.status(500).json({ error: "Internal Server Error" });
// });

// app.delete("/todos/:id", async (req, res) => {
//   try {
//     const deletedTodo = await knex("todos")
//       .where("id", req.params.id)
//       .del()
//       .returning("*");

//     res.status(200).json(deletedTodo[0]);
//   } catch (error) {
//     console.error("error updating todos :", error);
//   }
//   res.status(500).json({ error: "Internal Server Error" });
// });

// app.get("/todos-user/:id", async (req, res) => {
//   try {
//     const todosOfUser = await knex
//       .from("todos")
//       .innerJoin("users", "todos.user_id", "users.id")
//       .where("todos.user_id", req.params.id);

//     res.send(todosOfUser);
//   } catch (error) {
//     console.error("error updating todos :", error);
//   }
//   res.status(500).json({ error: "Internal Server Error" });
// });

// const { Client } = require("pg");

// const postgresConnectionString = {
//   connectionString: process.env.POSTGRES_CONNECTION_STRING,
//   host: process.env.POSTGRES_HOST,
//   port: process.env.POSTGRES_PORT,
//   user: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
// };

// console.log(postgresConnectionString.connectionString);

// async function testPostgresConnection() {
//   const client = new Client(postgresConnectionString);

//   try {
//     await client.connect();
//     console.log("Connected to PostgreSQL database successfully!");
//   } catch (error) {
//     console.error("Error connecting to PostgreSQL database:", error.message);
//   } finally {
//     await client.end();
//   }
// }

// testPostgresConnection();

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

app.listen(config.serverConfig.SERVER_PORT, () =>
  console.log("listening on port 3000")
);
