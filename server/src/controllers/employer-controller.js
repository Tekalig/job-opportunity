const bycrypt = require("bcryptjs");
const crypto = require("crypto");
const { Op } = require("sequelize");
const generateTokenSetCookie = require("../utils/generateTokenSetCookies");
const Employer = require("../models/employer-model");
const JobPosting = require("../models/jobPosting-model");
const JobApplication = require("../models/jobApplication");
const {
  sendVerificationEmail,
  sendWellcomeEmail,
  restPasswordEmail,
  restPasswordSuccessEmail,
} = require("../nodemailer/email");

const signup = async (req, res) => {
  try {
    const { email, password, companyName, companyDescription, contactNumber } =
      req.body;
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Hash the password using bcrypt
    const hashedPassword = await bycrypt.hash(password, 10);

    // Add a new company using Sequelize
    const newCompany = await Employer.create({
      email,
      password: hashedPassword, // Hash this password using a hashing algorithm like bcrypt in real scenarios
      companyName,
      companyDescription,
      contactNumber,
      verificationToken,
    });

    // Exclude password from the returned company object
    const { password: _, ...companyWithoutPassword } = newCompany.toJSON();

    generateTokenSetCookie(res, newCompany.companyId);
    sendVerificationEmail(email, verificationToken);
    res.status(201).json({
      message: "Company added successfully",
      data: companyWithoutPassword,
      isEmployer: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find company by email and password using Sequelize
    const company = await Employer.findOne({
      where: { email }, // In real apps, compare hashed passwords
    });

    if (!company) {
      return res.status(400).json({ message: "Invalid credentials" });
    } else {
      const isPasswordValid = await bycrypt.compare(password, company.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    }

    // Exclude password from the returned company object
    const { password: _, ...companyWithoutPassword } = company.toJSON();
    generateTokenSetCookie(res, company.companyId);
    res.status(200).json({
      message: "Company logged in successfully",
      data: companyWithoutPassword,
      isEmployer: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const editProfile = async (req, res) => {
  try {
    const bufferdProfilePicture = req.file ? req.file.buffer : null;
    const {
      companyName,
      contactNumber,
      companyDescription,
      oldPassword,
      newPassword,
    } = req.body;
    const companyId = req.userId; // Assuming you have the company ID stored in req.userId after authentication

    // Find the company by ID
    const company = await Employer.findOne({ where: { companyId } });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    let updatedFields = {
      companyName,
      contactNumber,
      companyDescription,
      profilePicture: bufferdProfilePicture,
    };

    if (oldPassword && newPassword) {
      const isPasswordValid = await bycrypt.compare(
        oldPassword,
        company.password
      );
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid old password" });
      }

      const hashedPassword = await bycrypt.hash(newPassword, 10);
      updatedFields.password = hashedPassword;
    }

    // Update company profile using Sequelize
    const updatedCompany = await Employer.update(updatedFields, {
      where: { companyId },
    });

    if (updatedCompany[0] === 0) {
      return res.status(400).json({ message: "Company profile not updated" });
    }

    res.status(200).json({ message: "Company profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const postJob = async (req, res) => {
  try {
    const {
      jobTitle,
      jobDescription,
      jobLocation,
      jobType,
      jobSalary,
      jobSkills,
      jobExperience,
      jobLevel,
    } = req.body;

    const companyId = req.userId; // Assuming you have the company ID stored in req.userId after authentication

    // Add a new job posting using Sequelize
    const newJob = await JobPosting.create({
      companyId,
      jobTitle,
      jobDescription,
      jobLocation,
      jobType,
      jobSalary,
      jobSkills,
      jobExperience,
      jobLevel,
    });

    res.status(201).json({ message: "Job added successfully", newJob });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const editJob = async (req, res) => {
  try {
    const {
      jobTitle,
      jobDescription,
      jobLocation,
      jobType,
      jobSalary,
      jobSkills,
      jobExperience,
      jobLevel,
    } = req.body;
    const { jobId } = req.params;

    // Update the job posting using Sequelize
    const updatedJob = await JobPosting.update(
      {
        jobTitle,
        jobDescription,
        jobLocation,
        jobType,
        jobSalary,
        jobSkills,
        jobExperience,
        jobLevel,
      },
      { where: { jobId } }
    );

    if (updatedJob[0] === 0) {
      return res.status(400).json({ message: "Job not updated" });
    }

    res.status(200).json({ message: "Job updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Remove the job posting using Sequelize
    const deletedJob = await JobPosting.destroy({ where: { jobId } });

    if (!deletedJob) {
      return res.status(400).json({ message: "Job not removed" });
    }

    res.status(200).json({ message: "Job removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getApplicantsByJobId = async (req, res) => {
  try {
    const jobId = Number(req.params.jobId);
    // Fetch all applicants for a specific job posting using Sequelize
    const applicants = await JobApplication.findAll({
      where: { jobId },
    });

    res.status(200).json({
      message: "Applicants retrieved successfully",
      applicants,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getApplicants = async (req, res) => {
  try {
    const applicants = await JobApplication.findAll();
    res.status(200).json({
      message: "Applicants retrieved successfully",
      applicants: applicants,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const examineApplicant = async (req, res) => {
  try {
    const { applicantId, status, jobId } = req.body;
    console.log(applicantId, status, jobId);
    // Update the applicant status using Sequelize
    const updatedApplicant = await JobApplication.update(
      { applicationStatus: status },
      { where: { applicationId: applicantId, jobId } }
    );

    if (updatedApplicant[0] === 0) {
      return res.status(400).json({ message: "Applicant status not updated" });
    }

    res.status(200).json({ message: "Applicant status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getCompanies = async (req, res) => {
  try {
    // Fetch all companies using Sequelize
    const companies = await Employer.findAll();
    res.status(200).json({
      message: "Companies retrieved successfully",
      companies: companies,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const checkAuth = async (req, res) => {
  try {
    const companyId = req.userId; // Assuming you have the company ID stored in req.userId after authentication
    const company = await Employer.findOne({ where: { companyId } });
    if (!company) {
      return res.status(400).json({ message: "Not authenticated" });
    }
    res
      .status(200)
      .json({ message: "Authenticated successfully", user: company });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { verificationToken } = req.body;
    const companyId = req.userId; // Assuming you have the company ID stored in req.userId after authentication

    // Find company by email and verification token using Sequelize
    const company = await Employer.findOne({
      where: {
        companyId,
        verificationToken,
        verificationExpiresAt: { [Op.gt]: new Date() },
      },
    });

    if (!company) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    // Update the company's email verification status using Sequelize
    const [updatedRows] = await Employer.update(
      {
        isVerified: true,
        verificationToken: null,
        verificationExpiresAt: null,
      },
      { where: { companyId } }
    );

    if (updatedRows === 0) {
      console.log("No rows updated for companyId:", companyId);
      return res.status(400).json({ message: "Email not verified" });
    }

    console.log(
      "Company verified successfully. Sending welcome email.",
      company.companyName
    );
    sendWellcomeEmail(company.email, company.companyName);

    res
      .status(200)
      .json({ message: "Email verified successfully", isEmployer: true });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Update the company's reset password token and expiry using Sequelize
    const updatedCompany = await Employer.update(
      {
        resetPasswordToken: resetToken,
        resetPasswordExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hour from now
      },
      { where: { email } }
    );

    if (updatedCompany[0] === 0) {
      return res.status(400).json({ message: "Reset password token not set" });
    }

    await sendResetPasswordEmail(email, resetToken);
    res.status(200).json({ message: "Reset password email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { resetToken, password } = req.body;

    // Find company by reset password token and expiry using Sequelize
    const company = await Employer.findOne({
      where: {
        resetPasswordToken: resetToken,
        resetPasswordExpiresAt: { [Op.gt]: new Date() },
      },
    });

    if (!company) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // Hash the new password using bcrypt
    const hashedPassword = await bycrypt.hash(password, 10);

    // Update the company's password using Sequelize
    const updatedCompany = await Employer.update(
      {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpiresAt: null,
      },
      { where: { companyId: company.companyId } }
    );

    if (updatedCompany[0] === 0) {
      return res.status(400).json({ message: "Password not updated" });
    }

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
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
};
