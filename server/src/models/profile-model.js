const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Profile = sequelize.define("Profile", {
  skills: {
    type: DataTypes.JSON, // Store skills as a JSON array
    allowNull: false,
  },

  certifications: {
    type: DataTypes.JSON, // Store certifications as a JSON array
    allowNull: true,
  },
});
module.exports = Profile;
