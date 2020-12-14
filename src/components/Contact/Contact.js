import React from "react";

import "./Contact.css";

const Contact = (props) => {
  const deleteItem = () => {
    fetch(`http://localhost:3000/contacts/${props.id}`, {
      method: "DELETE",
    });
    props.setAlert(true);
  };

  return (
    <li key={props.id} className="contact">
      <input
        className="contact__name"
        type="text"
        name="name"
        id="name"
        value={props.name}
      />
      <input
        className="contact__phone-number"
        type="tel"
        name="phone-number"
        id="phone-number"
        value={props.phoneNumber}
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
