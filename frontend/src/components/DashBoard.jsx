
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployees,
  addEmployee,

  editEmployee,
  deleteEmployee,
  logout,
} from "../redux/actions";
import EmployeeTable from "./EmployeeTable";
import EmployeeForm from "./EmployeeForm";
import { Button, Container, AppBar, Toolbar, Typography } from "@mui/material";

const Dashboard = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleAddEmployee = (employee) => {
    if (editingEmployee) {
      dispatch(editEmployee(editingEmployee.id, employee));
      setEditingEmployee(null);
    } else {
      dispatch(addEmployee(employee));
    }
    setOpenForm(false);
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setOpenForm(true);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteEmployee(id));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Employee Dashboard</Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenForm(true)}
      >
        Add Employee
      </Button>
      <EmployeeTable
        employees={employees}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
      <EmployeeForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleAddEmployee}
        employee={editingEmployee}
      />
    </Container>
  );
};

export default Dashboard;
