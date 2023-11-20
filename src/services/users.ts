import wrapper from "./wrapper";
import userModels from "../models/users";
import status from "../configs/status";

const getUsers = async () => {
  let users: any = await userModels.getUsers();

  let response: any = status.getStatus("success");
  response.data = {};
  response.data.users = users;

  return response;
};

const getUser = async (params: any) => {
  if (!params.userId) throw new Error("input_missing");

  let user: any = await userModels.getUser(params);
  let response: any = status.getStatus("success");
  response.data = {};
  response.data.user = user;

  if (user.length <= 0) {
    throw new Error("no user found");
  }

  return response;
};

export default {
  getUsers: wrapper.wrap(getUsers),
  getUser: wrapper.wrap(getUser),
};
