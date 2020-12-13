import Contact from "./components/Contact";

import "./App.css";

const contact = { name: "Alex Sharp", phoneNumber: "000-001-943" };

const contactData = [contact, contact, contact];

function App() {
  return (
    <div className="App">
      <div className="contacts">
        {contactData.map((contact) => {
          return (
            <Contact name={contact.name} phoneNumber={contact.phoneNumber} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
