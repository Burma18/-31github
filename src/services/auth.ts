import wrapper from "./wrapper";
import status from "../configs/status";
import authModel from "../models/auth";

const registerUser = async (userData: any) => {
  const userCreated: any = await authModel.registerUser(userData);
  let response: any = status.getStatus("success");
  response.data = {};
  response.data.user = userCreated;

  return response;
};

const login = async (userData: any) => {
  console.log("reached login service");
  const login: any = await authModel.login(userData);
  let response: any = status.getStatus("success");
  response.data = {};
  response.data.user = login;

  return response;
};

export default {
  registerUser: wrapper.wrap(registerUser),
  login: wrapper.wrap(login),
};
