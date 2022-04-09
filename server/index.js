const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); //json middleware (parse json when sending to backend)

app.use("/posts", require("./routes/post.js"));
app.use("/users", require("./routes/user.js"));

//listen on pc port
const PORT = process.env.PORT || "5001";
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
