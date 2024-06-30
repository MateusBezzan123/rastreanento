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
        console.error('Erro ao buscar informações do usuário', error);
      }
    };

    fetchUser();
  }, [auth]);

  if (!user) return <div>Carregando...</div>;

  return (
    <div className="user-info-container">
      <h2>Informações do Usuário</h2>
      <div className="user-info">
        <p><strong>Nome:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default UserInfo;
