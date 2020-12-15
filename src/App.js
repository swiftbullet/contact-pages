import { useState, useEffect } from "react";
import Contact from "./components/Contact/Contact";

import "./App.css";

const API_URL = "http://localhost:3000/contacts";

function App() {
  const [alert, setAlert] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 0);
    }
  });

  useEffect(() => {
    let mounted = true;
    if (contacts.length && !alert) {
      return;
    }

    const loadData = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (mounted) {
        setContacts(data);
      }
    };

    loadData();
  }, [contacts, alert]);

  const maxId = Math.max(...contacts.map((contact) => contact.id), 0);

  const fetchData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: maxId + 1,
      name: "Alex Sharp",
      phoneNumber: "030-045-943",
    }),
  };

  const addItem = () => {
    fetch("http://localhost:3000/contacts", fetchData);
    setAlert(true);
  };

  return (
    <div className="App">
      <div className="contacts">
        <div className="add-contact">
          <button id="add-contact" onClick={addItem}>
            Add contact
          </button>
        </div>
        <div className="contacts__list">
          <li className="contact">
            <div className="contact__name">Full name</div>
            <div className="contact__phone-number">Phone number</div>
            <div className="contact__manage">Actions</div>
          </li>
          {[...contacts].reverse().map((contact) => {
            return (
              <Contact key={contact.id} contact={contact} setAlert={setAlert} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
