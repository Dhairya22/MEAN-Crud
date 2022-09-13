const { json } = require("express");
const Customer = require("../model/customer");

// Get all customers
const customer_all = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.json({ message: err });
    }
};

// Get Single customers
const customer_details = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.customerId);
        res.json(customer);
    } catch (err) {
        res.json({ message: err })
    }
};

// Add new customer
const customer_create = async (req, res) => {
    const customer = new Customer({
        name: req.body.name,
        addres: req.body.addres,
        contact_no: req.body.contact_no,
        box_no: req.body.box_no,
        status: req.body.status,
        plan: req.body.plan
    });

    try {
        const savedCustomer = await customer.save();
        res.send(savedCustomer);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Update Customer
const customer_update = async (req, res) => {
    try {
        const customer = {
            name: req.body.name,
            addres: req.body.addres,
            contact_no: req.body.contact_no,
            box_no: req.body.box_no,
            status: req.body.status,
            plan: req.body.plan
        }

        const updateCustomer = await Customer.findByIdAndUpdate(
            { _id: req.params.customerId },
            customer
        );
        res.json(updateCustomer);
    } catch (error) {
        res.json({ message: error })
    }
 };

// Delete Customer
const customer_delete = async (req, res) => {
    try {
        const customer = {
            name: req.body.name,
            addres: req.body.addres,
            contact_no: req.body.contact_no,
            box_no: req.body.box_no,
            status: req.body.status,
            plan: req.body.plan
        }

        const deleteCustomer = await Customer.findByIdAndDelete(
            { _id: req.params.customerId },
            customer
        )
    } catch (err) {
        res.json({ message: error });
    }
};

module.exports = {
    customer_all,
    customer_create,
    customer_details,
    customer_update,
    customer_delete
}