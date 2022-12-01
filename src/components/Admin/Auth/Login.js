import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../../services/apiService";
import { fetchUserLogin } from "../../../redux/action/userAction";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const res = await login(email, password);

    if (res.EC === 0 && res) {
      dispatch(fetchUserLogin(res));
      toast.success(res.EM);
      navigate("/");
    }

    if (res.EC !== 0 && res) {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <div className="mt-5">
        <div className="border col-4 mx-auto p-5">
          <h2 className="text-center mb-5">Đăng nhập</h2>
          <div className="mb-3 col-12 mx-auto">
            <label className="form-label">Email: </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
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
            />
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={handleLogin}>
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
