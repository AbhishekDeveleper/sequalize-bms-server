import { Sequelize, DataTypes } from "sequelize";

export const sequelize = new Sequelize("bms_db", "abhishek", "password", {
  host: "localhost",
  dialect: "mysql",
});

export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
