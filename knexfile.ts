import dotenv from "dotenv";
dotenv.config();
import knex from "knex";
import pgSession from "connect-pg-simple";
import session from "express-session";
import path from "path";

const postgresConnectionString = {
  connectionString: process.env.POSTGRES_CONNECTION_STRING,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};

console.log(postgresConnectionString);

const KNEX_CONFIG: any = {
  development: {
    client: "pg",
    connection: postgresConnectionString,
    migrations: {
      directory: path.join(__dirname + "/src/db/migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "/src/db/seeds"),
    },
  },
  production: {
    client: "pg",
    connection: "",
    migrations: {
      directory: __dirname + "./src/configs/enironments/migrations",
    },
    seeds: {
      directory: __dirname + "./src/configs/enironments/seeds",
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

export default KNEX_CONFIG;

export const db = knex(configKnex);
export const config = {
  knex: KNEX_CONFIG,
  serverConfig: serverConfig,
  sessionStore: sessionStore,
};
