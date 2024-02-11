
import React, { createContext, useContext, useState } from 'react';

const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [carinho, setCarinho] = useState([]);

  const adicionaItemAoCarinho = (item) => {
    setCarinho([...carinho, item]);
  };

  return (
    <CarrinhoContext.Provider value={{ carinho, adicionaItemAoCarinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => useContext(CarrinhoContext);
