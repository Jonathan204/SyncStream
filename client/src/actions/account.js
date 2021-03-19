import {
  CREATE_SUCCESS,
  CREATE_ERROR,
  LOGIN,
  LOGIN_ERROR,
  UPDATE_USER,
  LOADING,
  LOGOUT,
} from "../constants/actionTypes";

import * as api from "../api/index.js";

export const createUser = (user, history) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: true });
    const { data } = await api.createUser(user);
    dispatch({ type: CREATE_SUCCESS, payload: handleResponse(data).message });
    history.push("/home");
  } catch (error) {
    const { message } = handleError(error);
    dispatch({ type: CREATE_ERROR, payload: message });
  }
};

export const loginUser = (user, history) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: true });
    const { data } = await api.login(user);
    dispatch({ type: LOGIN, payload: handleResponse(data) });
    history.push("/home");
  } catch (error) {
    const { message } = handleError(error);
    dispatch({ type: LOGIN_ERROR, payload: message });
  }
};

export const updateUser = (id, user) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, user);

    dispatch({ type: UPDATE_USER, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateSpotifyInfo = (id, user) => async (dispatch) => {
  try {
    const { spotifyAccess, spotifyRefresh } = user;
    await api.updateUser(id, { spotifyRefresh });

    dispatch({ type: UPDATE_USER, payload: { spotifyAccess } });
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT, payload: null });
};

function handleError(error) {
  return error.response && error.response.data ? error.response.data : error;
}
function handleResponse(resp) {
  return resp.data ? resp.data : resp;
}
