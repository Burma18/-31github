import dotenv from "dotenv";
dotenv.config();
import knex from "knex";
import pgSession from "connect-pg-simple";
import session from "express-session";
import path from "path";
// import db from "../../db/migrations";

const postgresConnectionString = {
  connectionString: process.env.POSTGRES_CONNECTION_STRING,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};

console.log(postgresConnectionString.connectionString);
console.log(process.env.POSTGRES_CONNECTION_STRING);

const KNEX_CONFIG: any = {
  development: {
    client: "pg",
    connection: postgresConnectionString,
    migrations: {
      directory: __dirname + "./db/migrations",
    },
    seeds: {
      directory: path.join(process.cwd(), "db", "seeds"),
    },
  },
  production: {
    client: "pg",
    connection: "",
    migrations: {
      directory: __dirname + "../../_db/migrations",
    },
    seeds: {
      directory: __dirname + "../../_db/seeds",
    },
  },
};

const serverConfig = {
  SERVER_IP: "0.0.0.0",
  SERVER_PORT: process.env.PORT || 3000,
  INFERENCE_TYPE: "native",
};

const environment = process.env.NODE_ENV || "development";
const configKnex = KNEX_CONFIG[environment];

const sessionStore = new (pgSession(session))({
  pool: configKnex,
  tableName: "user_sessions",
});

export const db = knex(configKnex);
export const config = {
  knex: KNEX_CONFIG,
  serverConfig: serverConfig,
  sessionStore: sessionStore,
};
