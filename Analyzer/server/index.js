const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', require("./routes/authRoutes"));

const PORT = 5000;

// mongoose.connect("mongodb://127.0.0.1:27017/user");

app.listen(PORT, () => {
    console.log("Server is running...");
})

connectDB();