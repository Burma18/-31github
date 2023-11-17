import { db } from "../configs/enironments/env";
import wrapper from "../services/wrapper";

const getUsers = async () => {
  const query = db.select("*").from("users");
  const result = await query;

  if (!result || result.length === 0) {
    return null;
  }

  return result;
};

export default {
  getUsers: wrapper.wrap(getUsers),
};
