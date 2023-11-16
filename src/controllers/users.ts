import usersService from "../services/users";
import wrapper from "../services/wrapper";

const getUsers = async (req: any, res: any, next: any) => {
  const response = await usersService.getUsers();

  return res.send(response);
};

export default {
  getUsers: wrapper.wrap(getUsers),
};
