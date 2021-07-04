import { SIGNIN_USER, SIGNUP_USER, AUTH_USER, LOGOUT_USER } from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case SIGNUP_USER:
      return { ...state, register: action.payload };
    case SIGNIN_USER:
      return { ...state, loginSucces: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state };
    default:
      return state;
  }
}
