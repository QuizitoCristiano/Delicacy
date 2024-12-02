import React, { useState, useEffect } from 'react'
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
  InputAdornment,
} from '@mui/material'
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  getFirestore,
} from 'firebase/firestore'

import InputMask from 'react-input-mask'
import { CardStylSearche } from './CardStyles'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db } from '../../../firebaseconfig/firebaseconfig'
import { ModalQRCode } from './modalQrcode'
import { ModalBoleto } from './boleto'
import { StyleEmptyLoader } from '../../NewSagas/empty/emptyLoader'
import { useNavigate } from 'react-router-dom'
import { CustomerDliveryClant } from '../deliveryfolder/customerDelivery'

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

export const SearchItem = ({ onCloseModl, setOnCloseModl }) => {
  const auth = getAuth()
  const [formNweData, setFormNweData] = useState({ paymentMethod: '' })
  const [open, setOpen] = useState(false)

  const [isBoletoModalOpen, setBoletoModalOpen] = useState(false)
  const [boletoData, setBoletoData] = useState(null)

  const [isPixModalOpen, setPixModalOpen] = useState(false)
  const navigateHomepag = useNavigate()
  const selectedProduct = {
    /* Defina seu produto selecionado aqui */
  }

  const handleClickMyHomepag = () => {
    setLoading(true) // Ativa o estado de loading

    // Navegação com um pequeno atraso
    setTimeout(() => {
      navigateHomepag('/CustomerDliveryClant', {
        state: { selectedProduct },
      })
      setLoading(false) // Desativa o loading após a navegação
      setOnCloseModl(false) // Fecha o modal
    }, 1000) // Ajuste o delay se necessário
  }

  const handleOpenPixModal = () => {
    setPixModalOpen(true)
  }

  const handleClosePixModal = () => {
    setPixModalOpen(false)
  }

  const handleOpenBoletoModal = async () => {
    const boleto = await generateBoleto() // Chama a função que simula o boleto
    setBoletoData(boleto)
    setBoletoModalOpen(true)
  }

  const handleCloseBoletoModal = () => setBoletoModalOpen(false)

  // Função para gerar o boleto
  const generateBoleto = async () => {
    const codigoDeBarras = Math.random().toString().slice(2, 14) // Exemplo simples
    return {
      codigoDeBarras,
      linkPdf: 'https://www.example.com/boleto.pdf',
    }
  }

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
      handleOpenPixModal()
    } else if (value === 'código de barras') {
      handleOpenBoletoModal()
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
    e.preventDefault(); // Previne o comportamento padrão do formulário

    const errors = {};

    // Validação de campos obrigatórios
    if (!formData.fullName) {
        errors.fullName = 'O nome completo é obrigatório';
    }

    if (!formData.telefone) {
        errors.telefone = 'O telefone é obrigatório';
    }

    if (!formData.cpf || !validarCPF(formData.cpf)) {
        errors.cpf = 'CPF inválido';
    }

    if (!formData.email) {
        errors.email = 'O email é obrigatório';
    }

    if (!formData.numeroDoEdificios) {
        errors.numeroDoEdificios = 'O número do edifício é obrigatório';
    }

    if (!formData.rua) {
        errors.rua = 'A rua é obrigatória';
    }

    if (!formData.paymentMethod) {
        errors.paymentMethod = 'O método de pagamento é obrigatório';
    }

    // Validação específica para tipo de imóvel
    if (formData.tipoImovel === 'apartamento') {
        if (!formData.bloco) errors.bloco = 'O número do bloco é obrigatório';
        if (!formData.apartamento) errors.apartamento = 'O número do apartamento é obrigatório';
    }

    if (formData.tipoImovel === 'casa') {
        if (!formData.casa) errors.casa = 'O número da casa é obrigatório';
    }

    setFormErrors(errors); // Atualiza os erros de validação

    // Se não houver erros, continua com o envio do formulário
    if (Object.keys(errors).length === 0) {
        setSuccessMessage('Formulário enviado com sucesso!');
        // Aqui você pode adicionar a lógica para enviar os dados ao Firebase ou outra ação necessária
    }
};


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
        <StyleEmptyLoader.containerCardLoader>
          <StyleEmptyLoader.loader
            sx={{ animation: 'rotation 1s linear infinite' }}
          >
            <StyleEmptyLoader.loaderAfter />
          </StyleEmptyLoader.loader>
          <div>Logando...</div>
        </StyleEmptyLoader.containerCardLoader>
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
                value={formData.tipoImovel}
                onChange={(e) =>
                  handleInputChange('tipoImovel', e.target.value)
                }
                // onChange={(e) =>
                //   handleInputChange('tipoImovel', e.target.value)
                // }
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
              <>
                <TextField
                  sx={{
                    width: '100%',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                  }}
                  type="number"
                  label="Bloco"
                  variant="outlined"
                  size="small"
                  value={formData.bloco}
                  onChange={(e) => handleInputChange('bloco', e.target.value)}
                  error={!!formErrors.bloco}
                  helperText={formErrors.bloco}
                  FormHelperTextProps={{ sx: { fontSize: '1.4rem' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment  position="start">Bloco</InputAdornment>
                    ),
                  }}
                />

                <TextField
                  sx={{
                    width: '100%',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                  }}
                  type="number"
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        Apartamento
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            )}

            {formData.tipoImovel === 'casa' && (
              <TextField
                sx={{
                  width: '100%',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                }}
                type="number"
                label="Casa"
                variant="outlined"
                size="small"
                value={formData.casa}
                onChange={(e) => handleInputChange('casa', e.target.value)}
                error={!!formErrors.casa}
                helperText={formErrors.casa}
                FormHelperTextProps={{ sx: { fontSize: '1.4rem' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Casa</InputAdornment>
                  ),
                }}
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
          ></Stack>

          <CardStylSearche.containerButton
            type="submit"
            onClick={handleClickMyHomepag}
            disabled={loading}

            
          >
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
          <ModalBoleto
            open={isBoletoModalOpen}
            onClose={handleCloseBoletoModal}
            boletoData={boletoData}
          />
        )}

        {isPixModalOpen && (
          <ModalQRCode open={isPixModalOpen} onClose={handleClosePixModal} />
        )}
      </form>

      <style>{globalStyles}</style>
    </>
  )
}
