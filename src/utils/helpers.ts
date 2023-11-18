import bcrypt from "bcrypt";

// const generateSalt = (salt, cb) => {
//   bcrypt.genSalt(salt, (err, data) => {
//     if (err) {
//       console.error("err salt:", err);
//       return cb(err);
//     }
//     cb(null, data);
//   });
// };

// const generateSalt = (saltRounds) => {
//   return new Promise((resolve, reject) => {
//     bcrypt.genSalt(saltRounds, (err, salt) => {
//       if (err) {
//         console.error("Error generating salt:", err);
//         reject(err);
//       } else {
//         resolve(salt);
//       }
//     });
//   });
// };

// method using callbacks
// const generateHash = (password, salt, cb) => {
//   console.log("password and hash for generateHash function :", password, salt);
//   bcrypt.hash(password, salt, (err, result) => {
//     if (err) {
//       console.error("err hash:", err);
//       return cb(err, null);
//     } else {
//       console.log("result :", result);
//       return cb(null, result);
//     }
//   });
// };

// method using Promises
export const generateHash = (password: string, saltRounds: number) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err: any, hash: unknown) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

// const comparePW = (password: string, hash: string) => {
//   bcrypt.compare(password, hash, function (err: any, result: any) {
//     if (err) {
//       console.error("err :", err);
//     } else {
//       console.log("hash :", result);
//       return result;
//     }
//   });
// };
