const express = require("express");
const upload = require("../utils/multer");
const {
  signup,
  login,
  editProfile,
  postJob,
  editJob,
  deleteJob,
  getApplicantsByJobId,
  getApplicants,
  examineApplicant,
  getCompanies,
  checkAuth,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/employer-controller");

const employerRouter = express.Router();

employerRouter.post("/signup", signup);

employerRouter.post("/login", login);

employerRouter.patch("/editProfile",upload.single("picture"), editProfile);

employerRouter.post("/postJob", postJob);

employerRouter.patch("/editJob/:jobId", editJob);

employerRouter.delete("/removeJob/:jobId", deleteJob);

employerRouter.get("/applicants/:jobId", getApplicantsByJobId);

employerRouter.get("/applicants", getApplicants)

employerRouter.patch("/applicant", examineApplicant);

employerRouter.get("/companies", getCompanies);

employerRouter.get("/checkAuth", checkAuth);

employerRouter.patch("/verify", verifyEmail);

employerRouter.post("/forgot-password", forgotPassword);

employerRouter.post("/reset-password/:token", resetPassword);

module.exports = {
  employerRouter,
};
