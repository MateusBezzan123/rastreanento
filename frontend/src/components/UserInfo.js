import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const UserInfo = () => {
  const { auth } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/me', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user info', error);
      }
    };

    fetchUser();
  }, [auth]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-info-container">
      <h2>User Info</h2>
      <div className="user-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default UserInfo;
