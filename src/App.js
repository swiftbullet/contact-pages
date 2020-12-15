import { useState, useEffect } from "react";
import Contact from "./components/Contact/Contact";

import "./App.css";

const API_URL = "http://localhost:3000/contacts";

function App() {
  const [alert, setAlert] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [addContact, setAddContact] = useState({ name: "", phoneNumber: "" });

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

    loadData({ name: "", phoneNumber: "" });
  }, [contacts, alert]);

  const maxId = Math.max(...contacts.map((contact) => contact.id), 0);

  const fetchData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: maxId + 1,
      name: addContact.name,
      phoneNumber: addContact.phoneNumber,
    }),
  };

  const addItem = () => {
    fetch("http://localhost:3000/contacts", fetchData);
    setAlert(true);
    setAddContact({ name: "", phoneNumber: "" });
    console.log("add item")
  };

  const handleChange = (event) => {
    setAddContact({ ...addContact, [event.target.name]: event.target.value });
  };

  const handleEnter = (event) => (event.code === "Enter" ? addItem() : null);

  return (
    <div className="App">
      <div className="contacts">
        <div className="add-contact">
          <button id="add-contact" onClick={addItem}>
            Add contact
          </button>
          <div className="add-contact__data">
            <div className="add-contact__column">
              <div className="add-contact__title">Full name</div>
              <input
                className="add-contact__input"
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                onChange={handleChange}
                onKeyDown={handleEnter}
                value={addContact.name}
              />
            </div>
            <div className="add-contact__column">
              <div className="add-contact__title">Phone number</div>
              <input
                className="add-contact__input"
                type="tel"
                name="phoneNumber"
                id="phone-number"
                onChange={handleChange}
                onKeyDown={handleEnter}
                value={addContact.phoneNumber}
              />
            </div>
          </div>
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
