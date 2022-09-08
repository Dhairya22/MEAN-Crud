const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: String,
    addres: String,
    contact_no: Number,
    box_no: String,
    status: String,
    plan: String
});

module.exports = mongoose.model("Customers", customerSchema);