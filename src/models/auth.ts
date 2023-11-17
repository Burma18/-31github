import { db } from "../configs/enironments/env";
import wrapper from "../services/wrapper";

const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  hashedPassword: string
) => {
  const registerUserQuery = db("users").insert({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
  });

  const result = await registerUserQuery;

  if (!result || result.length === 0) {
    return null;
  }

  return result;
};

export default {
  registerUser: wrapper.wrap(registerUser),
};
