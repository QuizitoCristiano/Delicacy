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
import ProductItem from "../componets/Products/frutas"
export const AuthContext = createContext();
const provider = new GoogleAuthProvider();
export const AuthProvider = ({ children }) => {
  const auth = getAuth();
  const firestore = getFirestore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);

  const [carinho, setCarinho] = useState([]);

  const adicionaItemAoCarinho = (item) => {
    setCarinho([...carinho, item]);
  };

  const totalItensCarrinho = carinho.length;



  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [resultados, setResultados] = useState([]);

  const handlePesquisar = () => {
    // Filtra os produtos com base no termo de pesquisa
    const produtos = [...ProductItem, ...ProductItemLegume]; // Combina os arrays de produtos
    const resultadosFiltrados = produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
    );

    // Se houver resultados correspondentes, atualiza o estado
    // Caso contrário, sugere um nome parecido
    if (resultadosFiltrados.length > 0) {
      setResultados(resultadosFiltrados);
    } else {
      // Aqui você pode implementar a lógica para sugerir um nome parecido
      setResultados([{ id: -1, nome: `Nenhum resultado encontrado para "${termoPesquisa}". Tente novamente.` }]);
    }
  };




  const checkUserAuthentication = () => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInStatus === "true");

    if (loggedInStatus === "true") {
      const userDataFromLocalStorage = JSON.parse(localStorage.getItem("user"));
      setUser(userDataFromLocalStorage);
    }

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = checkUserAuthentication();
    return () => unsubscribe();
  }, []);

  const login = async (userData) => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      const usersRef = collection(firestore, "users");
      const querySnapshot = await getDocs(
        query(usersRef, where("email", "==", user.email))
      );
      const existingUser = querySnapshot.docs[0];

      if (existingUser) {
        const userData = { name: user.displayName };
        await updateDoc(doc(usersRef, existingUser.id), userData);
        setUser(existingUser.data());
      } else {
        const newUser = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };

        await setDoc(doc(usersRef, user.uid), newUser);
        setUser(newUser);
      }

      login(user);
    } catch (error) {
      setOpen(true);
      const errorMessage = error.message || "Ocorreu um erro ao fazer login.";
      setMessage(errorMessage);
    }
  };

  const loginWithEmailAndPassword = async (email, password) => {
    try {
      if (!email || !password) return;

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      login(userCredential.user);
    } catch (error) {
      setOpen(true);
      const errorMessage = error.message || "Ocorreu um erro ao fazer login.";
      setMessage(errorMessage);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        loginWithGoogle,
        loginWithEmailAndPassword,
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
