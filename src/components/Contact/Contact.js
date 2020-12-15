import { useState } from "react";

import "./Contact.css";

const Contact = ({ contact, setAlert }) => {
  const [contactData, setContactData] = useState(contact);

  const deleteItem = () => {
    fetch(`http://localhost:3000/contacts/${contact.id}`, {
      method: "DELETE",
    });
    setAlert(true);
  };

  const handleChange = (event) => {
    setContactData({ [event.target.name]: event.target.value });
    console.log(contactData);
  };

  return (
    <li key={contact.id} className="contact">
      <input
        className="contact__name"
        type="text"
        name="name"
        id="name"
        onChange={handleChange}
        value={contactData.name || ""}
        autoComplete="off"
      />
      <input
        className="contact__phone-number"
        type="tel"
        name="phoneNumber"
        id="phone-number"
        onChange={handleChange}
        value={contactData.phoneNumber || ""}
      />
      <div className="contact__manage">
        <div className="edit-contact">
          <button id="edit-contact">Edit</button>
        </div>
        <div className="delete-contact">
          <button id="delete-contact" onClick={deleteItem}>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default Contact;
