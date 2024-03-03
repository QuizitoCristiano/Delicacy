import React from 'react'
import './shoppincss.css'
import { Stack, Box } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Tropical from '../images/tropical-fruits.png'

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
]

export const ShoppingItems = () => {
  return (
    <>
      <Stack
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      ></Stack>

      <Stack
        sx={{
          height: '100vh',
          position: 'relative',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          background: '#fff',
          color: 'black',
          //   padding: '5rem 9% 2rem',
          '@media only screen and (max-width: 805px)': {
            minHeight: '768px',
          },
        }}
      >
        <Stack
          sx={{
            
            height: 'auto',
            width: '100%',
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            justifyContent: 'space-between',
            flexDirection: 'row',
            gap: '4rem',
            '@media only screen and (max-width: 905px)': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              position: 'relative',
            },
          }}
        >
          {myNewArray.map((item, index) => (
            <Box key={index} className="home-text">
              <Box className="swiper-slide">
                <span>{item.titleP}</span>
                <p>{item.discretion}</p>
                <a class="btnArrow">
                  Compre agora <ArrowForwardIcon className='bx'/>
                </a>
              </Box>
              <Box className="containerImg">
                <img
                  src={item.img}
                  alt="Opa!! Não deu certo, tenta novamente."
                />
              </Box>
            </Box>
          ))}
        </Stack>
      </Stack>
    </>
  )
}
