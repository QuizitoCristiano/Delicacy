import React, { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  TextareaAutosize,
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  getFirestore,
} from 'firebase/firestore';

import InputMask from 'react-input-mask';
import { CardStylSearche } from './CardStyles';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../../firebaseconfig/firebaseconfig';
import { ModalQRCode } from './modalQrcode';
import { ModalBoleto } from './boleto';


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

export const SearchItem = () => {
  const auth = getAuth()
  const [formNweData, setFormNweData] = useState({ paymentMethod: '' });
  const [open, setOpen] = useState(false)
  const [onClose, setOnClose] = useState(true)

  const [isBoletoModalOpen, setBoletoModalOpen] = useState(false);
  const [boletoData, setBoletoData] = useState(null);

  const [isPixModalOpen, setPixModalOpen] = useState(false)


  const handleOpenPixModal = () => {
    setPixModalOpen(true)
  }

  const handleClosePixModal = () => {
    setPixModalOpen(false)
  }


  const handleOpenBoletoModal = async () => {
    const boleto = await generateBoleto(); // Chama a função que simula o boleto
    setBoletoData(boleto);
    setBoletoModalOpen(true);
  };



  const handleCloseBoletoModal = () => setBoletoModalOpen(false);

    // Função para gerar o boleto
    const generateBoleto = async () => {
      const codigoDeBarras = Math.random().toString().slice(2, 14); // Exemplo simples
      return {
        codigoDeBarras,
        linkPdf: 'https://www.example.com/boleto.pdf',
      };
    };
  




  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    telefone: '',
    cpf: '',
    email: '',
    numeroDoEdificios: '',
    rua: '',
  })

  // Recuperar os dados do LocalStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('newUser'))

    if (savedData) {
      setFormData(savedData) // Preencher o formulário com os dados salvos
    }
  }, [])

  // Recupera dados do localStorage e concatena rua + número
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('newUser'))

    if (savedData) {
      const enderecoCompleto = `${savedData.rua}, ${
        savedData.numeroDoEdificios || ''
      }`.trim()
      setFormData({ ...savedData, rua: enderecoCompleto })
    }
  }, [])

  const [formErrors, setFormErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const handlePaymentMethodChange = (value) => {
    setFormNweData({ ...formData, paymentMethod: value })

    if (value === 'pix') {
      handleOpenPixModal();
    } else if (value === 'código de barras') {
      handleOpenBoletoModal();
    }
  }

  const paymentMethods = [
    { label: 'Pix', value: 'pix' },
    { label: 'Cartão de Crédito', value: 'credit_card' },
    { label: 'Cartão de Débito', value: 'debit_card' },
    { label: 'Alimentação', value: 'alimentacao' },
    { label: 'Código de Barras', value: 'código de barras' },
    { label: 'Refeição', value: 'refeicao' },
    { label: 'Pagamento na Entrega', value: 'cash_on_delivery' },
  ]

  const handleInputChange = (fullName, value) => {
    setFormData({ ...formData, [fullName]: value })
    localStorage.setItem(
      'userData',
      JSON.stringify({ ...formData, [fullName]: value })
    )

    if (field === 'tipoImovel') {
      if (value === 'casa') {
        formData.apartamento = ''
        formData.bloco = ''
      } else if (value === 'apartamento') {
        formData.casa = ''
      }
    }

    setFormData(formData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = {}

    if (!formData.fullName) {
      errors.fullName = 'O fullName é obrigatório'
    }

    if (!formData.paymentMethod) {
      errors.paymentMethod = 'O método de pagamento é obrigatório'
    }

    if (!formData.telefone) {
      errors.telefone = 'O telefone é obrigatório'
    }

    if (!formData.cpf || !validarCPF(formData.cpf)) {
      errors.cpf = 'CPF inválido'
    }

    if (!formData.mensagem) {
      errors.mensagem = 'A mensagem é obrigatória'
    }

    if (!formData.endercoDaEntrega) {
      errors.endercoDaEntrega = 'O endereço de entrega é obrigatório'
    }

    if (!formData.email) {
      errors.email = 'O email é obrigatório'
    }

    if (formData.tipoImovel === 'apartamento' && !formData.bloco) {
      errors.bloco = 'O bloco é obrigatório para apartamentos'
    }

    setFormErrors(errors)
    if (Object.keys(errors).length === 0) {
      setSuccessMessage('Formulário enviado com sucesso!')
    }
  }

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '')
    if (cpf.length !== 11) return false

    let total = 0
    for (let i = 0; i < 9; i++) {
      total += parseInt(cpf[i]) * (10 - i)
    }
    let resto = total % 11
    let digito1 = resto > 1 ? 11 - resto : 0

    total = 0
    for (let i = 0; i < 10; i++) {
      total += parseInt(cpf[i]) * (11 - i)
    }
    resto = total % 11
    let digito2 = resto > 1 ? 11 - resto : 0

    return parseInt(cpf[9]) === digito1 && parseInt(cpf[10]) === digito2
  }

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

      <form
        style={{
          width: '100%',
          maxWidth: '700px',

          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          background: 'white',
          borderRadius: '10px',
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
          '@media (max-width: 750px)': {
            width: '100%',
            height: '100vh',
          },
        }}
        onSubmit={handleSubmit}
      >
        <CardStylSearche.wrapperfort>
          <Stack
            sx={{
              paddingBottom: '1.8rem',
              color: 'var(--green-color)',
              fontSize: '1.8rem',
              gap: '1.9rem',
              width: '100%',
            }}
          >
            <h2>Confirmar dados da entrega</h2>
          </Stack>

          <CardStylSearche.containerBox>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.3rem',
                width: '100%',
              }}
            >
              <TextField
                sx={{
                  width: '100%',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                }}
                type="text"
                label="Name Completo"
                variant="outlined"
                size="small"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                error={!!formErrors.fullName}
                helperText={formErrors.fullName}
                FormHelperTextProps={{ sx: { fontSize: '1.4rem' } }}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.3rem',
                width: '100%',
              }}
            >
              <TextField
                sx={{
                  width: '100%',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                }}
                type="email"
                label="Email"
                variant="outlined"
                size="small"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={!!formErrors.email}
                helperText={formErrors.email}
                FormHelperTextProps={{ sx: { fontSize: '1.4rem' } }}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.3rem',
                width: '100%',
              }}
            >
              <InputMask
                mask="(99) 99999-9999"
                value={formData.telefone}
                onChange={(e) => handleInputChange('telefone', e.target.value)}
              >
                {() => (
                  <TextField
                    sx={{
                      width: '100%',
                      fontSize: '1.5rem',
                      fontWeight: '700',
                    }}
                    type="text"
                    label="Telefone"
                    variant="outlined"
                    size="small"
                    error={!!formErrors.telefone}
                    helperText={formErrors.telefone}
                    FormHelperTextProps={{ sx: { fontSize: '1.4rem' } }}
                  />
                )}
              </InputMask>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.3rem',
                width: '100%',
              }}
            >
              <InputMask
                mask="999.999.999-99"
                value={formData.cpf}
                onChange={(e) => handleInputChange('cpf', e.target.value)}
              >
                {() => (
                  <TextField
                    sx={{
                      width: '100%',
                      fontSize: '1.5rem',
                      fontWeight: '700',
                    }}
                    type="text"
                    label="CPF"
                    variant="outlined"
                    size="small"
                    error={!!formErrors.cpf}
                    helperText={formErrors.cpf}
                    FormHelperTextProps={{ sx: { fontSize: '1.4rem' } }}
                  />
                )}
              </InputMask>
            </Box>
          </CardStylSearche.containerBox>

          <CardStylSearche.containerBox>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.3rem',
                width: '100%',
              }}
            >
              <TextField
                sx={{
                  width: '100%',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                }}
                type="text"
                label="Endereço (Rua e Número)"
                variant="outlined"
                size="small"
                value={formData.rua}
                onChange={(e) => handleInputChange('endereco', e.target.value)}
                error={!!formErrors.rua}
                helperText={formErrors.rua}
                FormHelperTextProps={{ sx: { fontSize: '1.4rem' } }}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.7rem',
                width: '100%',
              }}
            >
             <FormControl fullWidth>
        <InputLabel>Método de Pagamento</InputLabel>
        <Select
          value={formNweData.paymentMethod || ''}
          onChange={(e) => handlePaymentMethodChange(e.target.value)}
        >
          {paymentMethods.map((method) => (
            <MenuItem key={method.value} value={method.value}>
              {method.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
            </Box>
          </CardStylSearche.containerBox>

          <CardStylSearche.nweWarrpeBox>
            <FormControl>
              <RadioGroup
                row
                value={formData.tipoImovel}
                onChange={(e) =>
                  handleInputChange('tipoImovel', e.target.value)
                }
              >
                <FormControlLabel
                  value="casa"
                  control={<Radio />}
                  label="Casa"
                />
                <FormControlLabel
                  value="apartamento"
                  control={<Radio />}
                  label="Apartamento"
                />
              </RadioGroup>
            </FormControl>

            {formData.tipoImovel === 'apartamento' && (
              <TextField
                sx={{
                  width: '100%',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                }}
                type="text"
                label="Bloco"
                variant="outlined"
                size="small"
                value={formData.bloco}
                onChange={(e) => handleInputChange('bloco', e.target.value)}
                error={!!formErrors.bloco}
                helperText={formErrors.bloco}
                FormHelperTextProps={{ sx: { fontSize: '1.4rem' } }}
              />
            )}

            {formData.tipoImovel === 'apartamento' && (
              <TextField
                sx={{
                  width: '100%',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                }}
                type="text"
                label="Apartamento"
                variant="outlined"
                size="small"
                value={formData.apartamento}
                onChange={(e) =>
                  handleInputChange('apartamento', e.target.value)
                }
                error={!!formErrors.apartamento}
                helperText={formErrors.apartamento}
                FormHelperTextProps={{ sx: { fontSize: '1.4rem' } }}
              />
            )}

            {formData.tipoImovel === 'casa' && (
              <TextField
                sx={{
                  width: '100%',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                }}
                type="text"
                label="Casa"
                variant="outlined"
                size="small"
                value={formData.casa}
                onChange={(e) => handleInputChange('casa', e.target.value)}
              />
            )}
          </CardStylSearche.nweWarrpeBox>

          <Stack
            sx={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: '1fr',
              gridGap: '10px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.3rem',
                width: '100%',
              }}
            >
              <TextareaAutosize
                style={{
                  width: '100%',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  padding: '12px',
                  borderRadius: '4px',
                  borderColor: formErrors.mensagem ? 'red' : '#ccc',
                }}
                minRows={5}
                placeholder="Digite sua mensagem"
                value={formData.mensagem}
                onChange={(e) => handleInputChange('mensagem', e.target.value)}
              />
              {formErrors.mensagem && (
                <Typography color="red" sx={{ fontSize: '1.4rem' }}>
                  {formErrors.mensagem}
                </Typography>
              )}
            </Box>
          </Stack>

          <CardStylSearche.containerButton type="submit" disabled={loading}>
            Enviar
          </CardStylSearche.containerButton>

          {successMessage && (
            <Typography
              color="green"
              sx={{
                fontSize: '1.4rem',
                textAlign: 'center',
                marginTop: '1rem',
              }}
            >
              {successMessage}
            </Typography>
          )}
        </CardStylSearche.wrapperfort>

        {isBoletoModalOpen && (
  <ModalBoleto open={isBoletoModalOpen} onClose={handleCloseBoletoModal} boletoData={boletoData} />
)}

        {isPixModalOpen && (
          <ModalQRCode open={isPixModalOpen} onClose={handleClosePixModal} />
        )}
      </form>

      <style>{globalStyles}</style>
    </>
  )
}
