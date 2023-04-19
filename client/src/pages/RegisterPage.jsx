import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../store/api/authApi";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [register, { isError: registerError }] = useRegisterMutation();

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    register({ username, password }).then((res) => {
      if (!res.error) {
        alert("註冊成功，跳轉至登入頁面。。。");
        navigate("/login", { replace: true });
      } else {
        alert(res.error.data);
      }
    });
  };
  return (
    <div>
      <form className="register" onSubmit={handleRegister}>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
