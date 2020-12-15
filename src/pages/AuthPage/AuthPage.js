import React from "react";

import "./AuthPage.css";

const AuthPage = ({ setIsAuthenticated }) => {
  return (
    <div className="Auth">
      Auth{" "}
      <div className="login">
        <button onClick={() => setIsAuthenticated(true)}>Login</button>
      </div>
    </div>
  );
};

export default AuthPage;
