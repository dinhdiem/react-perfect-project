import axios from "../utils/axiosCustomize";

const createNewUser = (email, password, username, role, img) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", img);

  return axios.post(`/api/v1/participant`, data);
};

const getAllUser = () => {
  return axios.get(`/api/v1/participant/all`);
};

const deleteUser = (id) => {
  return axios.delete(`/api/v1/participant`, { data: { id: id } });
};

const pushUpdateUser = (id, username, role, img) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", img);

  return axios.put(`/api/v1/participant`, data);
};

export { createNewUser, getAllUser, pushUpdateUser, deleteUser };
