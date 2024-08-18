import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from '../api/userApi';

const UserForm = ({ user, onClose, onUserAdded }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [company, setCompany] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
      setEmail(user.email);
      setPhone(user.phone);
      setWebsite(user.website);
      setAddress(user.address.street);
      setCompany(user.company.name);
    } else {
      setName('');
      setUsername('');
      setEmail('');
      setPhone('');
      setWebsite('');
      setAddress('');
      setCompany('');
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { name, username, email, phone, website, address: { street: address }, company: { name: company } };

    try {
      if (user) {
        await updateUser(user.id, userData);
        onUserAdded({ ...user, ...userData });
      } else {
        const response = await createUser(userData);
        onUserAdded(response.data);
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <div className="user-form">
      <form onSubmit={handleSubmit}>
        <h3>{user ? 'Edit User' : 'Add User'}</h3>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Phone:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <label>
          Website:
          <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </label>
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <label>
          Company:
          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default UserForm;
