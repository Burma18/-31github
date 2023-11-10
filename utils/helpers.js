const bcrypt = require("bcrypt");

// const generateSalt = (salt, cb) => {
//   bcrypt.genSalt(salt, (err, data) => {
//     if (err) {
//       console.error("err salt:", err);
//       return cb(err);
//     }
//     cb(null, data);
//   });
// };

const generateSalt = (saltRounds) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        console.error("Error generating salt:", err);
        reject(err);
      } else {
        resolve(salt);
      }
    });
  });
};

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

const generateHash = (password, saltRounds) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

const comparePW = (password, hash) => {
  bcrypt.compare(password, hash, function (err, result) {
    if (err) {
      console.error("err :", err);
    } else {
      console.log("hash :", result);
      return result;
    }
  });
};

module.exports = {
  generateSalt,
  generateHash,
  comparePW,
};
