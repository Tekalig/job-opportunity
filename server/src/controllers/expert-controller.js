const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const generateTokenSetCookie = require("../utils/generateTokenSetCookies");
const JobPosting = require("../models/jobPosting-model");
const JobApplication = require("../models/jobApplication");
const Expert = require("../models/expert-model");
const Employer = require("../models/employer-model");
const Profile = require("../models/profile-model");

const {
  sendVerificationEmail,
  sendWellcomeEmail,
  restPasswordEmail,
} = require("../nodemailer/email");

// expert sign up by providing basic information
const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName, contactNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const newExpert = await Expert.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      contactNumber,
      verificationToken,
    });

    // Exclude password from the returned company object
    const { password: _, ...expertWithoutPassword } = newExpert.toJSON();
    // Generate token and set cookie
    generateTokenSetCookie(res, newExpert.expertId);
    sendVerificationEmail(email, newExpert.verificationToken);
    res.status(201).json({
      message: "Expert added successfully",
      data: expertWithoutPassword,
      isEmployer: false,
    });
  } catch (error) {
    res.status(400).json({ message: "Expert not added", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const expert = await Expert.findOne({ where: { email } });
    if (expert) {
      const isMatch = bcrypt.compare(password, expert.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      // Exclude password from the returned company object
      const { password: _, ...expertWithoutPassword } = expert.toJSON();
      // Generate token and set cookie
      generateTokenSetCookie(res, expert.expertId);
      res.status(200).json({
        message: "Expert logged in successfully",
        data: expertWithoutPassword,
        isEmployer: false,
      });
      // Generate token and set cookie
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const editProfile = async (req, res) => {
  try {
    const bufferdProfilePicture = req.file ? req.file.buffer : null;
    console.log(req.file);
    const { firstName, lastName, contactNumber, oldPassword, newPassword } =
      req.body;
    const expertId = req.userId;

    const expert = await Expert.findOne({ where: { expertId } });
    if (!expert) {
      return res.status(404).json({ message: "Expert not found" });
    }

    let updateData = {
      firstName,
      lastName,
      contactNumber,
      profilePicture: bufferdProfilePicture,
    };

    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, expert.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedNewPassword;
    }

    const [updated] = await Expert.update(updateData, { where: { expertId } });

    if (!updated) {
      return res.status(400).json({ message: "Expert profile not updated" });
    }

    res.status(200).json({ message: "Expert profile updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Expert profile not updated", error });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await JobPosting.findAll({
      include: [
        {
          model: Employer,
          attributes: ["companyName"],
        },
      ],
    });
    res.status(200).json({ message: "Jobs fetched successfully", jobs });
  } catch (error) {
    res.status(400).json({ message: "Jobs not fetched", error });
  }
};

const applyJob = async (req, res) => {
  try {
    const bufferdResume = req.file ? req.file.buffer : null;
    const { jobId, firstName, lastName, email } = req.body;
    const expertId = req.userId;
    const jobApplication = await JobApplication.create({
      expertId,
      jobId,
      resume: bufferdResume,
      firstName,
      lastName,
      email,
    });
    res
      .status(200)
      .json({ message: "Job applied successfully", jobApplication });
  } catch (error) {
    res.status(400).json({ message: "Job not applied", error });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const resetToken = crypto.randomBytes(20).toString("hex");
    const expert = await Expert.findOne({ where: { email } });
    if (expert) {
      await Expert.update(
        {
          resetPasswordToken: resetToken,
          resetPasswordExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        },
        { where: { email } }
      );
      // Assuming sendVerificationEmail is a function that sends an email
      await restPasswordEmail(email, resetToken);
      res.status(200).json({ message: "Email sent successfully" });
    } else {
      res.status(400).json({ message: "Email not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getExperts = async (req, res) => {
  try {
    const experts = await Expert.findAll();
    res
      .status(200)
      .json({ message: "Experts fetched successfully", experts: experts });
  } catch (error) {
    res.status(400).json({ message: "Experts not fetched", error });
  }
};

const checkAuth = async (req, res) => {
  try {
    const expertId = req.userId;
    const expert = await Expert.findOne({ where: { expertId } });
    if (expert) {
      const { password, ...expertWithoutPassword } = expert.toJSON();
      res
        .status(200)
        .json({
          message: "Authenticated",
          data: expertWithoutPassword,
          isEmployer: false,
        });
    } else {
      res.status(400).json({ message: "Not authenticated" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { verificationToken } = req.body;
    const expertId = req.userId; // Assuming you have the company ID stored in req.userId after authentication

    console.log("expertId:", expertId, "verificationToken:", verificationToken);

    // Find company by email and verification token using Sequelize
    const expert = await Expert.findOne({
      where: {
        expertId,
        verificationToken,
        verificationExpiresAt: { [Op.gt]: new Date() },
      },
    });

    if (!expert) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    // Update the expert's email verification status using Sequelize
    const [updatedRows] = await Expert.update(
      {
        isVerified: true,
        verificationToken: null,
        verificationExpiresAt: null,
      },
      { where: { expertId } }
    );

    if (updatedRows === 0) {
      console.log("No rows updated for expertId:", expertId);
      return res.status(400).json({ message: "Email not verified" });
    }

    console.log(
      "expert verified successfully. Sending welcome email.",
      expert.firstName + expert.lastName
    );
    sendWellcomeEmail(expert.email, expert.firstName + expert.lastName);

    res
      .status(200)
      .json({ message: "Email verified successfully", isEmployer: false });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { resetToken, password } = req.body;
    const expert = await Expert.findOne({
      where: {
        resetPasswordToken: resetToken,
        resetPasswordExpiresAt: { [Op.gt]: new Date() },
      },
    });
    if (expert) {
      const hashedPassword = bcrypt.hash(password, 10);
      await Expert.update(
        {
          password: hashedPassword,
          resetPasswordToken: null,
          resetPasswordExpiresAt: null,
        },
        { where: { companyId: expert.companyId } }
      );
      await restPasswordSuccessEmail(expert.email);
      res.status(200).json({ message: "Password reset successfully" });
    } else {
      res.status(400).json({ message: "Invalid or expired reset token" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  signup,
  login,
  editProfile,
  getJobs,
  applyJob,
  getExperts,
  checkAuth,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
