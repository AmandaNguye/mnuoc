const jwt = require("jsonwebtoken");

exports.verifyJWT = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"]?.split(" ")[1];
    if (token) {
      jwt.verify(token, "lolulol" || process.env.JWT_SECRET, (err, decoded) => {
        if (err)
          return res.json({
            isLoggedIn: false,
            message: "Failed To Authenticate",
          });
        req.user = {};
        req.user.username = decoded.username;
        next();
      });
    } else {
      res.json({ message: "Incorrect Token Given", isLoggedIn: false });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
