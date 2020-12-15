import { useState } from "react";
import ContactPage from "./pages/ContactsPage";
import AuthPage from "./pages/AuthPage";

import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div className="App">
      {isAuthenticated ? (
        <ContactPage setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <AuthPage setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
}

export default App;
