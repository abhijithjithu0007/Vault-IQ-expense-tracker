import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db";
import { PoolConnection } from "mysql2/promise";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import expenseRoute from "./route/expenseRoute";
import budgetRoute from "./route/budgetRoute";
import userRoute from "./route/userRoute";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/expense", expenseRoute);
app.use("/api/user", userRoute);
app.use("/api/budget", budgetRoute);
app.use(globalErrorHandler);
pool
  .getConnection()
  .then((connection: PoolConnection) => {
    console.log("Connected to the database");
    connection.release();
  })
  .catch((error: Error) => {
    console.error("Database connection failed:", error.message);
  });

app.get("/", (req, res) => {
  res.send("App is running");
});

app.listen(port, () => {
  console.log(`server--: Server is running at http://localhost:${port}`);
});
