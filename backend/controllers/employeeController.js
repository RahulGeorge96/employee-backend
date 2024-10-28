const Employee = require("../models/Employee");

// Create an employee
exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: "Error adding employee" });
  }
};

// Get employees with filters, pagination, sorting, and search
exports.getEmployees = async (req, res) => {
  const { page = 1, limit = 5, department, sort, search } = req.query;
  const query = {};

  if (department) query.department = department;
  if (search) query.firstName = { $regex: search, $options: "i" };

  try {
    const employees = await Employee.find(query)
      .sort(sort ? { salary: sort === "asc" ? 1 : -1 } : {})
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Error fetching employees" });
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: "Error updating employee" });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting employee" });
  }
};
