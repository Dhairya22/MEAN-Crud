const Customer = require("../model/customer");

// Get all customers
const customer_all = async (req, res) => {
    try {
        // const customer = {
        //     name: req.body.name,
        //     addres: req.body.addres,
        //     contact_no: req.body.contact_no,
        //     box_no: req.body.box_no,
        //     status: req.body.status,
        //     plan: req.body.plan
        // }
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.json({ message: err });
    }
};

// Get Single customers
const customer_details = async (req, res) => { };

// Add new customer
const customer_create = async (req, res) => { };

// Update Customer
const customer_update = async (req, res) => { };

// Delete Customer
const customer_delete = async (req, res) => { };

module.exports = {
    customer_all,
    customer_create,
    customer_details,
    customer_update,
    customer_delete
}