import React, { useState } from 'react'
import {
  Button,
  Box,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from '@mui/material'

import { ContainerCarousel } from '../helpers/sagas'
import { MyFooter } from '../../componets/footer/Footer'

export const CustomerEvaluation = () => {
  //     const [name, setName] = useState('');
  //   const [customerImg, setCustomerImg] = useState('');
  //   const [message, setMessage] = useState('');

  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  return (
    <>
      <ContainerCarousel.containerBody>
        <ContainerCarousel.content>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              marginTop: '4rem',
              justifyContent: 'center',
              flexDirection: 'column',
              maxWidth: '1200px',
              width: '100%',
              gap: '2rem',

              fontWeight: '800',
              padding: '10px 85px',
              color: '#f75f1d',
              '@media (max-width:800px)': {
                padding: '10px 40px',
              },
            }}
          >
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                marginTop: '4rem',
                justifyContent: 'center',
                flexDirection: 'column',
                maxWidth: '1200px',
                width: '100%',
                fontSize: '2rem',
                fontWeight: '800',
                padding: '5px 10px',
                color: '#f75f1d',
                '@media (max-width:800px)': {
                  padding: '5px 10px',
                },
              }}
            >
              <h2> Queremos ouvir sua opinião!</h2>
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '1.8rem',
                color: '#000000',
              }}
            >
              Valorizamos muito sua opinião! Nosso objetivo é proporcionar a
              melhor experiência possível em nosso site, e sua avaliação é
              fundamental para ajudar-nos a alcançar esse objetivo. Se você
              puder, por favor, dedique alguns minutos para nos contar sobre sua
              experiência navegando em nosso site. Seja um elogio ou uma
              sugestão de melhoria, cada feedback nos ajuda a entender melhor as
              necessidades dos nossos clientes e a aprimorar nossa plataforma.
              Agradecemos imensamente pela sua colaboração
            </Typography>
          </Box>

          <form>
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
                  <h2> suas palavras são muito importantes</h2>
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
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }} 
                      id="upload-image"
                    />
                    <label htmlFor="upload-image">
                      <Button sx={{
                        width: '100%',
                        color: 'black',
                        backgroundColor: 'var(--green-color)',
                        display: 'flex',
                        gap: '1.3rem',
                        fontWeight: '800',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        flexDirection: 'column',
                        ':hover': {
                            background: 'var(--light-orange-color)',
                            border: 'none',
                            outline: 'none',
                            color: 'var(--bg-color)',
                            transition: 'all 0.45s ease',
                          },
                      }} component="span">
                        Carregar Imagem
                      </Button>
                    </label>
                  </Box>
                </Stack>

                <Stack
                  sx={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
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
                  Insira os Dados
                </Button>
              </Box>
            </Stack>
          </form>
        </ContainerCarousel.content>
      </ContainerCarousel.containerBody>
      <MyFooter />
    </>
  )
}
