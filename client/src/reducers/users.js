import { FETCH_ALL, GET_USER_SPOTIFY, } from "../constants/actionTypes";

export default function user(users = [], action) {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case GET_USER_SPOTIFY:
      return users.map((user) =>
        user.spotifyUserId === action.payload.spotifyUserId ? action.payload : user
       );
    default:
      return users;
  }
}
