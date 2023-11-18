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

export default {
  registerUser: wrapper.wrap(registerUser),
};
