import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/me', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Erro ao buscar informações do usuário', error);
      }
    };

    fetchUser();
  }, [auth]);

  const handleLogout = () => {
    setAuth(null);
    navigate('/login');
  };

  if (!user) return <div>Carregando...</div>;

  return (
    <div className="user-info-container">
      <h2>Informações do Usuário</h2>
      <div className="user-info">
        <p><strong>Nome:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <button onClick={handleLogout} style={{ marginTop: '10px' }}>Logout</button>
    </div>
  );
};

export default UserInfo;
