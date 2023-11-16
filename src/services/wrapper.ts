import status from "../configs/status";

const wrap = (inputFunction: any) => {
  return async function () {
    try {
      // @ts-ignore
      return await inputFunction.apply(this, arguments);
    } catch (error: any) {
      console.log(error);

      let callback;

      if (arguments.length !== 1) {
        callback = arguments[arguments.length - 1];
      }

      if (error.hasOwnProperty("message")) {
        console.log("error from wrap:", status.getStatus(error.message));
        return callback
          ? callback(status.getStatus(error.message))
          : status.getStatus(error.message);
      } else {
        return callback
          ? callback(status.getStatus("generic_fail"))
          : status.getStatus("generic_fail");
      }
    }
  };
};

export default {
  wrap,
};
