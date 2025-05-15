const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Required for Neon Postgres
    },
  },
});

sequelize
  .authenticate()
  .then(() => console.log("Connected to the Neon Postgres database"))
  .catch((err) => console.error("Unable to connect to the database:", err));

module.exports = sequelize;
