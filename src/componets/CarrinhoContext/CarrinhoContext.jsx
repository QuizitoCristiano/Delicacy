import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [carinho, setCarinho] = useState([]);

  const adicionarNovoItem = (produto) => {
    const itemExistenteIndex = carinho.findIndex(
      (item) => item.nome === produto.nome && item.price === produto.price
    );

    if (itemExistenteIndex !== -1) {
      // Incrementa a quantidade do item existente
      const novoCarrinho = [...carinho];
      novoCarrinho[itemExistenteIndex].quantidade++;
      setCarinho(novoCarrinho);
    } else {
      // Adiciona um novo item ao carrinho
      const novoItem = { ...produto, quantidade: 1 };
      setCarinho([...carinho, novoItem]);
    }
  };

  const incrementarQuantidade = (index) => {
    const novoCarrinho = [...carinho];
    novoCarrinho[index].quantidade++;
    setCarinho(novoCarrinho);
  };

  const removerItem = (index) => {
    const novoCarrinho = [...carinho];
    if (novoCarrinho[index].quantidade > 1) {
      novoCarrinho[index].quantidade--;
    } else {
      novoCarrinho.splice(index, 1);
    }
    setCarinho(novoCarrinho);
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
    <AuthContext.Provider value={{ carinho, adicionarNovoItem, incrementarQuantidade, removerItem, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
