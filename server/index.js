const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5001;

//app.use(cors());
app.use(express.json()); //json middleware (parse json when sending to backend)

//redirect requests to endpoints via routes
app.use("/posts", require("./routes/postRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/chatroom", require("./routes/chatroomRoutes"));

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
