const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const allRoutes = require("./routes/allRoutes");
const connect = require("./config/db");
const cookieParser = require("cookie-parser");
const { isAuth } = require("./Middlewares/isAuth");

const corsOptions = {
  origin: [`${process.env.FRONTEND_URL}`],
  credentials: true,  
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/api", allRoutes);

app.get("/", isAuth, (req, res) => {
  console.log(req.profile);
  res.send("Homepage");
});

app.listen(process.env.PORT, () => {
  try {
    connect();
    console.log("🖥️  MongoDB Server is running on " + process.env.PORT);
  } catch (error) {
    console.log("error=>", error.message);
  }
});
