// import status from "../configs/status";

// const wrap = (inputFunction: any) => {
//   return async function () {
//     try {
//       // @ts-ignore
//       return await inputFunction.apply(this, arguments);
//     } catch (error: any) {
//       console.log(error);

//       let callback;

//       if (arguments.length !== 1) {
//         callback = arguments[arguments.length - 1];
//       }

//       if (error.hasOwnProperty("message")) {
//         console.log("error from wrap:", status.getStatus(error.message));
//         return callback
//           ? callback(status.getStatus(error.message))
//           : status.getStatus(error.message);
//       } else {
//         return callback
//           ? callback(status.getStatus("generic_fail"))
//           : status.getStatus("generic_fail");
//       }
//     }
//   };
// };

// export default {
//   wrap,
// };

import status from "../configs/status";

const wrap = (inputFunction: any) => {
  return async function (...args: any[]) {
    try {
      const result = await inputFunction(...args);
      return result;
    } catch (error: any) {
      console.log(error);

      if (error.hasOwnProperty("message")) {
        const errorMessage = status.getStatus(error.message);
        if (args.length > 0 && typeof args[args.length - 1] === "function") {
          args[args.length - 1](errorMessage);
        }
        return errorMessage;
      } else {
        const genericFailMessage = status.getStatus("generic_fail");
        if (args.length > 0 && typeof args[args.length - 1] === "function") {
          args[args.length - 1](genericFailMessage);
        }
        return genericFailMessage;
      }
    }
  };
};

export default {
  wrap,
};
