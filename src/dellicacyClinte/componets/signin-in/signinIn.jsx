import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  addDoc,
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc 
} from 'firebase/firestore'

import { AuthContext } from '../../authcontext';
import { db } from '../../../../firebaseconfig/firebaseconfig';
import { StyleEmptyLoader } from '../../NewSagas/empty/emptyLoader';
import './EstiloDeLogin.css';

export const SignIn = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const validateForm = () => {
    clearErrors();
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError('O e-mail é obrigatório ou inválido.');
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError('A senha deve ter pelo menos 6 caracteres.');
      isValid = false;
    }

    return isValid;
  };

  const logInWithEmailAndPassword = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        localStorage.setItem('newUser', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
        navigate('/');
      } else {
        setEmailError('Usuário não encontrado no sistema.');
      }
    }  catch (error) {
      // Tratamento de erros de autenticação
      console.error('Erro de login:', error.message, error.code);
      if (error.code === 'auth/user-not-found') {
        setEmailError('Usuário não encontrado. Verifique o e-mail digitado.');
      } else if (error.code === 'auth/wrong-password') {
        setPasswordError('Senha incorreta. Tente novamente.');
      } else {
        setEmailError('Erro ao fazer login. Por favor, tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

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
          <form id="loginForm" onSubmit={(e) => e.preventDefault()}>
            <Box sx={{ width: '100%', mb: 3 }}>
              <TextField
                fullWidth
                type="email"
                label="Digite seu e-mail..."
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={clearErrors}
                error={!!emailError}
                helperText={emailError}
              />
            </Box>

            <Box sx={{ width: '100%', mb: 3 }}>
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label="Digite sua senha..."
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={clearErrors}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            </Box>

            <Stack direction="row" justifyContent="space-between" mb={3}>
              <Typography sx={{ fontSize: '1.4rem', color: '#1a2428' }}>Já tem uma conta?</Typography>
              <Link to="/SignUp" className="linkCadastro">
                Cadastrar-se
              </Link>
            </Stack>

            <Stack direction="row" justifyContent="space-between" mb={3}>
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
                onClick={logInWithEmailAndPassword}
                disabled={loading}
              >
                Logar
              </Button>
              <Button onClick={() => navigate('/ForgotPassword')} 
             sx={{
              color: '#3cb815',
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
  );
};
