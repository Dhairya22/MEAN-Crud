const router = require("express").Router();

router.post("/"); // add new cusomter
router.get("/"); // get all customers
router.get("/:customerId"); // get single customer
router.put("/:customerId"); // update customer
router.delete("/:customerId"); // delete customer

module.exports = router;