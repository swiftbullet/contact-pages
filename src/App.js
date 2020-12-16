import ContactPage from "./pages/ContactsPage";
import AuthPage from "./pages/AuthPage";
import useAuth from "./hooks/useAuth";

import "./App.css";

function App() {
  const { login, logout, token } = useAuth();
  let isAuthenticated = !!token;
  console.log(isAuthenticated)
  return (
    <div className="App">
      {isAuthenticated ? (
        <ContactPage logout={logout} />
      ) : (
        <AuthPage login={login} />
      )}
    </div>
  );
}

export default App;
