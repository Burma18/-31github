// import dotenv from "dotenv";
// dotenv.config();

// const postgresConnectionString = {
//   connectionString: process.env.POSTGRES_CONNECTION_STRING,
//   host: process.env.POSTGRES_HOST,
//   port: process.env.POSTGRES_PORT,
//   user: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
// };

// module.exports = {
//   development: {
//     client: "pg",
//     connection: postgresConnectionString,
//     migrations: {
//       directory: __dirname + "/db/migrations",
//     },
//     seeds: {
//       directory: __dirname + "/db/seeds",
//     },
//   },
//   production: {
//     client: "pg",
//     connection: "",
//     migrations: {
//       directory: __dirname + "/db/migrations",
//     },
//     seeds: {
//       directory: __dirname + "/db/seeds",
//     },
//   },
// };

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.up = function (knex) {
//     return knex.schema
//       .createTable("users", function (table) {
//         table.increments();
//         table.string("name").notNullable();
//         table.string("email").notNullable();
//         table.timestamp("created_at").defaultTo(knex.fn.now());
//         table.timestamp("updated_at").defaultTo(knex.fn.now());
//       })
//       .createTable("todos", function (table) {
//         table.increments();
//         table.timestamp("created_at").defaultTo(knex.fn.now());
//         table.timestamp("updated_at").defaultTo(knex.fn.now());
//         table.string("name").notNullable();
//         table.boolean("completed").notNullable().defaultTo(false);
//         table.integer("user_id").references("id").inTable("users");
//       });
//   };

//   /**
//    * @param { import("knex").Knex } knex
//    * @returns { Promise<void> }
//    */
//   exports.down = function (knex) {
//     return knex.schema.dropTable("todos").dropTable("users");
//   };

//   /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.seed = async function (knex) {
//     // Deletes ALL existing entries
//     await knex("users").del();
//     await knex("users").insert([
//       { id: 1, name: "Burma", email: "test1@gmail.com" },
//       { id: 1, name: "Bekulan", email: "test2@gmail.com" },
//       { id: 1, name: "Tajira", email: "test3@gmail.com" },
//     ]);
//   };

//   /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.seed = async function (knex) {
//     // Deletes ALL existing entries
//     await knex("todos").del();
//     await knex("todos").insert([
//       { id: 1, title: "go to the gym", user_id: 1 },
//       { id: 2, title: "get the mail", user_id: 3 },
//       { id: 3, title: "buy groceries", user_id: 2 },
//     ]);
//   };
