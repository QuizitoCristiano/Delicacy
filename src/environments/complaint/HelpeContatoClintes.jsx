import React, { useState } from 'react'
import { Button, Box, Stack, TextField, TextareaAutosize } from '@mui/material'

import InputMask from 'react-input-mask'

const StepCardsclient = () => {
  const [Usernome, setNomeUser] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [telefoneUser, setTelefoneUser] = useState('');
  const [mensagemUser, setMensagemUser] = useState('');

  const [nomeError, setNomeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [telefoneError, setTelefoneError] = useState('');
  const [mensagemError, setMensagemError] = useState('');

  const [selectedNewFile, setSelectedNewFile] = useState(null);

  const handleFileChange = (event) => {
    selectedNewFile(event.target.files[0])
  }


  const handleNomeChange = (event) => {

    event.preventDefault();

    if (Usernome.trim() === '') {
      setNomeError('O nome é obrigatório');
     return
    } else {
      setNomeError('');
    };

    if (mensagemUser.trim() === '') {
      setMensagemError('A mensagem é obrigatória');
     return
    } else {
      setMensagemError('');
    }

    if (emailUser.trim() === '') {
      setEmailError('O email é obrigatório');
    } else if (!validaEmail(value)) {
      setEmailError('Formato de email inválido');
    } else {
      setEmailError('');
    }

    if (telefoneUser.trim()) {
      setTelefoneError('O telefone é obrigatório');
    } else if (!validaTelefone(value)) {
      setTelefoneError('Formato de telefone inválido');
    } else {
      setTelefoneError('');
    }

 // Se todos os campos estiverem preenchidos, você pode enviar o formulário
 if (Usernome && selectedNewFile && message) {
  // Aqui você pode adicionar a lógica para enviar o formulário
  console.log('Formulário enviado:', { name, selectedFile, message });
}

  }


  // const validaTelefone = (telefone) => {
  //   const cleanedPhoneNumber = telefone.replace(/\D/g, '');
  //   return /^(\d{11})$/.test(cleanedPhoneNumber) || /^(\d{10})$/.test(cleanedPhoneNumber);
  // };

  // const validaEmail = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };
 

  return (
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
        // backgroundColor: '#674279',
        color: 'green',
      }}
    >
        <form onSubmit={handleNomeChange}>
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
            {' '}
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
            sx={{ width: '100%',fontSize: '1.5rem' , fontWeight:'700' }}
            type="text"
            label="Nome"
            variant="outlined"
            size="small"
            name="nome"
         
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
            sx={{ width: '100%',fontSize: '1.5rem' , fontWeight:'700' }}
            type="email"
            label="E-mail"
            variant="outlined"
            size="small"
            name="email"
           
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
             <InputMask mask="(99) 99999-9999" maskChar="_">
            {() => (
              <TextField
                sx={{ width: '100%',fontSize: '1.5rem' , fontWeight:'700' }}
                type="tel"
                label="Telefone"
                variant="outlined"
                size="small"
                name="telefone"
              
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
            style={{ width: '100%', fontSize: '1.5rem' , fontWeight:'700'}}
            aria-label="Mensagem"
            rowsMin={3}
            placeholder="Mensagem"
            name="mensagem"
           
          />
            </Box>
          </Stack>

          <Button
            sx={{
              display: 'inline-block',
              padding: '12px 28px',
              backgroundColor: 'var(--green-color)',
              borderRadius: '5px',
              color: 'var(--bg-color)',
              fontSize: '1rem',
              letterSpacing: '1px',
              fontWeight: 600,
              transition: 'all 0.45s ease',
              border: 'none',
              outline: 'none',
              ':hover': {
                background: 'var(--light-orange-color)',
                border: 'none',
                outline: 'none',
                color: 'var(--bg-color)',
                transition: 'all 0.45s ease',
              },
            }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Enviar mensagem
          </Button>
        </Box>
      </Stack>
      </form>


    </Stack>
  )
}

export default StepCardsclient
