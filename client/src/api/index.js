import axios from "axios";

const url = "http://localhost:5000/users";

export const getUser = (id) => axios.get(`${url}/${id}`);
export const fetchUsers = () => axios.get(url);
export const createUser = (newUser) => axios.post(url, newUser);
export const login = (user) => axios.post(`${url}/login`, user);
export const updateUser = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);
