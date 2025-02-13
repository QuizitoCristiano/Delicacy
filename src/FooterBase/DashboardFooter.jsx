import { TextField, Typography, Stack, Box, Button, Input } from '@mui/material'

import SendIcon from '@mui/icons-material/Send';
import MailLockIcon from '@mui/icons-material/MailLock';
import LocalMallIcon from '@mui/icons-material/LocalMall'
import { Link, useLocation } from 'react-router-dom'
import StoreIcon from '@mui/icons-material/Store'
import './AboutTheProjectMyScc.css';
import YouTubeIcon from '@mui/icons-material/YouTube'
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import InstagramIcon from '@mui/icons-material/Instagram'
import { useEffect, useState } from 'react'
// import '../dellicacyClinte/componets/footer/footer.css'
import Dellicacy from '../dellicacyClinte/imgLogomarca/priclogo1.png'

export const SecondaryFooter = () => {
  const [trocarIcon, setTrocarIcon] = useState(true)

  useEffect(() => {
    const tempoTemorato = setTimeout(() => {
      setTrocarIcon((prevIcon) => !prevIcon)
    }, 2000)

    return () => clearTimeout(tempoTemorato)
  }, [trocarIcon])

  return (
    <>
      <Stack
        sx={{
          bgcolor: '#fff',
          position: 'relative',
          background: '#fef4ea',
          width: '100%',
          padding: '0.1rem 5% 0.1rem',
        }}
      >
        <Box
          sx={{
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, auto))',
            gap: '1.5rem',
            marginTop: '2rem',
            background: '#fef4ea',

            padding: '5px',
          }}
        >
          <Box sx={{
           display: 'flex',
           flexDirection: 'column'
          }}>
         
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  height: '100%',
                  width: '30%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    height: '100%',
                    width: '100%',
                    cursor: 'pointer',

                    transition: 'all 0.3s ease',

                    '@media (max-width: 600px)': {
                      cursor: 'pointer',
                      height: '100%',
                      width: '100%',
                    },
                  }}
                >
                  <img
                    src={Dellicacy}
                    className="logoImageDl"
                    alt="Dellicacy Logo"
                  />
                </Box>
              </Box>
          
            <Typography>Rua Curupis, 363 - Santa Quiteria, Curitiba</Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: ' 0.5rem',
                fontSize: ' 1.9rem',
                margin: '0.5rem 0 1rem',
              }}
            >
              <WhatsAppIcon
                sx={{
                  width: '50px',
                  height: '50px',
                  padding: '10px',
                  background: ' #fff',
                  color: ' #3cb815',
                  borderRadius: ' 5rem',
                  fontSize: ' 30px',
                  boxShadow: '0 0 14px rgba(60, 184, 21, 0.6)',

                  '&:hover': {
                    background: '#3cb815',
                    color: '#fff',
                    transition: '0.2s',
                    boxShadow: '0 0 16px rgba(60, 184, 21, 0.9)',
                  },
                }}
              />
              <InstagramIcon
                sx={{
                  width: '50px',
                  height: '50px',
                  padding: '10px',
                  background: ' #fff',
                  color: ' #3cb815',
                  borderRadius: ' 5rem',
                  fontSize: ' 30px',
                  boxShadow: '0 0 14px rgba(209, 74, 12, 0.8)',

                  '&:hover': {
                    background: '#3cb815',
                    color: '#fff',
                    transition: '0.2s',
                    boxShadow: '0 0 16px rgba(209, 74, 12, 0.9)',
                  },
                }}
              />
              <FacebookTwoToneIcon
                sx={{
                  width: '50px',
                  height: '50px',
                  padding: '10px',
                  background: ' #fff',
                  color: ' #3cb815',
                  borderRadius: ' 5rem',
                  fontSize: ' 30px',
                  boxShadow: '0 0 14px rgba(44, 43, 43, 0.6)',

                  '&:hover': {
                    background: '#3cb815',
                    color: '#fff',
                    transition: '0.2s',
                    boxShadow: '0 0 16px rgba(44, 43, 43, 0.9)',
                  },
                }}
              />
              <YouTubeIcon
               sx={{
                width: '50px',
                height: '50px',
                padding: '10px',
                background: '#fff',
                color: '#3cb815',
                borderRadius: '5rem',
                fontSize: '30px',
                boxShadow: '0 0 14px rgba(13, 96, 165, 0.6)', // Sombras mais espalhadas ao redor
              
                '&:hover': {
                  background: '#3cb815',
                  color: '#fff',
                  transition: '0.2s',
                  boxShadow: '0 0 16px rgba(13, 96, 165, 0.9)', // Intensifica o efeito de sombra ao redor
                },
              }}
              
              />
            </Box>
          </Box>

          <Box className='footerAbout'>
            <h2>Categoria</h2>
            <a href="#">Frutas vegetais</a>
            <a href="#">PR Curitiba</a>
            <a href="#">Pacote de comida</a>
            <a href="#">Bebida</a>
          </Box>

          <Box className="footerAbout">
            <h2>Links Úteis</h2>
            <a href="#">Pagamento e impostos</a>
            <a href="#">Termos de uso</a>
            <a href="#">Meu blog</a>
            <a href="#">Retorne para nos visitar</a>
          </Box>

          <Box className="footerAbout">
            <h2>Boletim de Notícias</h2>
            <Typography >
              Obtenha 10% de desconto com <br />
              boletim informativo por e-mail
            </Typography>

            <form >
            <MailLockIcon 
            sx={{
             
                color:'#3cb815',
                
            }}
          
            />
              <input
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
              />

              <SendIcon
              sx={{
                cursor: 'pointer',
                transition: '0.3s',
                color:'#3cb815',
              }}
              />
            </form>
          </Box>
        </Box>

        <Box className="copyright">
          <p>
            🍏 🍎🥦🥕🌿🌱 Junte-se a nós na jornada para uma vida mais saudável
            e saborosa! 🌱🍎🌿🥕🍏🥦
          </p>
        </Box>
      </Stack>
    </>
  )
}
