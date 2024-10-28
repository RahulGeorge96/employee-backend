// src/redux/reducer.js
import { SIGNUP, LOGIN, LOGOUT, ADD_EMPLOYEE, EDIT_EMPLOYEE, DELETE_EMPLOYEE, FETCH_EMPLOYEES } from './actions';

const initialState = {
  user: null,
  employees: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return { ...state, user: action.payload };
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    case FETCH_EMPLOYEES:
      return { ...state, employees: action.payload };
    case ADD_EMPLOYEE:
      return { ...state, employees: [...state.employees, action.payload] };
    case EDIT_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((emp) =>
          emp.id === action.payload.id ? action.payload : emp
        ),
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter((emp) => emp.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
