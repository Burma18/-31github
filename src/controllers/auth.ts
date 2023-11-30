import authServices from "../services/auth";
import wrapper from "../services/wrapper";
import { authenticate } from "../utils/helpers";

const registerUser = async (req: any, res: any, next: any) => {
  const userData = req.body;

  const response = await authServices.registerUser(userData);

  return res.send(response);
};

const login = async (req: any, res: any, next: any) => {
  console.log("reached controller");
  const userData = req.body;

  const { email } = userData;

  req.session.user = {
    email: email,
  };
  console.log("req.session from login:", req.session);
  console.log("req.session.user from login :", req.session.user);

  const response = await authServices.login(userData);

  return res.send(response);
};

export default {
  registerUser: wrapper.wrap(registerUser),
  login: wrapper.wrap(login),
};
