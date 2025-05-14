const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

dotenv.config();

const app = express();   //Initializes the express application
app.use(cors());         //Enables CORS to establish communication b/w front-end and back-end
app.use(express.json());   //Parses incoming JSON payloads in body

//Routes
app.use('/api/auth', require("./routes/authRoutes"));

const PORT = 5000;

app.listen(PORT, () => {
    console.log("Server is running...");
})

connectDB();