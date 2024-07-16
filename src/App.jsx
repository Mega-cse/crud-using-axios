import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import UserList from './components/UserList';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  };

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const deleteUser = (userId) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch(error => {
        console.error('Error deleting user: ', error);
      });
  };

  const editUser = (user) => {
    setEditingUser(user);
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    setEditingUser(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Axios</h1>
      </header>
      <div className="App-body">
        {editingUser ? (
          <div>
            <h2>Edit User</h2>
            <EditUserForm user={editingUser} onUpdateUser={updateUser} />
          </div>
        ) : (
          <div>
            <AddUserForm onAddUser={addUser} />
            <UserList users={users} onDeleteUser={deleteUser} onEditUser={editUser} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
