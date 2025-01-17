import React, { useContext, useEffect, useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
  styled,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Link, useNavigate } from 'react-router-dom'
import { get_users } from '../../api/users'
import { AuthContext } from '../../authcontext'
import './EstiloDeLogin.css'
import { db } from '../../../firebaseconfig/firebaseconfig'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; // Importações necessárias
import { StyleEmptyLoader } from '../../NewSagas/empty/emptyLoader'



export const SignIn = () => {
  const myNewnavigate = useNavigate()
  const { loginWithEmailAndPassword, setIsLoggedIn } = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [abreSenha, setAbreSenha] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await get_users.user.get()
        setUsers(usersData)
      } catch (error) {
        console.error('Erro ao pegar os usuários', error)
      }
    }

    fetchUsers()
  }, [])

  const clearErrors = () => {
    setEmailError('')
    setPasswordError('')
  }

  const validateForm = () => {
    clearErrors()
    let isValid = true

    if (!isValidEmail(email)) {
      setEmailError('O e-mail é obrigatório ou inválido.')
      isValid = false
    }

    if (password.length < 6) {
      setPasswordError('A senha deve ter pelo menos 6 caracteres.')
      isValid = false
    }

    return isValid
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const logarWithPassword = async () => {
    if (!validateForm()) return

    setLoading(true)

    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
    
      const user = userCredential.user;
      const usersCollectionRef = collection(db, 'users');
      const q = query(usersCollectionRef, where('id', '==', user.uid));
      const querySnapshot = await getDocs(q);
      console.log(usersCollectionRef)
      if (!querySnapshot.empty) {
        const userDataList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log(usersCollectionRef)
        const userData = userDataList[0];

        localStorage.setItem('newUser', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', true)
        setIsLoggedIn(true);
        myNewnavigate('/');
      } else {
        console.error('Usuário não encontrado no Firestore');
        return false;
      }
    } catch (error) {
      console.error('Erro ao fazer login', error);
      setEmailError('Credenciais inválidas ou erro ao fazer login');
    } finally {
      setLoading(false); // Para remover o loading, se houver
    }
  }

  return (
    <>
      {loading && (
        <StyleEmptyLoader.containerCardLoader>
          <StyleEmptyLoader.loader sx={{ animation: 'rotation 1s linear infinite' }}>
            <StyleEmptyLoader.loaderAfter />
          </StyleEmptyLoader.loader>
          <div>Logando...</div>
        </StyleEmptyLoader.containerCardLoader>
      )}

      
      <Stack className="container_form">
        <Stack className="conatiner-login">
          <Typography variant="h4">O Delicacy Aguarda por Você!!</Typography>
          <form id="loginForm">
            <Box
              sx={{
                width: '100%',
                borderRadius: '5px',
                outline: 'none',
                marginBottom: '2rem',
              }}
            >
              <TextField
                sx={{ width: '100%', outline: 'none', fontSize: '2.9rem' }}
                type="email"
                label="Digite seu e-mail..."
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => clearErrors()}
              />
              <Typography fontSize={'1.5rem'} color="error">
                {emailError}
              </Typography>
            </Box>

            <Box>
              <TextField
                sx={{
                  width: '100%',
                  borderRadius: '5px',
                  outline: 'none',
                  '& input::placeholder': {
                    fontSize: '2.5rem',
                    fontWeight: '600',
                  },
                }}
                type={abreSenha ? 'text' : 'password'}
                label="Digite uma senha de 6 dígitos..."
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onInput={clearErrors}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setAbreSenha(!abreSenha)}>
                      {abreSenha ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
              <Typography fontSize={'1.5rem'} color="error">
                {passwordError}
              </Typography>
            </Box>

            <Box
              sx={{
                marginBottom: '1rem',
                marginTop: '1rem',
                display: 'flex',
                fontSize: '1.5rem',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                color: '#ff7e00',
              }}
            >
              <Typography sx={{ fontSize: '1.4rem', color: '#1a2428' }}>
                Já tem uma conta?
              </Typography>
              <Link to="/SignUp" className="linkCadastro">
                Cadastrar-se
              </Link>
            </Box>

            <Stack
              sx={{
                marginBottom: '1rem',
                marginTop: '1rem',
                display: 'flex',
                fontSize: '1.5rem',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                color: '#ff7e00',
              }}
            >
              <Button
                sx={{
                  backgroundColor: 'var(--green-color)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 40px',
                  fontSize: '1.6rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  '&:hover': { backgroundColor: 'var(--orange-color)' },
                }}
                className="BotaoLogar"
                type="button"
                onClick={logarWithPassword}
                disabled={loading}
              >
                Logar
              </Button>

              <Button
                onClick={() => myNewnavigate('/ForgotPassword')}
                sx={{
                  color: 'var(--green-color)',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '1.3rem',
                  '&:hover': { textDecoration: 'underline' },
                  '@media (max-width: 750px)': { fontsize: '1,1rem ' },
                }}
              >
                Esqueci minha senha
              </Button>
            </Stack>
          </form>
        </Stack>
      </Stack>
    </>
  )
}
