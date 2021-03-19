import { FETCH_ALL, GET_USER, GET_USER_SPOTIFY} from "../constants/actionTypes";

import * as api from "../api/index.js";

export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUser(id);
    dispatch({ type: GET_USER, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUsers();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getUsersSpotify = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUserSpotify(id);
    dispatch({ type: GET_USER_SPOTIFY, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
