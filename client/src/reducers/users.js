import { FETCH_ALL, UPDATE_ALL } from "../constants/actionTypes";

export default function user(users = [], action) {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case UPDATE_ALL:
      return users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    default:
      return users;
  }
}
