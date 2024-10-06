import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import './stalys/signUp.css';
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate  } from 'react-router-dom'; // Atualize aqui
import { styled } from '@mui/system';

import { StyleClientNweLib } from './stalys/newStalys';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, getFirestore, query, where, getDocs } from "firebase/firestore";




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
}))

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
}))

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
}))

const globalStyles = `
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`




export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [myNewloading, setMyNewloading] = useState(false);
  const [formData, setFormData] = useState({
    cep: '',
    imgUser: '',
    bairro: '',
    cidade: '',
    estado: '',
    rua: '',
    numeroDoEdificios: '',
    fullName: '',
    password: '',
    confirmPassword: '',
    cpf: '',
    email: '',
    telefone: '',
  });

  const [formErrors, setFormErrors] = useState({
    cep: '',
    bairro: '',
   
    cidade: '',
    estado: '',
    rua: '',
    numeroDoEdificios: '',
    fullName: '',
    password: '',
    confirmPassword: '',
    cpf: '',
    email: '',
    telefone: '',
  });








  const navigate = useNavigate();
  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
    setFormErrors({ ...formErrors, [fieldName]: '' });
  };

  const clearErrors = () => {
    setFormErrors({
      cep: '',
      imgUser: '',
      bairro: '',
      cidade: '',
      estado: '',
      rua: '',
      numeroDoEdificios: '',
      fullName: '',
      password: '',
      confirmPassword: '',
      cpf: '',
      email: '',
      telefone: '',
    });
  };

  const displayError = (fieldName, message) => {
    setFormErrors({ ...formErrors, [fieldName]: message });
  };

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    const cepValido = cep.length === 8;

    if (cepValido) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('CEP não encontrado');
          }
          return res.json();
        })
        .then((data) => {
          if (data.erro) {
            throw new Error('CEP não encontrado');
          }

          setFormData((prevData) => ({
            ...prevData,
            rua: data.logradouro || '',
            bairro: data.bairro || '',
            cidade: data.localidade || '',
            estado: data.uf || '',
          }));
        })
        .catch((error) => {
          console.error(error.message);
          displayError('cep', 'CEP não encontrado');
        });
    } else {
      displayError('cep', 'Por favor, informe um CEP válido.');
    }
  };

  const validateForm = () => {
    clearErrors();
    let isValid = true;

    if (formData.cep.trim() === '') {
      displayError('cep', 'Por favor, informe o CEP.');
      isValid = false;
    } else if (!validarCEP(formData.cep)) {
      displayError('cep', 'Por favor, informe um CEP válido.');
      isValid = false;
    }

    if (formData.rua.trim() === '') {
      displayError('rua', 'Por favor, informe o nome da rua.');
      isValid = false;
    }

    if (formData.bairro.trim() === '') {
      displayError('bairro', 'Por favor, informe o nome do bairro.');
      isValid = false;
    }

    if (formData.cidade.trim() === '') {
      displayError('cidade', 'Por favor, informe o nome da cidade.');
      isValid = false;
    }

    if (formData.estado.trim() === '') {
      displayError('estado', 'Por favor, informe o nome do estado.');
      isValid = false;
    }

    if (formData.numeroDoEdificios.trim() === '') {
      displayError('numeroDoEdificios', 'Por favor, informe o número do edifício.');
      isValid = false;
    }

    if (formData.fullName.trim() === '' || formData.fullName.split(' ').length < 2) {
      displayError('fullName', 'Por favor, digite seu nome completo.');
      isValid = false;
    }

    if (formData.telefone.trim() === '') {
      displayError('telefone', 'Por favor, informe o telefone.');
      isValid = false;
    } else if (!validarTelefone(formData.telefone)) {
      displayError('telefone', 'Por favor, informe um telefone válido.');
      isValid = false;
    }

    if (formData.password.length < 6) {
      displayError('password', 'A senha deve ter pelo menos 6 dígitos.');
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      displayError('confirmPassword', 'As senhas não coincidem.');
      isValid = false;
    }

    if (formData.email.trim() === '' || !isValidEmail(formData.email)) {
      displayError('email', 'Por favor, digite um e-mail válido.');
      isValid = false;
    }

    if (formData.cpf.trim() === '' || !validarCPF(formData.cpf)) {
      displayError('cpf', 'Por favor, digite um CPF válido.');
      isValid = false;
    }

    return isValid;
  };


  const handleSubmit = async () => {
    if (validateForm()) {
      const auth = getAuth();
      const firestore = getFirestore();
      const usersCollection = collection(firestore, "users");
      try {
        setMyNewloading(true)
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: formData.fullName });
        const emailQuery = query(usersCollection, where("email", "==", formData.email));
        const emailQuerySnapshot = await getDocs(emailQuery);
        if (!emailQuerySnapshot.empty) {
          throw new Error("O email já está sendo usado por outro usuário.");
        }
        await addDoc(usersCollection, {
          id: user.uid,
          email: formData.email,
          fullName: formData.fullName,
          imgUser: formData.imgUser,
          cpf: formData.cpf,
          telefone: formData.telefone,
          cep: formData.cep,
          rua: formData.rua,
          bairro: formData.bairro,
          cidade: formData.cidade,
          estado: formData.estado,
          numeroDoEdificios: formData.numeroDoEdificios,
        });
  
        alert("Usuário cadastrado com sucesso!");
        setFormData({
          cep: '',
          imgUser: '',
          bairro: '',
          cidade: '',
          estado: '',
          rua: '',
          numeroDoEdificios: '',
          fullName: '',
          password: '',
          confirmPassword: '',
          cpf: '',
          email: '',
          telefone: '',
        });
        navigate("/");
      } catch (error) {
        alert("Erro ao criar usuário: " + error.message);
      }
    } else {
      setMyNewloading(false)
      console.log('Formulário inválido, corrigir erros.');
    }
  };
  
  

  const validarTelefone = (telefone) => {
    const padrao = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return padrao.test(telefone);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;

    let total = 0;
    for (let i = 0; i < 9; i++) {
      total += parseInt(cpf[i]) * (10 - i);
    }
    let resto = total % 11;
    let digito1 = resto > 1 ? 11 - resto : 0;

    total = 0;
    for (let i = 0; i < 10; i++) {
      total += parseInt(cpf[i]) * (11 - i);
    }
    resto = total % 11;
    let digito2 = resto > 1 ? 11 - resto : 0;

    return parseInt(cpf[9]) === digito1 && parseInt(cpf[10]) === digito2;
  };

  const validarCEP = (cep) => {
    const padrao = /^[0-9]{5}-[0-9]{3}$/;
    return padrao.test(cep);
  };

  return (
    <>
       {myNewloading && (
        <ContainerCardLaoder>
          <Loader sx={{ animation: 'rotation 1s linear infinite' }}>
            <LoaderAfter />
          </Loader>
          <div>Logando...</div>
        </ContainerCardLaoder>
      )}

      <StyleClientNweLib.container>
        <StyleClientNweLib.wrapper>
          <Stack
            sx={{
              color: 'var(--green-color)',
              fontSize: '1.8rem',
              gap: '2.9rem',
              width: '100%',
             
            
              fontWeight: '800',
              '@media (max-width: 800px)': {
                fontSize: '1.4rem',
                transition: 'all 200ms',
              },
            }}
          >
            <h3>Inscreva-se no Delicacy</h3>
          </Stack>
          <StyleClientNweLib.containerChild>
            <StyleClientNweLib.wrapperCardBox>
              <InputMask
                mask="99999-999"
                value={formData.cep}
                onChange={(e) => handleInputChange('cep', e.target.value)}
                onBlur={checkCEP}
              >
                {() => (
                  <TextField
                    sx={{ width: '100%', fontSize: '1.3rem' }}
                    type="text"
                    label="CEP"
                    autoComplete="true"
                    id="cep"
                    placeholder="Informe o CEP da empresa"
                    variant="outlined"
                    size="small"
                    error={!!formErrors.cep}
                    helperText={formErrors.cep}
                  />
                )}
              </InputMask>
            </StyleClientNweLib.wrapperCardBox>
            <StyleClientNweLib.wrapperCardBox>
              <TextField
                sx={{ width: '100%', fontSize: '1.3rem' }}
                type="text"
                label="Rua"
                id="rua"
                autoComplete="true"
                placeholder="Informe a rua da empresa"
                variant="outlined"
                size="small"
                value={formData.rua}
                onChange={(e) => handleInputChange('rua', e.target.value)}
                error={!!formErrors.rua}
                helperText={formErrors.rua}
              />
            </StyleClientNweLib.wrapperCardBox>
          </StyleClientNweLib.containerChild>
          <StyleClientNweLib.containerChild>
            <StyleClientNweLib.wrapperCardBox>
              <TextField
                sx={{ width: '100%', fontSize: '1.3rem' }}
                type="text"
                label="Número"
                id="numeroDoEdificios"
                placeholder="Informe o número do edifício..."
                variant="outlined"
                size="small"
                autoComplete="true"
                value={formData.numeroDoEdificios}
                onChange={(e) =>
                  handleInputChange('numeroDoEdificios', e.target.value)
                }
                error={!!formErrors.numeroDoEdificios}
                helperText={formErrors.numeroDoEdificios}
              />
            </StyleClientNweLib.wrapperCardBox>
            <StyleClientNweLib.wrapperCardBox>
              <TextField
                sx={{ width: '100%', fontSize: '1.3rem' }}
                type="text"
                label="Bairro"
                id="bairro"
                autoComplete="true"
                placeholder="Informe o bairro da empresa"
                variant="outlined"
                size="small"
                value={formData.bairro}
                onChange={(e) => handleInputChange('bairro', e.target.value)}
                error={!!formErrors.bairro}
                helperText={formErrors.bairro}
              />
            </StyleClientNweLib.wrapperCardBox>
          </StyleClientNweLib.containerChild>
          <StyleClientNweLib.containerChild>
            <StyleClientNweLib.wrapperCardBox>
              <TextField
                sx={{ width: '100%', fontSize: '1.3rem' }}
                type="text"
                label="Cidade"
                id="cidade"
                autoComplete="true"
                placeholder="Informe a cidade da empresa"
                variant="outlined"
                size="small"
                value={formData.cidade}
                onChange={(e) => handleInputChange('cidade', e.target.value)}
                error={!!formErrors.cidade}
                helperText={formErrors.cidade}
              />
            </StyleClientNweLib.wrapperCardBox>
            <StyleClientNweLib.wrapperCardBox>
              <TextField
                sx={{ width: '100%', fontSize: '1.3rem' }}
                type="text"
                label="Estado"
                id="estado"
                autoComplete="true"
                placeholder="Informe o estado da empresa"
                variant="outlined"
                size="small"
                value={formData.estado}
                onChange={(e) => handleInputChange('estado', e.target.value)}
                error={!!formErrors.estado}
                helperText={formErrors.estado}
              />
            </StyleClientNweLib.wrapperCardBox>
          </StyleClientNweLib.containerChild>
          <StyleClientNweLib.containerChild>
            <StyleClientNweLib.wrapperCardBox>
              <TextField
                sx={{ width: '100%', fontSize: '1.3rem' }}
                type="text"
                label="Nome completo"
                id="fullName"
                autoComplete="true"
                placeholder="Digite o seu nome completo"
                variant="outlined"
                size="small"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                error={!!formErrors.fullName}
                helperText={formErrors.fullName}
              />
            </StyleClientNweLib.wrapperCardBox>
            <StyleClientNweLib.wrapperCardBox>
              <InputMask
                mask="999.999.999-99"
                value={formData.cpf}
                onChange={(e) => handleInputChange('cpf', e.target.value)}
              >
                {() => (
                  <TextField
                    sx={{ width: '100%', fontSize: '1.3rem' }}
                    type="text"
                    label="CPF"
                    id="cpf"
                    autoComplete="true"
                    placeholder="Digite o seu CPF"
                    variant="outlined"
                    size="small"
                    error={!!formErrors.cpf}
                    helperText={formErrors.cpf}
                  />
                )}
              </InputMask>
            </StyleClientNweLib.wrapperCardBox>
          </StyleClientNweLib.containerChild>
          <StyleClientNweLib.containerChild>
            <StyleClientNweLib.wrapperCardBox>
              <TextField
                sx={{ width: '100%', fontSize: '1.3rem' }}
                type="email"
                label="Email"
                id="email"
                autoComplete="true"
                placeholder="Digite o seu e-mail"
                variant="outlined"
                size="small"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
            </StyleClientNweLib.wrapperCardBox>
            <StyleClientNweLib.wrapperCardBox>
              <InputMask
                mask="(99) 99999-9999"
                value={formData.telefone}
                onChange={(e) => handleInputChange('telefone', e.target.value)}
              >
                {() => (
                  <TextField
                    sx={{ width: '100%', fontSize: '1.3rem' }}
                    type="text"
                    label="Telefone"
                    id="telefone"
                    autoComplete="true"
                    placeholder="Digite o seu telefone"
                    variant="outlined"
                    size="small"
                    error={!!formErrors.telefone}
                    helperText={formErrors.telefone}
                  />
                )}
              </InputMask>
            </StyleClientNweLib.wrapperCardBox>
          </StyleClientNweLib.containerChild>
          <StyleClientNweLib.containerChild>
            <StyleClientNweLib.wrapperCardBox>
              <TextField
                sx={{ width: '100%', fontSize: '1.3rem' }}
                label="Senha"
                id="password"
                placeholder="Digite sua senha"
                variant="outlined"
                size="small"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                error={!!formErrors.password}
                helperText={formErrors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </StyleClientNweLib.wrapperCardBox>
            <StyleClientNweLib.wrapperCardBox>
              <TextField
                sx={{ width: '100%', fontSize: '1.3rem' }}
                label="Confirmar Senha"
                id="confirmPassword"
                placeholder="Confirme sua senha"
                variant="outlined"
                size="small"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                error={!!formErrors.confirmPassword}
                helperText={formErrors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </StyleClientNweLib.wrapperCardBox>
          </StyleClientNweLib.containerChild>

          <StyleClientNweLib.containerChild>
            <Button
              sx={{
                width: '100%',
                backgroundColor: 'var(--green-color)',
                color: '#fff',
                fontSize: '1.2rem',
                fontWeight: 600,
                borderRadius: '8px',
                padding: '1rem',
                '&:hover': {
                  backgroundColor: '#143c27',
                },
              }}
              onClick={handleSubmit}
              disabled={myNewloading}
            >
              Cadastrar
            </Button>

            <Stack
              sx={{
                gap: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="body1"
                component={Link}
                to="/"
                sx={{
                  color: 'var(--green-color)',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '1.85rem',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Voltar para login
              </Typography>
            </Stack>
          </StyleClientNweLib.containerChild>
        </StyleClientNweLib.wrapper>
      </StyleClientNweLib.container>
    </>
  );
};
