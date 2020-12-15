import { useState } from "react";

import "./Contact.css";

const Contact = ({ contact, setAlert }) => {
  const [contactData, setContactData] = useState(contact);
  const [choiceDelete, setChoiceDelete] = useState(false);
  // const [choiceEdit, setChoiceEdit] = useState(false);

  const deleteItem = () => {
    fetch(`http://localhost:3000/contacts/${contact.id}`, {
      method: "DELETE",
    });
    setAlert(true);
  };

  const updateItem = () => {
    fetch(`http://localhost:3000/contacts/${contact.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: contactData.id,
        name: contactData.name,
        phoneNumber: contactData.phoneNumber,
      }),
    });
    setAlert(true);
  };

  const handleChange = (event) => {
    setContactData({ ...contactData, [event.target.name]: event.target.value });
  };

  return (
    <li key={contact.id} className="contact">
      <input
        className="contact__name"
        type="text"
        name="name"
        id="name"
        onChange={handleChange}
        onBlur={updateItem}
        value={contactData.name || ""}
        autoComplete="off"
      />
      <input
        className="contact__phone-number"
        type="tel"
        name="phoneNumber"
        id="phone-number"
        onChange={handleChange}
        onBlur={updateItem}
        value={contactData.phoneNumber || ""}
      />
      <div className="contact__manage">
        <div className="delete-contact">
          {choiceDelete ? (
            <div className="delete-choice">
              <button id="confirm-delete" onClick={deleteItem}>
                OK
              </button>
              <button id="cancel-delete" onClick={() => setChoiceDelete(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <button id="delete-contact" onClick={() => setChoiceDelete(true)}>
              Delete
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default Contact;
