const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 5001;

//app.use(cors());
app.use(express.json()); //json middleware (parse json when sending to backend)

//redirect requests to endpoints via routes
app.use("/admin", require("./routes/adminRoutes"));
app.use("/chatroom", require("./routes/chatroomRoutes"));
app.use("/comment", require("./routes/commentRoutes"));
app.use("/community", require("./routes/communityRoutes"));
app.use("/message", require("./routes/messageRoutes"));
app.use("/posts", require("./routes/postRoutes"));
app.use("/profile", require("./routes/profileRoutes"));
app.use("/user", require("./routes/userRoutes"));

//global error handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);
  res.status(500).json({
    message: "Something went really wrong.",
  });
});

//listen on pc port
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

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
