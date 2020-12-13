import { useState, useEffect } from "react";
// import Contact from "./components/Contact";

import "./App.css";
import Contact from "./components/Contact/Contact";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/contacts")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="App">
      <div className="contacts">
        <div className="add-contact">
          <button id="add-contact" onClick={() => 0}>
            Add contact
          </button>
        </div>
        <div className="contacts__list">
          {data.map((contact) => {
            console.log("contact " + contact.id + " " + contact.name);
            return (
              <Contact
                key={contact.id}
                name={contact.name}
                phoneNumber={contact.phoneNumber}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
