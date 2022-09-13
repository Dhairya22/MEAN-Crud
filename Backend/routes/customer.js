const router = require("express").Router();
const customerController = require("../controllers/customerController");

router.post("/", customerController.customer_create); // add new cusomter
router.get("/", customerController.customer_all); // get all customers
router.get("/:customerId", customerController.customer_details); // get single customer
router.put("/:customerId", customerController.customer_update); // update customer
router.delete("/:customerId"); // delete customer

module.exports = router;