const router = require("express").Router();
const customerController = require("../controllers/customerController");

router.post("/"); // add new cusomter
router.get("/", customerController.customer_all); // get all customers
router.get("/:customerId"); // get single customer
router.put("/:customerId"); // update customer
router.delete("/:customerId"); // delete customer

module.exports = router;