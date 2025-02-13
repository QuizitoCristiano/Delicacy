import React, { createContext, useContext, useState, useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  getFirestore
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

import { db } from "../../../firebaseconfig/firebaseconfig";

// Criar o contexto de autenticação
export const AuthContext = createContext();

// Hook personalizado para acessar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provedor de autenticação
export const AuthProvider = ({ children }) => {
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  // Estados do formulário
  const [descricaoModalAberto, setDescricaoModalAberto] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [horaAbertura, setHoraAbertura] = useState("");
  const [horaFechamento, setHoraFechamento] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [descricaoEmpresa, setDescricaoEmpresa] = useState("");
  const [formasDePagamento, setFormasDePagamento] = useState([]);
  const [nomedaEmpresa, setNomedaEmp] = useState("");
  const [fotoLogotipo, setFotoLogotipo] = useState(null);
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [rua, setRua] = useState("");
  const [numeroDoEdificios, setNumeroDoEdificios] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  

  const initialErrors = {
    horaAbertura: "",
    horaFechamento: "",
    email: "",
    password: "",
    telefone: "",
    cnpj: "",
    descricaoEmpresa: "",
    formasDePagamento: "",
    fotoLogotipo: "",
    nomedaEmpresa: "",
    cep: "",
    bairro: "",
    cidade: "",
    estado: "",
    rua: "",
    numeroDoEdificios: "",
  };

  const [erros, setErros] = useState(initialErrors);

  // Função para buscar usuários
  useEffect(() => {
    const userCollectionRef = collection(db, "/useresCompany");
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      const usersData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUsers(usersData);
    };
    getUsers();
  }, []);

  // Monitora o estado de autenticação do usuário
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        console.log("User is logged in:", authUser);
        setUser(authUser);
        setIsLoggedIn(true);
      } else {
        console.log("No user is logged in");
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    return unsubscribe; // unsubscribe on unmount
  }, []);

  // Função de login com email e senha
  const loginWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setIsLoggedIn(true);
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

  // Hook para criar usuário com e-mail e senha
  const [createUserWithEmailAndPassword, newUser, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  // Função de validação do formulário de login
  const validarFormularioClient = (email, password) => {
    let isValid = true;

    if (email.trim() === "") {
      setEmailError("O campo de e-mail da empresa é obrigatório.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.trim() === "") {
      setPasswordError("O campo de senha é obrigatório.");
      isValid = false;
    } else if (!isValidPassword(password)) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  // Função de validação de e-mail
  const isValidEmail = (email) => {
    return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(
      email
    );
  };

  // Função de validação de senha
  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  

  // Função para lidar com o login
  const handleSignIn = async (email, password) => {
    if (validarFormularioClient(email, password)) { // Assuming this is a synchronous function
      try {
        await loginWithEmailAndPassword(email, password);
        return true;
      } catch (error) {
        console.error("Erro ao tentar logar:", error);
        return false;
      }
    }
  
    return false;
  };
  

  const value = {
    descricaoModalAberto,
    setDescricaoModalAberto,
    modalAberto,
    setModalAberto,
    horaAbertura,
    setHoraAbertura,
    horaFechamento,
    setHoraFechamento,
    email,
    setEmail,
    password,
    setPassword,
    telefone,
    setTelefone,
    cnpj,
    setCnpj,
    descricaoEmpresa,
    setDescricaoEmpresa,
    formasDePagamento,
    setFormasDePagamento,
    nomedaEmpresa,
    setNomedaEmp,
    fotoLogotipo,
    setFotoLogotipo,
    cep,
    setCep,
    bairro,
    setBairro,
    cidade,
    setCidade,
    estado,
    setEstado,
    rua,
    setRua,
    numeroDoEdificios,
    setNumeroDoEdificios,
    showPassword,
    setShowPassword,
    erros,
    setErros,
 
    emailError,
    passwordError,
    isLoggedIn,
    logout,
    user,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};










// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /useres/{document} {
//       // Usuários podem acessar apenas seus próprios documentos
//       allow read, write: if request.auth != null && request.auth.uid == resource.data.id;
//     }
//     match /useresCompany/{document} {
//       // Apenas administradores podem acessar documentos da coleção de empresas
//       allow read, write: if request.auth != null && request.auth.token.admin == true;
//     }
//   }
// }
