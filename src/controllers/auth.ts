import authServices from "../services/auth";
import wrapper from "../services/wrapper";

const registerUser = async (req: any, res: any, next: any) => {
  const userData = req.body;

  const response = await authServices.registerUser(userData);

  return res.send(response);
};

const login = async (req: any, res: any, next: any) => {
  const userData = req.body;

  const response = await authServices.login(userData);

  return res.send(response);
};

export default {
  registerUser: wrapper.wrap(registerUser),
  login: wrapper.wrap(login),
};
