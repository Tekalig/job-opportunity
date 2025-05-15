const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Employer = require("./employer-model");

const JobPosting = sequelize.define("JobPosting", {
  jobId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  jobTitle: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  jobDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  jobType: {
    type: DataTypes.ENUM("fulltime", "parttime", "contract", "internship"),
    allowNull: false,
  },
  jobLocation: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  jobSalary: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  jobExperience: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  jobSkills: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  jobLevel: {
    type: DataTypes.ENUM("entry", "intermediate", "senior"),
    allowNull: false,
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employer,
      key: "companyId",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});

JobPosting.belongsTo(Employer, { foreignKey: "companyId" });

module.exports = JobPosting;
