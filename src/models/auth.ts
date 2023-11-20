import bcrypt from "bcrypt";
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

const login = async (userData: any) => {
  const { email, password } = userData;

  const user = await db("users").select("*").where({
    email: email,
  });

  if (!user) {
    throw new Error("authn_fail");
  }

  const comparePW = await bcrypt.compare(password, user[0].password);

  if (!comparePW) {
    throw new Error("password mismatch");
  }

  return user[0];
};

export default {
  registerUser: wrapper.wrap(registerUser),
  login: wrapper.wrap(login),
};
