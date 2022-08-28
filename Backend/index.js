//create this basic file to create server on diif ports

const port = 4000;
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();

dotenv.config();

//connect to DB
mongoose.connect(
    process.env.DB,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log("connected to DB successfully!!")
);

app.listen(port || 5000, () => console.log(`Server is running on port ${port}`));