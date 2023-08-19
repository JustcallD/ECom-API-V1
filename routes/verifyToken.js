// const jwt = require("jsonwebtoken");

// const verifyJwt = (req, res, next) => {
//   const authHeader = req.headers.token;

//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
//       if (err) {
//         res.status(403).send({ message: "Token is not valid" });
//         req.user = user;
//         next();
//       }
//     });
//   } else {
//     res.status(401).send({ message: "unAuthorized" });
//   }
// };

// const verifyTokenAndAuthorization = (req, res, next) => {
//   verifyJwt(req, res, () => {
//     if (req.user._id === req.params.id || req.user.isAdmin) {
//       next();
//     } else {
//       res.status(403).json("You are not alowed to do that!");
//     }
//   });
// };
// module.exports = { verifyJwt, verifyTokenAndAuthorization };

const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403).send({ message: "Token is not valid" });
      } else {
        req.user = user; // Set user data on the request object
        next(); // Continue to the next middleware
      }
    });
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  // verifyJwt(req, res, () => {
  //   if (req.user && (req.user._id === req.params.id || req.user.isAdmin)) {
  //     next();
  //   } else {
  //     res.status(403).json("You are not allowed to do that!");
  //   }
  // });

  verifyJwt(req, res, () => {
    if (req.user._id === req.params._id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = { verifyJwt, verifyTokenAndAuthorization };
