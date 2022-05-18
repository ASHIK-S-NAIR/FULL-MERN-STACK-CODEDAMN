import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8003/api/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (data.user) {
        localStorage.setItem("token", data.token);

        alert("Login Successfull");
        window.location.href = "/dashboard";
        // navigate("/dashboard")
      } else {
        alert("Please check your username and password");
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="button" value="Login" onClick={loginUser} />
      </form>
    </div>
  );
}

export default Login;
