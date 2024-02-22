import React, { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext();

// Create a custom hook to use the context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the application
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    // Simulate login logic
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Simulate logout logic
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
