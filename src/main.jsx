import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { TextField, Typography, Stack, Box, Button, Input } from '@mui/material'

import Tropical from './dellicacyClinte/images/tropical-fruits.png'
import Exotic from './dellicacyClinte/imgLogomarca/NweImagfrutasft.png'
import Citrus from './dellicacyClinte/imgLogomarca/frotas43fff-removebg-preview.png'
import { MyFooter } from './dellicacyClinte/componets/footer/Footer'
import { Header } from './dellicacyClinte/MyNweHeaderApp/Header'
import { SubHeader } from './firestHeader/AppHeader'
import { SecondaryFooter } from './FooterBase/DashboardFooter'
import { GeneralExplanation } from './Introduction/AboutTheProject'

const AppSwitcher = () => {
  const [App, setApp] = useState(null)
  const [error, setError] = useState(null)
  const [theCurrentIdent, setTheCurrentIdent] = useState(0)
  const [disappearItem, setDisappearItem] = useState(false)

  const nwArry = [
    {
      titleP: '🌱 Nossas Promessas para Você 🌱',
      img: Tropical,
      discretion: `
        Frutas e Legumes Frescos: Selecionamos a dedo as frutas e legumes
        mais frescos, para garantir que você e sua família desfrutem de
        sabores autênticos.
      `,
    },
    {
      titleP: '🍍 Delícias Exóticas 🍍',
      img: Exotic,
      discretion: `
        Explore o sabor das frutas mais exóticas e raras, direto das regiões 
        mais incríveis do mundo para sua mesa.
      `,
    },
    {
      titleP: '🍊 Sabor Cítrico e Refrescante 🍊',
      img: Citrus,
      discretion: `
        Refresque seu dia com nossas frutas cítricas, carregadas de vitamina C 
        e perfeitas para qualquer ocasião.
      `,
    },
  ]

  const loadApp = async (selectedMode) => {
    try {
      let LoadedApp

      if (selectedMode === 'client') {
        LoadedApp = (await import('./dellicacyClinte/App')).default
      } else if (selectedMode === 'company') {
        LoadedApp = (await import('./dellicacyCampany/App')).default
      } else {
        throw new Error('Modo inválido!')
      }

      setApp(() => LoadedApp)
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error(err)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setDisappearItem(true)

      setTimeout(() => {
        setTheCurrentIdent((prevIndex) => (prevIndex + 1) % nwArry.length)
        setDisappearItem(false)
      }, 1000)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const currentItem = nwArry[theCurrentIdent]

  return (
    <>
      <Stack>
        <SubHeader />
      </Stack>
      <Stack
        sx={{
          minHeight: '100vh',
          bgcolor: '#fff !important',
          marginTop: '5rem',
          width: '100%',
          gap: '0.1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          '@media only screen and (max-width: 800px)': {
            width: '100%',
            marginTop: '4rem',
            position: 'relative',
          },
        }}
      >
        <Stack>
          {App ? (
            <div id="app-root">
              <button onClick={() => setApp(null)}>
                Voltar ao Hub Inicial
              </button>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </div>
          ) : (
            <Stack>
              <Box>
                <Box
                  sx={{
                    top: '10%',
                    width: '100%',
                    height: '100%',

                    // bgcolor: 'black',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    // background: '#f3f3f3',
                    color: 'black',
                    filter: 'blur(0px)',
                    padding: '2rem',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                    overflow: 'hidden',
                    transition: 'all 0.5s ease-in-out',
                    '@media only screen and (max-width:800px)': {
                      width: '98%',
                      height: '100%',
                      padding: '2rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      background: 'blum',

                      filter: 'blur(0px)',
                      gap: '2rem',
                    },
                  }}
                  className={`home-text fade ${
                    disappearItem ? 'fade-out' : 'fade-in'
                  }`}
                >
                  <Box className="swiper-slide">
                    <h2>{currentItem.titleP}</h2>
                    <p
                      style={{
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        color: 'black',
                        filter: 'blur(0px)',
                        width: '80%',
                        '@media (max-width:800px)': {
                          background: 'red',
                          width: '100%',
                        },
                      }}
                    >
                      {currentItem.discretion}
                    </p>
                    <a className="btnArrow">
                      Compre agora <ArrowForwardIcon className="bx" />
                    </a>
                  </Box>
                  <Box
                    sx={{
                      width: '50%',
                      '@media only screen and (max-width:800px)': {
                        width: '100%',

                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    }}
                  >
                    <img
                      style={{ width: '80%' }}
                      src={currentItem.img}
                      alt="Imagem não carregada"
                    />
                  </Box>
                </Box>

                <GeneralExplanation loadApp={loadApp} />

                <Box
                  sx={{
                    width: '100%',
                    gap: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    '@media only screen and (max-width: 800px)': {
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                    },
                  }}
                >
                  {error && <p style={{ color: 'red ' }}>{error}</p>}
                </Box>
              </Box>
              <SecondaryFooter />
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppSwitcher />)
