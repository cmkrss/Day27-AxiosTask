import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../api/userService';
import User from './User';

const UserList = ({ onEdit }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <User key={user.id} user={user} onEdit={onEdit} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
