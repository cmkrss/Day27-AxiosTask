import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../api/userApi';
import UserForm from './UserForm';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleClose = () => {
    setEditingUser(null);
  };

  return (
    <div className="user-list">
      <h2>User List</h2>
      <UserForm user={editingUser} onClose={handleClose} onUserAdded={(newUser) => {
        if (editingUser) {
          setUsers(users.map(user => (user.id === newUser.id ? newUser : user)));
        } else {
          setUsers([...users, newUser]);
        }
        handleClose();
      }} />
      {loading ? <p>Loading...</p> : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <div>
                <h3>{user.name}</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Website:</strong> <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
                <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
                <p><strong>Company:</strong> {user.company.name}</p>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
