import React from "react";

import "./Contact.css";

const Contact = (props) => {
  return (
    <li key={props.id} className="contact">
      <div className="contact__name">{props.name}</div>
      <div className="contact__phone-number">{props.phoneNumber}</div>
      <div className="contact__manage">
        <div className="edit-contact">
          <button id="edit-contact">Edit</button>
        </div>
        <div className="delete-contact">
          <button
            id="delete-contact"
            onClick={() => {
              fetch(`http://localhost:3000/contacts/${props.id}`, {
                method: "DELETE",
              });
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default Contact;
