const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Employer = sequelize.define(
  "Employer",
  {
    companyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    companyDescription: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.BLOB("long"), // URL or path to the profile picture
      allowNull: true,
    },
    loginTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    resetPasswordToken: {
      type: DataTypes.STRING(255),
    },
    resetPasswordExpiresAt: {
      type: DataTypes.DATE,
    },
    verificationToken: {
      type: DataTypes.STRING(255),
    },
    verificationExpiresAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: (employer) => {
        employer.verificationExpiresAt = new Date(
          new Date().getTime() + 15 * 60 * 1000
        ); // 15 minutes from now
      },
    },
  }
);

module.exports = Employer;
