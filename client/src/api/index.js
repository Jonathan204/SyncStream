import axios from "axios";

const url = "http://localhost:5000/users";
const spotifyUrl = `${url}/spotify`;

export const getUser = (id) => axios.get(`${url}/${id}`);
export const getUserSpotify = (id) => axios.get(`${spotifyUrl}/${id}`);
export const refreshSpotify = (id) => axios.get(`${url}/refresh/${id}`);
export const fetchUsers = () => axios.get(url);
export const createUser = (newUser) => axios.post(url, newUser);
export const login = (user) => axios.post(`${url}/login`, user);
export const updateUser = (id, updatedUser) =>
  axios.patch(`${url}/${id}`, updatedUser);
