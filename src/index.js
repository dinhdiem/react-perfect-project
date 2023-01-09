import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import User from "./components/User/User";
import Home from "./components/HomePage/Home";
import Dashboard from "./components/Admin/Content/Dashboard";
import ManagerUser from "./components/Admin/Content/ManagerUser";
import { ToastContainer } from "react-toastify";
import Login from "./components/Admin/Auth/Login";
import Register from "./components/Admin/Auth/Register";
import { PersistGate } from "redux-persist/integration/react";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";
import DetailQuiz from "./components/User/detailQuiz";
import Questions from "./components/Admin/Content/Question/Questions";
import PrivateRouter from "./routes/PrivateRouter";
import "./utils/i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));

const NotFound = () => {
  return (
    <div className="alert alert-danger mx-5 mt-3">404. Not Found URL !!</div>
  );
};
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route
              path="users"
              element={
                <PrivateRouter>
                  <User />
                </PrivateRouter>
              }
            />
          </Route>
          <Route path="/quiz/:id" element={<DetailQuiz />} />
          <Route
            path="admin"
            element={
              <PrivateRouter>
                <Admin />
              </PrivateRouter>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="manage-users" element={<ManagerUser />} />
            <Route path="manage-quiz" element={<ManageQuiz />} />
            <Route path="manage-question" element={<Questions />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        draggable
        pauseOnHover
        rtl={false}
        hideProgressBar={false}
        newestOnTop={false}
      />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
