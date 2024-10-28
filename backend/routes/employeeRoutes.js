const express = require("express");
const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/employees", authMiddleware, createEmployee);
router.get("/employees", authMiddleware, getEmployees);
router.put("/employees/:id", authMiddleware, updateEmployee);
router.delete("/employees/:id", authMiddleware, deleteEmployee);

module.exports = router;
