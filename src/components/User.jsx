import React from 'react';

const User = ({ user, onEdit, onDelete }) => (
  <li>
    {user.name} ({user.email})
    <button onClick={() => onEdit(user)}>Edit</button>
    <button onClick={() => onDelete(user.id)}>Delete</button>
  </li>
);

export default User;
