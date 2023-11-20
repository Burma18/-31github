import usersService from "../services/users";
import wrapper from "../services/wrapper";

const getUsers = async (req: any, res: any, next: any) => {
  const response = await usersService.getUsers();

  return res.send(response);
};

const getUser = async (req: any, res: any, next: any) => {
  if (!req.params.id) throw new Error("input_missing");
  let userParams: any = {};
  userParams.userId = req.params.id;
  let response = await usersService.getUser(userParams);

  return res.send(response);
};

export default {
  getUsers: wrapper.wrap(getUsers),
  getUser: wrapper.wrap(getUser),
};
