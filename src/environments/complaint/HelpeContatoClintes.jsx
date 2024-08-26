import React, { useState } from 'react';
import {
  Button,
  Box,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
  styled,
} from '@mui/material';
import InputMask from 'react-input-mask';

const StepCardsclient = () => {
  const [Usernome, setNomeUser] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [telefoneUser, setTelefoneUser] = useState('');
  const [mensagemUser, setMensagemUser] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [nomeError, setNomeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [telefoneError, setTelefoneError] = useState('');
  const [mensagemError, setMensagemError] = useState('');
  const [loading, setLoading] = useState(false);

  const [selectedNewFile, setSelectedNewFile] = useState(null);

  const ContainerCardLoader = styled(Stack)(({ theme }) => ({
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

  const handleFileChange = (event) => {
    setSelectedNewFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;

    if (Usernome.trim() === '') {
      setNomeError('O nome é obrigatório');
      hasError = true;
    } else {
      setNomeError('');
    }

    if (mensagemUser.trim() === '') {
      setMensagemError('A mensagem é obrigatória');
      hasError = true;
    } else if (mensagemUser.length < 20) {
      setMensagemError('A mensagem não pode ter menos de 20 caracteres');
      hasError = true;
    } else {
      setMensagemError('');
    }

    if (!isValidEmail(emailUser)) {
      setEmailError('Formato de email inválido');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (telefoneUser.trim() === '') {
      setTelefoneError('O telefone é obrigatório');
      hasError = true;
    } else if (!validaTelefone(telefoneUser)) {
      setTelefoneError('Formato de telefone inválido');
      hasError = true;
    } else {
      setTelefoneError('');
    }

    if (!hasError) {
      setLoading(true);
      setSuccessMessage('Sua mensagem foi enviada com sucesso!');

      // Exibir o loader por 2 segundos
      setTimeout(() => {
        // Remover loader e limpar campos
        setLoading(false);
        setSuccessMessage('');

        // Limpar os inputs e as mensagens de erro
        setNomeUser('');
        setEmailUser('');
        setTelefoneUser('');
        setMensagemUser('');

        setNomeError('');
        setEmailError('');
        setTelefoneError('');
        setMensagemError('');
      }, 2000);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validaTelefone = (telefone) => {
    const cleanedPhoneNumber = telefone.replace(/\D/g, '');
    return (
      /^(\d{11})$/.test(cleanedPhoneNumber) ||
      /^(\d{10})$/.test(cleanedPhoneNumber)
    );
  };

  return (
    <>
      {loading && (
        <ContainerCardLoader>
          <Loader sx={{ animation: 'rotation 1s linear infinite' }}>
            <LoaderAfter />
          </Loader>
          <div>Logando...</div>
        </ContainerCardLoader>
      )}

      <Stack
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          maxWidth: '1200px',
          height: 'auto',
          width: '100%',
          fontWeight: '7000',
          padding: '10px 20px',
          color: 'green',
        }}
      >
        <form
          style={{
            width: '100%',
            gap: '1.2rem',
          }}
          onSubmit={handleSubmit}
        >
          <Stack
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <Box
              sx={{
                width: '659px',
                gap: '2.6rem',
                display: 'flex',
                padding: '20px',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 25%)',
                flexDirection: 'column',
                '@media (max-width: 750px)': {
                  width: '100%',
                  padding: '15px',
                },
              }}
            >
              <Stack
                sx={{
                  paddingBottom: '1.8rem',
                  color: 'var(--green-color)',
                  fontSize: '1.8rem',
                  gap: '0.9rem',
                  width: '100%',
                }}
              >
                <h2>Contate-nos</h2>
              </Stack>

              <Stack
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gridGap: '10px',
                  '@media (max-width: 550px)': {
                    width: '100%',
                    gridTemplateColumns: '1fr',
                  },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    gap: '1.3rem',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                  }}
                >
                  <TextField
                    sx={{
                      width: '100%',
                      fontSize: '1.5rem',
                      fontWeight: '700',
                    }}
                    type="text"
                    label="Nome"
                    variant="outlined"
                    size="small"
                    name="nome"
                    value={Usernome}
                    onChange={(e) => setNomeUser(e.target.value)}
                    error={!!nomeError}
                    helperText={nomeError}
                    FormHelperTextProps={{ sx: { fontSize: '1.4rem' } }}
                  />
                </Box>

                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    gap: '1.3rem',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                  }}
                >
                  <TextField
                    sx={{
                      width: '100%',
                      fontSize: '1.5rem',
                      fontWeight: '700',
                    }}
                    type="email"
                    label="E-mail"
                    variant="outlined"
                    size="small"
                    name="email"
                    value={emailUser}
                    onChange={(e) => setEmailUser(e.target.value)}
                    error={!!emailError}
                    helperText={emailError}
                    FormHelperTextProps={{ sx: { fontSize: '1.4rem' } }}
                  />
                </Box>
              </Stack>

              <Stack
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gridGap: '10px',
                  '@media (max-width: 550px)': {
                    width: '100%',
                    gridTemplateColumns: '1fr',
                  },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    gap: '1.3rem',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                  }}
                >
                  <InputMask
                    mask="(99) 99999-9999"
                    value={telefoneUser}
                    onChange={(e) => setTelefoneUser(e.target.value)}
                  >
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        sx={{
                          width: '100%',
                          fontSize: '1.5rem',
                          fontWeight: '700',
                        }}
                        label="Telefone"
                        variant="outlined"
                        size="small"
                        name="telefone"
                        error={!!telefoneError}
                        helperText={telefoneError}
                        FormHelperTextProps={{ sx: { fontSize: '1.4rem' } }}
                      />
                    )}
                  </InputMask>
                </Box>

                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    gap: '1.3rem',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                  }}
                >
                  <TextareaAutosize
                    style={{
                      width: '100%',
                      fontSize: '1.5rem',
                      fontWeight: '700',
                    }}
                    aria-label="Mensagem"
                    rowsMin={3}
                    placeholder="Mensagem"
                    name="mensagem"
                    value={mensagemUser}
                    onChange={(e) => setMensagemUser(e.target.value)}
                  />
                  {!!mensagemError && (
                    <Typography sx={{ color: 'red', fontSize: '1.4rem' }}>
                      {mensagemError}
                    </Typography>
                  )}
                </Box>
              </Stack>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <Button
                  type="submit"
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: 'white',
                    backgroundColor: 'var(--green-color)',
                    '&:hover': {
                      backgroundColor: 'var(--green-color-hover)',
                    },
                  }}
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  Enviar mensagem
                </Button>
              </Box>

              {successMessage && (
                <Typography sx={{ color: 'green', fontSize: '1.4rem', textAlign: 'center' }}>
                  {successMessage}
                </Typography>
              )}
            </Box>
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export default StepCardsclient;
