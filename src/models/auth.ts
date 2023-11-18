import { db } from "../configs/enironments/env";
import wrapper from "../services/wrapper";
import { generateHash } from "../utils/helpers";

const registerUser = async (userData: any) => {
  const { firstName, lastName, email, password } = userData;

  const existingUser = await db("users").select("*").where("email", email);

  if (existingUser.length > 0) {
    throw new Error("existing user");
  }
  const hashedPassword = await generateHash(password, 10);
  const userCreated = await db("users")
    .insert({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    })
    .returning("*");

  return userCreated[0];
};

export default {
  registerUser: wrapper.wrap(registerUser),
};
