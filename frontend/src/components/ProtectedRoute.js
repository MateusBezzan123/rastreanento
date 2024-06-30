import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { auth } = useContext(AuthContext);
  return auth ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;