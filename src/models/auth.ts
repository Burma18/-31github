import knex from "../configs/config";

const registerUser = async () => {
  const registerUserQuery = knex.select("*").from("users");

  const result = await registerUserQuery;

  if (!result || result.length === 0) {
    return null;
  }

  return result;
};
