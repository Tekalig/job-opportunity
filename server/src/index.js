const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const apiRouter = require("./routes/routes");
const sequelize = require("./config/db");

const port = process.env.PORT || 8000;

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://job-opportunity.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.listen(port, () => {
  sequelize
    .sync()
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log("Database connection failed", error);
    });
  console.log(`Server is running on http://localhost:${port}`);
});
