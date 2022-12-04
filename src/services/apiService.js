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

const getUserPaginate = (page, limit) => {
  return axios.get(`/api/v1/participant?page=${page}&limit=${limit}`);
};

const login = (email, password) => {
  return axios.post(`/api/v1/login`, { email, password });
};

const register = (email, username, password) => {
  return axios.post(`/api/v1/register`, { email, username, password });
};

const getQuizbyUser = () => {
  return axios.get(`api/v1/quiz-by-participant`);
};

const createQuiz = (description, name, difficulty, quizImage) => {
  const data = new FormData();

  console.log(description, name, difficulty, quizImage);

  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);

  return axios.post(`api/v1/quiz`, data);
};

const getAllQuizForAdmin = () => {
  return axios.get(`api/v1/quiz/all`);
};

export {
  createNewUser,
  getAllUser,
  pushUpdateUser,
  deleteUser,
  getUserPaginate,
  login,
  register,
  getQuizbyUser,
  createQuiz,
  getAllQuizForAdmin,
};
