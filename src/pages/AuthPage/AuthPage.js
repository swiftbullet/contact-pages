import React, { useState } from "react";

import "./AuthPage.css";

const AuthPage = ({ login }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [authData, setAuthData] = useState({
    // name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setAuthData({ ...authData, [event.target.name]: event.target.value });
  };

  const myHeaders = new Headers();
  myHeaders.append("email", "user@gmail.com");
  myHeaders.append("password", "123456");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("email", "user@gmail.com");
  urlencoded.append("password", "123456");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const handleLogin = () => {
    fetch("http://localhost:3000/login", requestOptions)
      .then((response) => response.json())
      .then((token) => {
        if (token) {
          console.log(token.accessToken)
          login(token.accessToken);
        }
      });
  };

  const handleSignup = () => {
    fetch("http://localhost:3000/register", requestOptions)
      .then((response) => response.json())
      .then((token) => {
        if (token) {
          login(token.accessToken)
        }
      });
  };

  return (
    <div className="Auth">
      <div className="auth-title">Authentication</div>
      <div className="login-signup">
        {isLoginForm ? (
          <div className="login">
            <form method="post">
              <label htmlFor="email">Email</label>
              <input
                className="text-input"
                type="text"
                name="email"
                id="email"
                autoComplete="off"
                onChange={handleChange}
                value={authData.email}
              />
              <label htmlFor="password">Password</label>
              <input
                className="text-input"
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={authData.password}
              />
              <div className="auth-button-wrapper">
                <input type="button" value="Log In" onClick={handleLogin} />
              </div>
            </form>
          </div>
        ) : (
          <div className="signup">
            <form method="post">
              {/* <label htmlFor="">Name</label>
              <input
                className="text-input"
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                onChange={handleChange}
                value={authData.name}
              /> */}
              <label htmlFor="">Email</label>
              <input
                className="text-input"
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={authData.email}
              />
              <label htmlFor="">Password</label>
              <input
                className="text-input"
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={authData.password}
              />
              <div className="auth-button-wrapper">
                <input type="button" value="Sign Up" onClick={handleSignup} />
              </div>
            </form>
          </div>
        )}
      </div>
      {isLoginForm ? (
        <div className="change-auth-option">
          Click{" "}
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              setIsLoginForm(false);
            }}
          >
            here
          </a>{" "}
          to sign up
        </div>
      ) : (
        <div className="change-auth-option">
          Click{" "}
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              setIsLoginForm(true);
            }}
          >
            here
          </a>{" "}
          to log in
        </div>
      )}
    </div>
  );
};

export default AuthPage;
