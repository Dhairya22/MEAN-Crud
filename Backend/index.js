//create this basic file to create server on diif ports

const port = 4000;
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();

dotenv.config();

// Connect to DB
mongoose.connect(
    process.env.DB,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log("connected to DB successfully!!")
);

// Import Routes
const customerRoutes = require("./routes/customer");

// Middlewares
// app.use(express.json());

// Routes Middleware
app.use("/api/customers",customerRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));