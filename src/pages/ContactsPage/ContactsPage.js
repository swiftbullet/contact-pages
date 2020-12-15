import React, { useState, useEffect } from "react";
import Contact from "./../../components/Contact";

import "./ContactsPage.css";

const API_URL = "http://localhost:3000/contacts";

const ContactsPage = ({ setIsAuthenticated }) => {
  const [alert, setAlert] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [addContact, setAddContact] = useState({ name: "", phoneNumber: "" });
  const [emptyAddContact, setEmptyAddContact] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 0);
    }
  });

  useEffect(() => {
    if (emptyAddContact) {
      setTimeout(() => {
        setEmptyAddContact(false);
      }, 3000);
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
    if (addContact.name.trim().length && addContact.phoneNumber.trim().length) {
      console.log(addContact);
      fetch("http://localhost:3000/contacts", fetchData);
      setAlert(true);
      setAddContact({ name: "", phoneNumber: "" });
      console.log("add item");
    } else {
      setAddContact({ name: "", phoneNumber: "" });
      setEmptyAddContact(true);
    }
  };

  const handleChange = (event) => {
    setAddContact({ ...addContact, [event.target.name]: event.target.value });
  };

  const handleEnter = (event) => (event.code === "Enter" ? addItem() : null);

  const filterContacts = (contact) =>
    contact.name.toLowerCase().search(searchQuery.trim().toLowerCase()) !== -1;

  return (
    <div className="contacts">
      <div className="logout">
        <button onClick={() => setIsAuthenticated(false)}>Logout</button>
      </div>
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
              placeholder={
                emptyAddContact && !addContact.name.trim()
                  ? "Name required!"
                  : null
              }
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
              placeholder={
                emptyAddContact && !addContact.phoneNumber.trim()
                  ? "Phone number required!"
                  : null
              }
            />
          </div>
        </div>
      </div>
      <input
        type="search"
        name="search"
        id="search"
        onChange={(event) => setSearchQuery(event.target.value)}
        value={searchQuery}
      />
      <div className="contacts__list">
        <li className="contact">
          <div className="contact__name">Full name</div>
          <div className="contact__phone-number">Phone number</div>
          <div className="contact__manage">Actions</div>
        </li>
        {[...contacts]
          .reverse()
          .filter(filterContacts)
          .map((contact) => {
            return (
              <Contact key={contact.id} contact={contact} setAlert={setAlert} />
            );
          })}
      </div>
    </div>
  );
};

export default ContactsPage;
