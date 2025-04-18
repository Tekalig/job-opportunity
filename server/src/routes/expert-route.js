const express = require("express");
const upload = require("../utils/multer");
const {
  signup,
  login,
  getJobs,
  editProfile,
  applyJob,
  getExperts,
  checkAuth,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/expert-controller");

const expertRouter = express.Router();

expertRouter.post("/signup", signup);

expertRouter.post("/login", login);

expertRouter.patch("/editProfile",upload.single("picture"), editProfile);

expertRouter.get("/getJobs", getJobs);

expertRouter.post("/applyJob", upload.single("resume"), applyJob);

expertRouter.get("/experts", getExperts);

expertRouter.get("/checkAuth", checkAuth);

expertRouter.patch("/verify", verifyEmail);

expertRouter.post("/forgot-password", forgotPassword);

expertRouter.post("/reset-password/:token", resetPassword);

module.exports = {
  expertRouter,
};
