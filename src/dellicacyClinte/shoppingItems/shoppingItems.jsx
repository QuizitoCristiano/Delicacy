
import React, { useState, useEffect } from 'react'
import './shoppincss.css'
import { Stack, Box } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Tropical from '../images/tropical-fruits.png'
import Exotic from '../imgLogomarca/NweImagfrutasft.png'
import Citrus from '../imgLogomarca/frotas43fff-removebg-preview.png'

const myNewArray = [
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

export const ShoppingItems = () => {
  const [currentIndex, setCurrentIndex] = useState(0) // Índice atual
  const [fade, setFade] = useState(false) // Controle do fade

  // Alterna para o próximo item a cada 1 minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true) // Ativa a animação de fade-out

      setTimeout(() => {
        // Após a animação, muda para o próximo item
        setCurrentIndex((prevIndex) => (prevIndex + 1) % myNewArray.length)
        setFade(false) // Remove o fade-out
      }, 1000) // Espera 1s para completar o fade

    }, 6000) // Alterna a cada 6 segundos

    return () => clearInterval(interval) // Limpa o intervalo ao desmontar
  }, [])

  const currentItem = myNewArray[currentIndex] // Item atual

  return (
    <Stack
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: '#fff',
        color: 'black',
        padding: '5rem 9% 2rem',
        '@media only screen and (max-width: 805px)': {
          minHeight: '768px',
          padding: '5rem 1% 2rem',
        },
      }}
    >
      <Stack
        sx={{
          height: 'auto',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4rem',
          flexDirection: 'row',
          '@media only screen and (max-width: 905px)': {
            flexDirection: 'column',
          },
        }}
      >
        <Box className={`home-text fade ${fade ? '' : 'show'}`}>
          <Box className="swiper-slide">
            <span>{currentItem.titleP}</span>
            <p>{currentItem.discretion}</p>
            <a className="btnArrow">
              Compre agora <ArrowForwardIcon className="bx" />
            </a>
          </Box>
          <Box className="containerImg">
            <img
              src={currentItem.img}
              alt="Opa!! Não deu certo, tenta novamente."
            />
          </Box>
        </Box>
      </Stack>
    </Stack>
  )
}
