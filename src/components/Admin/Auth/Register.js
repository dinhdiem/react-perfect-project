import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../../services/apiService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await register(email, username, password);

    if (res.EC === 0 && res) {
      toast.success(res.EM);
      navigate("/login");
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
            <label className="form-label">UserName: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Vui lòng nhập email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3 col-12 mx-auto">
            <label className="form-label">Mật khẩu: </label>
            <input
              type={showPass ? "text" : "password"}
              className="form-control"
              placeholder="Vui lòng nhập password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPass ? (
              <button onClick={() => setShowPassword(false)}>
                Hide Password
              </button>
            ) : (
              <button onClick={() => setShowPassword(true)}>
                Show Password
              </button>
            )}
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={handleLogin}>
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
