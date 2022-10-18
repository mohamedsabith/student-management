import express from "express";
import helmet from "helmet";
import cors from "cors";
import chalk from "chalk";
import dbConnection from "./config/dbConnection.js";
import "dotenv/config";

// Routes
import authRoute from "./routes/authRoute.js"
import studentRoute from "./routes/studentRoute.js"

// Database Connection
dbConnection();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(helmet());



app.get("/", (req, res) => res.send("API IS WORKING"));
app.use("/api/auth", authRoute)
app.use("/api/student", studentRoute)

app.all("*", (req, res) => {
  res.status(404).json({
    status: false,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

const { PORT } = process.env;

app.listen(PORT, (err) => {
  if (err) console.log(chalk.red(`Server failed to start Error > ${err}`));
  console.log(chalk.blue(`Server Running on Port: http://localhost:${PORT}`));
});