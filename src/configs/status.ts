const getStatus = (code: string) => {
  console.log("reached getSatus function");
  let status = null;

  switch (code) {
    case "success":
      status = {
        code: code,
        error: false,
        message: "Successful",
      };
      console.log("it was success");
      break;

    case "input_missing":
      status = {
        code: code,
        error: true,
        message: "Mandatory inputs missing",
      };
      break;

    case "headers_missing":
      status = {
        code: code,
        error: true,
        message: "Mandatory headers missing",
      };
      break;

    case "authn_fail":
      status = {
        code: code,
        error: true,
        message: "Authentication failed",
      };
      console.log("it was authn_fail");
      break;

    case "url_missing":
      status = {
        code: code,
        error: true,
        message: "URL not found",
      };
      break;

    case "existing user":
      status = {
        code: code,
        error: true,
        message: "There is already a user with this email",
      };
      break;

    case "no user found":
      status = {
        code: code,
        error: true,
        message: "There is no such user found",
      };
      break;

    case "password mismatch":
      status = {
        code: code,
        error: true,
        message: "Provided password doesn't match",
      };
      break;
    case "generic_fail":
    default:
      status = {
        code: "generic_fail",
        error: true,
        message: "Generic failure: Something went wrong",
      };
      break;
  }

  return status;
};

export default {
  getStatus: getStatus,
};
