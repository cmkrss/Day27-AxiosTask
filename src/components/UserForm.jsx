import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from '../api/userService';

const UserForm = ({ userToEdit, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
    }
  }, [userToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name, email };
    if (userToEdit) {
      await updateUser(userToEdit.id, user);
    } else {
      await createUser(user);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{userToEdit ? 'Edit User' : 'Add User'}</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
