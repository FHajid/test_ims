import React, { useState, useEffect } from 'react';
import './css/hitung.css';

function ComponentOne({ changeComponent }) {
  const [name, setName] = useState('');
  const [otk, setOtk] = useState('');
  const [contacts, setContacts] = useState([]);

  // Load data from local storage on startup
  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(savedContacts);
  }, []);

  // Save data to local storage whenever contacts change
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = () => {
    if (name.trim() === '' || otk.trim() === '') {
      alert('Please enter both Name and OTK');
      return;
    }

    const newContact = {
      id: contacts.length + 1,
      name,
      otk
    };

    setContacts([...contacts, newContact]);
    setName('');
    setOtk('');
  };

  return (
    <div className="componentone">
      <h2>📋 Add Contact</h2>

      {/* Input Form */}
      <div className="form-container">
        <input 
          type="text" 
          placeholder="Enter Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Enter OTK (Numbers Only)" 
          value={otk} 
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ''); // Only allow numbers
            setOtk(value);
          }}
        />
        <button onClick={addContact}>➕ Add Contact</button>
      </div>

      {/* Contact Table */}
      <div className="table-container">
        <h2> Saved Contacts</h2>
        {contacts.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Kontak No</th>
                <th>Name</th>
                <th>OTK</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.id}</td>
                  <td>{contact.name}</td>
                  <td>{contact.otk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No contacts added yet.</p>
        )}
      </div>
    </div>
  );
}

export default ComponentOne;
