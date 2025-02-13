import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { db } from "../../../firebaseconfig/firebaseconfig"; // Ajuste o caminho conforme necessário

// Contexto de Autenticação
export const AuthContext = createContext();

// Provider de Autenticação
export const AuthProvider = ({ children }) => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  // Estados principais
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  // Estados relacionados ao formulário
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



  // Definir os erros iniciais do formulário
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


  const handleSignIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return false;
    }
  };

  // Verificação de autenticação e carregamento do estado do usuário
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  // Função de login com email e senha
  const loginWithEmailAndPasswordHandler = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(userCredential.user));
        localStorage.setItem("isLoggedIn", "true");
    } catch (error) {
        setEmailError("Credenciais inválidas");
        console.error("Erro no login:", error);
    }
};


  // Função de logout
  const logout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // dellicacy363@gmail.com
  // Dellicacy@25

  return (
    <AuthContext.Provider
      value={{
        // Estados de autenticação
        isLoggedIn,
        user,
        loading,
        emailError,
        passwordError,
        loginWithEmailAndPasswordHandler,
        logout,

        // Estados do formulário
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
        handleSignIn,
      }}
    >
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);
