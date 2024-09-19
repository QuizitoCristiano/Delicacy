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
import { db } from "../../firebaseconfig/firebaseconfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = getAuth();
  const firestore = getFirestore();
  const provider = new GoogleAuthProvider();

  // Estados principais
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newUser, setNewUser] = useState(null);

  const [user, setUser] = useState(null);
  const [carinho, setCarinho] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [resultados, setResultados] = useState([]);

  // Função para adicionar ou incrementar um item no carinho
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
      // Adiciona um novo item ao carinho
      const novoItem = { ...produto, quantidade: 1 };
      setCarinho([...carinho, novoItem]);
    }
  };

  // Função para incrementar a quantidade de um item no carinho
  const incrementarQuantidade = (index) => {
    const novoCarrinho = [...carinho];
    novoCarrinho[index].quantidade++;
    setCarinho(novoCarrinho);
  };



 // Função para remover um item do carinho
const removerItem = (index) => {
  const novoArray = carinho.filter((_, i) => i !== index);
  setCarinho(novoArray);
};

 // Função para decrementar a quantidade de um item no carinho ou removê-lo se houver apenas 1 unidade
 const decrementarQuantidade = (index) => {
  const novoCarrinho = [...carinho];
  if (novoCarrinho[index].quantidade > 1) {
    // Se a quantidade for maior que 1, apenas decrementa
    novoCarrinho[index].quantidade--;
  } else {
    // Se a quantidade for 1, remove o item do carrinho
    const novoArray = novoCarrinho.filter((_, i) => i !== index);
    setCarinho(novoArray);
  }
  setCarinho(novoCarrinho);
};
  // Total de itens no carinho
  const totalItensCarrinho = carinho.length;

  // Função de pesquisa
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

  // Verificação de autenticação (usuário logado)
  useEffect(() => {
    const getUser = localStorage.getItem('newUser'|| null) ;
    const getIsLoged = localStorage.getItem('isLoggedIn')
    if (getIsLoged) {
      setIsLoggedIn(getIsLoged);
    }
    if (getUser) {
      setNewUser(JSON.parse(getUser));
      setUser(JSON.parse(getUser));
    }
    const fetchUserData = async (authUser) => {
      try {
        const usersCollectionRef = collection(db, 'users');
        const q = query(usersCollectionRef, where('id', '==', authUser.uid)); // Consulta Firestore
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDataList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          const userData = userDataList[0];
          console.log(userData)
          return userData;
        } else {
          console.error('Usuário não encontrado no Firestore');
          return null;
        }
      } catch (error) {
        console.error('Erro ao buscar dados do Firestore:', error);
      }
    };
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        fetchUserData(authUser);
      } else {
        console.log('Usuário não autenticado');
      }
    });
    return () => unsubscribe();
  }, [auth]);
  const loginWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      setUser(userCredential.user);
      
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Logout
  const logout = async () => {
    await auth.signOut();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
    value={{
      isLoggedIn,
      setIsLoggedIn,
      loginWithEmailAndPassword,
      logout,
      user,
      carinho,
      setCarinho,
      adicionarNovoItem,
      incrementarQuantidade,
      decrementarQuantidade, // Mantém decrementarQuantidade
      removerItem, // Agora removerItem está definido e sendo passado
      totalItensCarrinho,
      termoPesquisa,
      setTermoPesquisa,
      resultados,
      setResultados,
      handlePesquisar,
      newUser
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto
export const useAuth = () => useContext(AuthContext);
