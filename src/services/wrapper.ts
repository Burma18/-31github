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
  console.log("reached wrap");
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

// const wrap = (...middlewares: any[]) => {
//   return async function (req: any, res: any, next: any) {
//     try {
//       for (const middleware of middlewares) {
//         await middleware(req, res, next);
//       }
//     } catch (error) {
//       const err = error as Error;
//       console.log(error);

//       if (err.hasOwnProperty("message")) {
//         const errorMessage = status.getStatus(err.message);
//         if (typeof next === "function") {
//           next(errorMessage);
//         }
//         return errorMessage;
//       } else {
//         const genericFailMessage = status.getStatus("generic_fail");
//         if (typeof next === "function") {
//           next(genericFailMessage);
//         }
//         return genericFailMessage;
//       }
//     }
//   };
// };

// const wrap = (inputFunction: any) => {
//   return async function (...args: any[]) {
//     try {
//       const lastArg = args[args.length - 1];

//       if (typeof lastArg === 'function') {
//         // Middleware requiring 'req', 'res', 'next' arguments
//         return await inputFunction(...args);
//       } else {
//         // Middleware requiring a single argument (e.g., userData)
//         return await inputFunction(args[0]);
//       }
//     } catch (error) {
//       const err = error as Error;
//       console.log(error);

//       if (err.hasOwnProperty("message")) {
//         const errorMessage = status.getStatus(err.message);
//         return errorMessage;
//       } else {
//         const genericFailMessage = status.getStatus("generic_fail");
//         return genericFailMessage;
//       }
//     }
//   };
// };

export default {
  wrap,
};
