import dotenv from "dotenv";
dotenv.config();

const postgresConnectionString = {
  connectionString: process.env.POSTGRES_CONNECTION_STRING,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};

const KNEX_CONFIG = {
  development: {
    client: "pg",
    connection: postgresConnectionString,
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },
  production: {
    client: "pg",
    connection: "",
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },
};

const serverConfig = {
  SERVER_IP: "0.0.0.0",
  SERVER_PORT: process.env.PORT || 3000,
  INFERENCE_TYPE: "native",
};

export default {
  knex: KNEX_CONFIG,
  serverConfig: serverConfig,
};
