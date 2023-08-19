const express = require("express");
const app = express();
app.use(express.json());

// cors
const cors = require("cors");
app.use(cors());

// dotenv
const dotenv = require("dotenv");
dotenv.config();
// DB

require("./config/Database");

// import routes
const authRouter = require("./routes/authRoutes");
const userRoute = require("./routes/User");

app.use("/api/auth", authRouter);
app.use("/api/users", userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
