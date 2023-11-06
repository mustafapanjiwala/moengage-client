import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../user_context.js";
import "./Login.css";
import { BASE_URL } from "../../config.local.js";
const Login = () => {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await axios
        .post(`${BASE_URL}/login`, {
          email,
          password,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data === "exist") {
            login({ email, password });
            history("/home");
          } else if (res.data === "notexist") {
            alert("No account exists with this email. Please sign up first.");
          }
        })
        .catch((err) => {
          alert("Wrong Details");
          console.log(err);
        });
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  }

  return (
    <div className="center-container">
      <div className="login-container">
        <h2 className="login-head">Login</h2>
        <form action="POST" className="login-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button onClick={handleLogin} className="login-button">
            Login
          </button>
        </form>
        <br />
        <p>
          Don't have an account? Sign up <Link to="/signup">here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
