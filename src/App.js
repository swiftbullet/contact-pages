import { useState, useEffect } from "react";
import Contact from "./components/Contact/Contact";

import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data));
  }, [contacts.length]);

  return (
    <div className="App">
      <div className="contacts">
        <div className="add-contact">
          <button
            id="add-contact"
            onClick={() =>
              fetch("http://localhost:3000/contacts", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: "13",
                  name: "Alex Sharp",
                  phoneNumber: "030-045-943",
                }),
              })
            }
          >
            Add contact
          </button>
        </div>
        <div className="contacts__list">
          {contacts.map((contact) => {
            return (
              <Contact
                key={contact.id}
                id={contact.id}
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
