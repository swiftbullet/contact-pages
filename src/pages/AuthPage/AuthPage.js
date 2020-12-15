import React, { useState } from "react";

import "./AuthPage.css";

const AuthPage = ({ setIsAuthenticated }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  return (
    <div className="Auth">
      <button onClick={() => setIsAuthenticated(true)}>Login</button>
      <div className="auth-title">Auth</div>
      {isLoginForm ? (
        <div className="login">
          <form action="" method="post">
            <label htmlFor="">Name</label>
            <input type="text" name="name" id="name" />
            <label htmlFor="">Password</label>
            <input type="password" name="password" id="password" />
            <input type="submit" value="Log In" />
          </form>
        </div>
      ) : (
        <div className="signup">
          <form action="" method="post">
            <label htmlFor="">Name</label>
            <input type="text" name="name" id="name" />
            <label htmlFor="">Email</label>
            <input type="email" name="" id="" />
            <label htmlFor="">Password</label>
            <input type="password" name="password" id="password" />
            <input type="submit" value="Sign Up" />
          </form>
        </div>
      )}
      {isLoginForm ? (
        <button onClick={() => setIsLoginForm(false)}>Sign Up</button>
      ) : (
        <button onClick={() => setIsLoginForm(true)}>Log In</button>
      )}
    </div>
  );
};

export default AuthPage;
