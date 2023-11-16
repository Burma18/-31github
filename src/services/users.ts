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

export default {
  getUsers: wrapper.wrap(getUsers),
};
