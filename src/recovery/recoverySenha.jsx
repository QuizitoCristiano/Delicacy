import React, { useState } from 'react';
import { TextField, Typography, Stack, Box, Button, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

// Estilização para a tela de carregamento
const ContainerCardLaoder = styled(Stack)(({ theme }) => ({
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '10px',
  color: 'white',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  height: '100vh',
  width: '100%',
  zIndex: 9000,
  top: 0,
  left: 0,
}));

const Loader = styled(Box)(({ theme }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  display: 'inline-block',
  borderTop: '4px solid #3cb815',
  borderRight: '4px solid transparent',
  boxSizing: 'border-box',
  animation: 'rotation 1s linear infinite',
  position: 'relative',
}));

const LoaderAfter = styled(Box)(({ theme }) => ({
  content: "''",
  boxSizing: 'border-box',
  position: 'absolute',
  left: 0,
  top: 0,
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  borderBottom: '4px solid #f75f1d',
  borderLeft: '4px solid transparent',
}));

const globalStyles = `
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigateForSignIn = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    setLoading(true);

    if (email.trim() === '' || !isValidEmail(email)) {
      setError('Por favor, insira um e-mail válido.');
      setLoading(false);
      return;
    }

    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('E-mail de recuperação de senha enviado com sucesso!');
      
      // Exibir loader por até 3 segundos
      setTimeout(() => {
        setLoading(false);
        navigateForSignIn('/SignIn');
      }, 2000); // 3000 milissegundos = 3 segundos
    } catch (error) {
      setLoading(false);
      setError('Erro ao enviar o e-mail de recuperação. Verifique o e-mail inserido.');
    }
  };

  return (
    <>
      {loading && (
        <ContainerCardLaoder>
          <Loader sx={{ animation: 'rotation 1s linear infinite' }}>
            <LoaderAfter />
          </Loader>
          <div>Logando...</div>
        </ContainerCardLaoder>
      )}

      <Stack
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100vh',
          width: '100%',
          backgroundColor: 'var(--bg-color)',
        }}
      >
        <Box
          sx={{
            width: '659px',
            gap: '2.6rem',
            borderRadius: '1rem',
            display: 'flex',
            padding: '20px',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 25%)',
            flexDirection: 'column',
            '@media (max-width: 750px)': {
              width: '96%',
            },
          }}
        >
          <Stack
            sx={{
              paddingBottom: '1.8rem',
              color: 'var(--green-color)',
              fontSize: '1.3rem',
              gap: '0.9rem',
              width: '100%',
              fontWeight: 800,
              '@media (max-width: 550px)': {
                fontSize: '2rem',
              },
            }}
          >
            <h4>Recuperar Senha</h4>
          </Stack>

          <TextField
            sx={{
              width: '100%',
              fontSize: '1.4rem',
              '& .MuiFormHelperText-root': {
                fontSize: '1.4rem',
                color: 'red',
                fontWeight: 600,
              },
            }}
            type="text"
            label="E-mail"
            id="email"
            placeholder="Insira o e-mail cadastrado"
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <Box
            sx={{
              marginTop: '2rem',
              gap: '2rem',
              display: 'flex',
              padding: '1rem',
              width: '100%',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            <Button
              onClick={() => navigateForSignIn('/SignIn')}
              disabled={loading}
              sx={{
                fontSize: '1.3rem',
                color: '#fff',
                padding: '12px 28px',
                marginLeft: '1rem',
                boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 40%)',
                backgroundColor: 'var(--light-orange-color)',
                ':hover': {
                  boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 25%)',
                  backgroundColor: 'var(--light-orange-color)',
                },
              }}
            >
              Voltar
            </Button>

            <Button
              sx={{
                display: 'inline-block',
                padding: '12px 28px',
                backgroundColor: 'var(--green-color)',
                boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 40%)',
                borderRadius: '5px',
                color: 'var(--bg-color)',
                fontSize: '1rem',
                letterSpacing: '1px',
                fontWeight: 600,
                transition: 'all 0.45s ease',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                ':hover': {
                  background: 'var(--light-orange-color)',
                  border: 'none',
                  boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 25%)',
                  outline: 'none',
                  color: 'var(--bg-color)',
                  transition: 'all 0.45s ease',
                },
              }}
              onClick={handleResetPassword}
              disabled={loading}
            >
              Enviar Link de Redefinição
            </Button>
          </Box>

          {successMessage && (
            <Typography sx={{ color: 'green', marginTop: '1rem', fontSize: '1.4rem' }}>
              {successMessage}
            </Typography>
          )}

          {error && (
            <Typography sx={{ color: 'red', marginTop: '1rem', fontSize: '1.4rem' }}>
              {error}
            </Typography>
          )}
        </Box>
      </Stack>
    </>
  );
};
