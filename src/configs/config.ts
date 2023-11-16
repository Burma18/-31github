import knex from "knex";

const environment = process.env.NODE_ENV || "development";
const config = require("./enironments/env")[environment];

export default knex(config);
