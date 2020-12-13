import React from "react";

import "./Contact.css";

const Contact = (props) => {
  return (
    <div className="contact">
      <div className="contact__name">{props.name}</div>
      <div className="contact__phone-number">{props.phoneNumber}</div>
    </div>
  );
};

export default Contact;
