import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../../services/apiService";
import { fetchUserLogin } from "../../../redux/action/userAction";
import { ImSpinner3 } from "react-icons/im";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    const res = await login(email, password);

    if (res.EC === 0 && res) {
      dispatch(fetchUserLogin(res));
      toast.success(res.EM);
      setIsLoading(false);
      navigate("/");
    }

    if (res.EC !== 0 && res) {
      setIsLoading(false);
      toast.error(res.EM);
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleLogin();
    }
  };

  return (
    <>
      <div className="login-container mt-5">
        <div className="border col-4 mx-auto p-5">
          <h2 className="text-center mb-5">Đăng nhập</h2>
          <div className="mb-3 col-12 mx-auto">
            <label className="form-label">Email: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Vui lòng nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 col-12 mx-auto">
            <label className="form-label">Mật khẩu: </label>
            <input
              type="password"
              className="form-control"
              placeholder="Vui lòng nhập password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(event) => handleKeyDown(event)}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-dark d-flex align-items-center gap-2 w-100 justify-content-center"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading === true && <ImSpinner3 className="loadingIcon" />}
              <span>Đăng nhập</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
