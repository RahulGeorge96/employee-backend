
import  { useState } from "react";
import { useDispatch } from "react-redux";
import { signup, login } from "../redux/actions";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  
} from "@mui/material";

const Auth = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(login(credentials.email, credentials.password));
    } else {
      if (credentials.password !== credentials.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      dispatch(signup(credentials.email, credentials.password));
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Paper style={{ padding: "20px" }}>
        <Typography variant="h5">{isLogin ? "Login" : "Signup"}</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={credentials.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={credentials.password}
            onChange={handleChange}
          />
          {!isLogin && (
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={credentials.confirmPassword}
              onChange={handleChange}
            />
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isLogin ? "Login" : "Signup"}
          </Button>
          <Button onClick={() => setIsLogin(!isLogin)} fullWidth>
            Switch to {isLogin ? "Signup" : "Login"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
