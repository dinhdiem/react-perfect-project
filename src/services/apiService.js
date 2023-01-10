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

  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);

  return axios.post(`api/v1/quiz`, data);
};

const getAllQuizForAdmin = () => {
  return axios.get(`api/v1/quiz/all`);
};

const getQuizByOne = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = (data) => {
  return axios.post(`api/v1/quiz-submit`, { ...data });
};

const postCreateQuestionForQuiz = (quiz_id, description, questionImage) => {
  const data = new FormData();

  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", questionImage);

  return axios.post(`api/v1/question`, data);
};

const postCreateAnswerForQuestion = (
  description,
  correct_answer,
  question_id
) => {
  return axios.post(`api/v1/answer`, {
    description,
    correct_answer,
    question_id,
  });
};

const postAssignQuiz = (quizId, userId) => {
  return axios.post(`api/v1/quiz-assign-to-user`, { quizId, userId });
};

const getQuizWithQA = (quizId) => {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};

const postUpsertQA = (data) => {
  return axios.post(`api/v1/quiz-upsert-qa`, { ...data });
};

const logout = (email, refresh_token) => {
  return axios.post(`api/v1/logout`, { email, refresh_token });
};

const getOverView = () => {
  return axios.get("api/v1/overview");
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
  getQuizByOne,
  postSubmitQuiz,
  postCreateQuestionForQuiz,
  postCreateAnswerForQuestion,
  postAssignQuiz,
  getQuizWithQA,
  postUpsertQA,
  logout,
  getOverView,
};
