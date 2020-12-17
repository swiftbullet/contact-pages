import React, { useState } from "react";

import "./AuthPage.css";

const BASE_URL = "http://localhost:3000";
const LOGIN_ROUTE = BASE_URL + "/login";
const SIGNUP_ROUTE = BASE_URL + "/register";

const AuthPage = ({ login }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(" ");
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setAuthData({ ...authData, [event.target.name]: event.target.value });
  };

  const makeRequestOptions = (data, method) => {
    const urlencoded = new URLSearchParams();
    for (const item in data) {
      urlencoded.append(item, data[item]);
    }

    return {
      method: method,
      body: urlencoded,
      redirect: "follow",
    };
  };

  const requestOptions = makeRequestOptions(authData, "POST");

  const makeRequest = (route, requestOptions) => {
    fetch(route, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((token) => {
        if (token) {
          login(token.accessToken);
        }
      })
      .catch((error) => {
        error.text().then((errorMessage) => {
          setErrorMessage(errorMessage);
          console.log(errorMessage);
        });
      });
  };

  const handleLogin = () => {
    makeRequest(LOGIN_ROUTE, requestOptions);
  };

  const handleSignup = () => {
    makeRequest(SIGNUP_ROUTE, requestOptions);
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
              <div className="error-display">{errorMessage}</div>
              <div className="auth-button-wrapper">
                <input type="button" value="Log In" onClick={handleLogin} />
              </div>
            </form>
          </div>
        ) : (
          <div className="signup">
            <form method="post">
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
