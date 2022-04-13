const express = require("express");
const cors = require("cors");

const app = express();
const LOCALPORT = 5001;

app.use(cors());
app.use(express.json()); //json middleware (parse json when sending to backend)

//redirect requests to endpoints via routes
app.use("/admin", require("./routes/adminRoutes"));
app.use("/chatroom", require("./routes/chatroomRoutes"));
app.use("/comment", require("./routes/commentRoutes"));
app.use("/community", require("./routes/communityRoutes"));
app.use("/message", require("./routes/messageRoutes"));
app.use("/post", require("./routes/postRoutes"));
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
app.listen(process.env.PORT || LOCALPORT, () => {
  console.log(`Server is running on port: ${process.env.PORT || LOCALPORT}`);
});
