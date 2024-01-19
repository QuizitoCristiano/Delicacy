import { TextField, Typography, Stack, Box, Button, Input } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3'

import FacebookSharpIcon from '@mui/icons-material/FacebookSharp'
import InstagramIcon from '@mui/icons-material/Instagram'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import YouTubeIcon from '@mui/icons-material/YouTube'
import { useEffect, useState } from 'react'
import './footer.css'

export const MyFooter = () => {
  const [trocarIcon, setTrocarIcon] = useState(true)

  useEffect(() => {
    const tempoTemorato = setTimeout(() => {
      setTrocarIcon((prevIcon) => !prevIcon)
    }, 2000)

    return () => clearTimeout(tempoTemorato)
  }, [trocarIcon])

  return (
    <>
      <Stack sx={{
        bgcolor: '#fff',
        position: 'relative',
        // background: '#fef4ea',
        width: '100%',
        padding: '0.1rem 5% 0.1rem',
      
        
      }}>
        <Box sx={{
           width: '100%',
           marginLeft: 'auto',
           marginRight: 'auto',
           display: 'grid',
           gridTemplateColumns: 'repeat(auto-fit, minmax(200px, auto))',
           gap: '1.5rem',
           marginTop: '2rem',
           background: '#fef4ea',
         
           padding:'5px'
        }}>
          <div className="footer-box">
            <a href="" className="logo">
            <LocalMallIcon className="bx bxs-basket"/>
              <i className="bx bxs-basket">Delicacy</i>
            </a>
            <p>Rua Curupis, 363 - Santa Quiteria, Curitiba</p>

            <div className="social">
              <YouTubeIcon className="boxNewIcon" />
              <YouTubeIcon className="boxNewIcon" />

              <i className="bx bxl-whatsapp"></i>
              <i className="bx bxl-twitter"></i>
              <i className="bx bxl-instagram"></i>
              <i className="bx bxl-youtube"></i>
            </div>
          </div>

          <div className="footer-box">
            <h2>Categoria</h2>
            <a href="#">Frutas vegetais</a>
            <a href="#">PR Curitiba</a>
            <a href="#">Pacote de comida</a>
            <a href="#">Bebida</a>
          </div>

          <div className="footer-box">
            <h2>Links Úteis</h2>
            <a href="#">Pagamento e impostos</a>
            <a href="#">Termos de uso</a>
            <a href="#">Meu blog</a>
            <a href="#">Retorne para nos visitar</a>
          </div>

          <div className="footer-box">
            <h2>Boletim de Notícias</h2>
            <p>
              Obtenha 10% de desconto com <br />
              boletim informativo por e-mail
            </p>

            <form action="">
              <i className="bx bxs-envelope"></i>

              <input
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
              />

              <i className="bx bx-arrow-back bx-rotate-180"></i>
            </form>
          </div>
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
