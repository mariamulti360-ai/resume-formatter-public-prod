import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Ou um <CircularProgress /> do MUI
  }

  if (!user || !user.authenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};