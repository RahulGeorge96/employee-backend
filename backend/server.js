const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/", authRoutes);
app.use("/", employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
