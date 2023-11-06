import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../user_context.js";
import "../Login/Login.css";
import { BASE_URL } from "../../config.local.js";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);

  const history = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await axios
        .post(`${BASE_URL}/signup`, { email, password })
        .then((res) => {
          console.log(res.data);
          if (res.data === "exist") {
            alert("User already exists");
          } else if (res.data === "notexist") {
            history("/home", { state: { id: email } });
            login({ email, password });
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
        <h2 className="login-head">Signup</h2>
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
            Sign up
          </button>
        </form>
        <br />
        <p>
          Already have an account? Login <Link to="/">here</Link>
        </p>
      </div>
    </div>
  );
};
export default Signup;
