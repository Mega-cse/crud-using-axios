import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = ({ onAddUser }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, username, email };

    axios.post('https://jsonplaceholder.typicode.com/users', newUser)
      .then(response => {
        console.log('User added:', response.data);
        onAddUser(response.data);
        setName('');
        setUsername('');
        setEmail('');
      })
      .catch(error => {
        console.error('Error adding user: ', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;
