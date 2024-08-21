import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [carinho, setCarinho] = useState([]);

  const adicionaItemAoCarinho = (item) => {
    setCarinho([...carinho, item]);
  };

  useEffect(() => {
    // Lógica para verificar se o usuário está logado
    const loggedIn = false; // Substitua isso pela sua lógica de autenticação
    setIsLoggedIn(loggedIn);
  }, []);

  const login = () => {
    // Lógica de login
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Lógica de logout
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ carinho, adicionaItemAoCarinho, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
