import React, { useState } from 'react';
import UserList from './components/UserList.jsx';
import UserForm from './components/UserForm.jsx';

const App = () => {
  const [userToEdit, setUserToEdit] = useState(null);

  const handleEdit = (user) => {
    setUserToEdit(user);
  };

  const handleSave = () => {
    setUserToEdit(null);
    // Optionally refresh the user list
  };

  return (
    <div>
      <h1>React Axios CRUD</h1>
      <UserForm userToEdit={userToEdit} onSave={handleSave} />
      <UserList onEdit={handleEdit} />
    </div>
  );
};

export default App;
