import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/api/authApi";
import { useDispatch } from "react-redux";
import { login } from "../store/reducer/authSlice";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginFn, { error: loginError }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    loginFn({ username, password }).then((res) => {
      if (!res.error) {
        dispatch(login({ token: res.data.token, username, id: res.data.id }));
        alert("登入成功");
        navigate("/");
      } else {
        alert(res.error.data);
      }
    });
  };

  return (
    <div>
      <form className="login" onSubmit={handleLogin}>
        <h1>Login</h1>
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
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
