const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Expert = sequelize.define(
  "Experts",
  {
    expertId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    contactNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.BLOB("long"),
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
      beforeCreate: (expert) => {
        expert.verificationExpiresAt = new Date(
          new Date().getTime() + 15 * 60 * 1000
        ); // 15 minutes from now
      },
    },
  }
);

module.exports = Expert;
