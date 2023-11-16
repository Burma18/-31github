import knex from "../configs/config";
import wrapper from "../services/wrapper";

const getUsers = async () => {
  const query = knex.select("*").from("users");
  const result = await query;

  if (!result || result.length === 0) {
    return null;
  }

  return result;
};

export default {
  getUsers: wrapper.wrap(getUsers),
};
