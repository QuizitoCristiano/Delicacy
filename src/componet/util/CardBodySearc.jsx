import React, { useState } from 'react'
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
} from '@mui/material'
import InputMask from 'react-input-mask'

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
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    cpf: '',
    mensagem: '',
    email: '',
    bloco: '',
    casa: '',
    apartamento: '',
    endercoDaEntrega: '',
    paymentMethod: '',
  })

  const paymentMethods = [
    { label: 'Pix', value: 'pix' },
    { label: 'Cartão de Crédito', value: 'credit_card' },
    { label: 'Cartão de Débito', value: 'debit_card' },
    { label: 'Alimentação', value: 'alimentacao' },
    { label: 'Refeição', value: 'refeicao' },
    { label: 'Pagamento na Entrega', value: 'cash_on_delivery' },
  ]

  const [formErrors, setFormErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const handleInputChange = (field, value) => {
    const newFormData = { ...formData, [field]: value }
    if (field === 'casa') {
      newFormData.bloco = ''
      newFormData.apartamento = ''
    } else if (field === 'bloco') {
      newFormData.casa = ''
      newFormData.apartamento = ''
    } else if (field === 'apartamento') {
      newFormData.casa = ''
      newFormData.bloco = ''
    }
    setFormData(newFormData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = {}

    // Validação do nome
    if (!formData.nome) {
      errors.nome = 'O nome é obrigatório'
    }

    // Validação do método de pagamento
    if (!formData.paymentMethod) {
      errors.paymentMethod = 'O método de pagamento é obrigatório'
    } else if (
      !paymentMethods.find((pm) => pm.value === formData.paymentMethod)
    ) {
      errors.paymentMethod = 'Método de pagamento inválido'
    }

    // Validação do telefone
    if (!formData.telefone) {
      errors.telefone = 'O telefone é obrigatório'
    }

    // Validação do CPF
    if (!formData.cpf || !validarCPF(formData.cpf)) {
      errors.cpf = 'CPF inválido'
    }

    // Validação da mensagem
    if (!formData.mensagem) {
      errors.mensagem = 'A mensagem é obrigatória'
    }

    // Validação do endereço de entrega
    if (!formData.endercoDaEntrega) {
      errors.endercoDaEntrega = 'O endereço de entrega é obrigatório'
    } else if (formData.endercoDaEntrega.length < 10) {
      errors.endercoDaEntrega =
        'Endereço de entrega precisa ter no mínimo 10 caracteres'
    }

    // Validação do email
    if (!formData.email) {
      errors.email = 'O email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email inválido'
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
    } else {
      // Se não houver erros, submeta o formulário
      setFormErrors({})
      setSuccessMessage('Formulário enviado com sucesso!')
      setLoading(false)
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
      <Stack
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          maxWidth: '1200px',
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
                <h2>Confirmar dados da entrega</h2>
              </Stack>

              <Stack
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gridGap: '10px',
                  '@media (max-width: 550px)': {
                    gridTemplateColumns: '1fr',
                  },
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
                  <TextField
                    sx={{
                      width: '100%',
                      fontSize: '1.5rem',
                      fontWeight: '700',
                    }}
                    type="text"
                    label="Nome Completo"
                    variant="outlined"
                    size="small"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    error={!!formErrors.nome}
                    helperText={formErrors.nome}
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
                    onChange={(e) =>
                      handleInputChange('telefone', e.target.value)
                    }
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
              </Stack>

              <Stack
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gridGap: '10px',
                  '@media (max-width: 550px)': {
                    gridTemplateColumns: '1fr',
                  },
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
                  <TextField
                    sx={{
                      width: '100%',
                      fontSize: '1.7rem',
                      fontWeight: '700',
                    }}
                    type="text"
                    label="Endereço de Entrega"
                    variant="outlined"
                    size="small"
                    value={formData.endercoDaEntrega}
                    onChange={(e) =>
                      handleInputChange('endercoDaEntrega', e.target.value)
                    }
                    error={!!formErrors.endercoDaEntrega}
                    helperText={formErrors.endercoDaEntrega}
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
                  <FormControl variant="outlined" size="small" fullWidth>
                    <InputLabel>Método de Pagamento</InputLabel>
                    <Select
                    sx={{
                      fontSize: '17px',
                    }}
                      value={formData.paymentMethod}
                      onChange={(e) =>
                        handleInputChange('paymentMethod', e.target.value)
                      }
                      label="Método de Pagamento"
                      error={!!formErrors.paymentMethod}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 200,
                            fontSize:' 18px'
                          },
                        },
                      }}
                    >
                      {paymentMethods.map((method) => (
                        <MenuItem key={method.value} value={method.value}>
                          {method.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {formErrors.paymentMethod && (
                      <Typography color="red" sx={{ fontSize: '1.4rem' }}>
                        {formErrors.paymentMethod}
                      </Typography>
                    )}
                  </FormControl>
                </Box>
              </Stack>

           
           
                <Stack
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridGap: '10px',
                    width: '100%',
                    '@media (max-width: 550px)': {
                      gridTemplateColumns: '1fr',
                    },
                  }}
                >
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
                    error={!!formErrors.casa}
                    helperText={formErrors.casa}
                    FormHelperTextProps={{ sx: { fontSize: '1.4rem' } }}
                  />

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
                </Stack>
            

              <Stack
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gridGap: '10px',
                  '@media (max-width: 550px)': {
                    gridTemplateColumns: '1fr',
                  },
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
                    onChange={(e) =>
                      handleInputChange('mensagem', e.target.value)
                    }
                  />
                  {formErrors.mensagem && (
                    <Typography color="red" sx={{ fontSize: '1.4rem' }}>
                      {formErrors.mensagem}
                    </Typography>
                  )}
                </Box>
              </Stack>

              <Button
                sx={{
                  width: '100%',
                  height: '3.5rem',
                  fontSize: '1.5rem',
                  color: 'var(--button-background-color)',
                  backgroundColor: 'var(--green-color)',
                  '&:hover': {
                    backgroundColor: 'var(--button-hover-background-color)',
                  },
                }}
                type="submit"
              >
                Enviar
              </Button>

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
            </Box>
          </Stack>
        </form>
      </Stack>
      <style>{globalStyles}</style>
    </>
  )
}
