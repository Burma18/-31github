import { db } from "../../knexfile";
import wrapper from "../services/wrapper";
import { sanitizeSqlResult } from "../utils/helpers";

const getUsers = async () => {
  const query = db.select("*").from("users");
  const result = await query;

  if (!result || result.length === 0) {
    return null;
  }

  return sanitizeSqlResult(result);
};

const getUser = async (params: any) => {
  if (!params.userId) throw new Error("input_missing");
  const id = params.userId;

  const result = db.select("*").from("users").where({
    id: id,
  });

  if (!result) {
    throw new Error("no user found");
  }

  return sanitizeSqlResult(result);
};

export default {
  getUsers: wrapper.wrap(getUsers),
  getUser: wrapper.wrap(getUser),
};
