import React, { useState } from 'react';
import axios from 'axios';

const EditUserForm = ({ user,isNewUser, onCreateUser, onUpdateUser }) => {
  const [name, setName] = useState(isNewUser ? '' : user.name);
  const [username, setUsername] = useState(isNewUser ? '' : user.username);
  const [email, setEmail] = useState(isNewUser ? '' : user.email);
  const[phone,setPhone]=useState(isNewUser ? '' : user.phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, username, email, phone };
    if (isNewUser) {
      onCreateUser(newUser);
    } else {
      const updatedUser = { ...user, name, username, email, phone };
      onUpdateUser(updatedUser);
    }
    axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, updatedUser)
      .then(response => {
        console.log('User updated:', response.data);
        onUpdateUser(response.data);
      })
      .catch(error => {
        console.error('Error updating user: ', error);
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
      <input
        type="number"
        placeholder="Enter phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button type="submit">Update User</button>
    </form>
  );
};

export default EditUserForm;
