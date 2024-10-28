
import  { useState, useEffect } from "react";
import { Modal, TextField, Button } from "@mui/material";

const EmployeeForm = ({ open, onClose, onSubmit, employee }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    salary: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      salary: "",
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          padding: "20px",
          backgroundColor: "white",
          margin: "100px auto",
          width: "300px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            name="firstName"
            label="First Name"
            fullWidth
            margin="normal"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            name="lastName"
            label="Last Name"
            fullWidth
            margin="normal"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="Email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            name="department"
            label="Department"
            fullWidth
            margin="normal"
            select
            value={formData.department}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
          >
            <option value="" />
            <option value="Tech">Tech</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
          </TextField>
          <TextField
            name="salary"
            label="Salary"
            type="number"
            fullWidth
            margin="normal"
            value={formData.salary}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default EmployeeForm;
