import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import ProductItemLegume from "../componets/ProductsLegumes/legunes";
import ProductItem from "../componets/Products/frutas";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = getAuth();
  const firestore = getFirestore();
  const provider = new GoogleAuthProvider();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);  // Inicializar com null
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [carinho, setCarinho] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [resultados, setResultados] = useState([]);

  const adicionaItemAoCarinho = (item) => {
    setCarinho([...carinho, item]);
  };

  const totalItensCarrinho = carinho.length;

  const handlePesquisar = () => {
    const produtos = [...ProductItem, ...ProductItemLegume];
    const resultadosFiltrados = produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
    );

    if (resultadosFiltrados.length > 0) {
      setResultados(resultadosFiltrados);
    } else {
      setResultados([{ id: -1, nome: `Nenhum resultado para "${termoPesquisa}". Tente novamente.` }]);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        console.log('User is logged in:', authUser);
        setUser(authUser);
        setIsLoggedIn(true);
      } else {
        console.log('No user is logged in');
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);


 const loginWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      setUser(userCredential.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    await auth.signOut();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loginWithEmailAndPassword,
      
        logout,
        user,
        carinho,
        setCarinho,
        adicionaItemAoCarinho,
        totalItensCarrinho,
        termoPesquisa,
        setTermoPesquisa,
        resultados,
        setResultados,
        handlePesquisar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
