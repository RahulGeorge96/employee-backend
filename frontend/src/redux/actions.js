// src/redux/actions.js
import axios from "axios";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const EDIT_EMPLOYEE = "EDIT_EMPLOYEE";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
export const FETCH_EMPLOYEES = "FETCH_EMPLOYEES";

const API_URL = "https://employee-backend-fmos.onrender.com"; 

export const signup = (email, password) => async (dispatch) => {
  const response = await axios.post(`${API_URL}/signup`, { email, password });
  dispatch({ type: SIGNUP, payload: response.data });
};

export const login = (email, password) => async (dispatch) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  localStorage.setItem("token", response.data.token);
  dispatch({ type: LOGIN, payload: response.data });
};

export const logout = () => {
  localStorage.removeItem("token");
  return { type: LOGOUT };
};

export const addEmployee = (employee) => async (dispatch) => {
  const response = await axios.post(`${API_URL}/employees`, employee, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  dispatch({ type: ADD_EMPLOYEE, payload: response.data });
};

export const editEmployee = (id, updatedEmployee) => async (dispatch) => {
  const response = await axios.put(
    `${API_URL}/employees/${id}`,
    updatedEmployee,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  dispatch({ type: EDIT_EMPLOYEE, payload: response.data });
};

export const deleteEmployee = (id) => async (dispatch) => {
  await axios.delete(`${API_URL}/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  dispatch({ type: DELETE_EMPLOYEE, payload: id });
};

export const fetchEmployees = () => async (dispatch) => {
  const response = await axios.get(`${API_URL}/employees`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  dispatch({ type: FETCH_EMPLOYEES, payload: response.data });
};
