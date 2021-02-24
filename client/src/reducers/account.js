import {
  LOGIN,
  LOGIN_ERROR,
  UPDATE_USER,
  CREATE_SUCCESS,
  CREATE_ERROR,
  LOADING,
  GET_USER,
} from "../constants/actionTypes";

const defaultUser = {
  username: "",
  email: "",
  id: "",
  spotifyId: "",
};

export default function account(user = defaultUser, action) {
  const { payload } = action;
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case LOGIN:
      return payload;
    case LOGIN_ERROR:
      return { loginError: payload };
    case CREATE_ERROR:
      return { createError: payload };
    case CREATE_SUCCESS:
      return { createMessage: payload };
    case UPDATE_USER:
      return { ...user, payload };
    case LOADING:
      return { loading: payload };
    default:
      return user;
  }
}
