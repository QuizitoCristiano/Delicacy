import {
  TextField,
  Typography,
  Stack,
  Box,
  Button,
  Input,
} from "@mui/material";

import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Link, useLocation } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";

import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useEffect, useState } from "react";
import "./footer.css";

export const MyFooter = () => {
  const [trocarIcon, setTrocarIcon] = useState(true);

  useEffect(() => {
    const tempoTemorato = setTimeout(() => {
      setTrocarIcon((prevIcon) => !prevIcon);
    }, 2000);

    return () => clearTimeout(tempoTemorato);
  }, [trocarIcon]);

  return (
    <>
      <Stack
        sx={{
          bgcolor: "#fff",
          position: "relative",
          background: "#fef4ea",
          width: "100%",
          padding: "0.1rem 5% 0.1rem",
        }}
      >
        <Box
          sx={{
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, auto))",
            gap: "1.5rem",
            marginTop: "2rem",
            background: "#fef4ea",

            padding: "5px",
          }}
        >
          <div className="footer-box">
            <a href="" className="logo">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  // bgcolor: "#b3d6e4",
                  justifyContent: "center",
                  height: "100%",
                  width: "30%",
                }}
              >
                <StoreIcon
                  sx={{
                    color: "var(--light-orange-color)",
                    fontSize: "3rem",
                  }}
                />

                <Typography>
                  <Link className="logoDelicacy" to="/">
                    Delicacy
                  </Link>
                </Typography>
              </Box>
            </a>
            <p>Rua Curupis, 363 - Santa Quiteria, Curitiba</p>

            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap:' 0.5rem',
              fontSize:' 1.9rem',
              margin: '0.5rem 0 1rem',
            }}>
              <WhatsAppIcon sx={{
                 width: '50px',
                  height:'50px',
                  padding: '10px',
                 background:' #fff',
                 color: ' #3cb815',
                 borderRadius:' 5rem',
                 fontSize:' 30px',
                 
                 '&:hover': {
                   background: '#3cb815',
                   color: '#fff',
                   transition: '0.2s',
                 }
                 
              }}/>
              <InstagramIcon sx={{
                 width: '50px',
                  height:'50px',
                  padding: '10px',
                 background:' #fff',
                 color: ' #3cb815',
                 borderRadius:' 5rem',
                 fontSize:' 30px',
                 
                 '&:hover': {
                   background: '#3cb815',
                   color: '#fff',
                   transition: '0.2s',
                 }
                 
              }}/>
              <FacebookTwoToneIcon sx={{
                 width: '50px',
                  height:'50px',
                  padding: '10px',
                 background:' #fff',
                 color: ' #3cb815',
                 borderRadius:' 5rem',
                 fontSize:' 30px',
                 
                 '&:hover': {
                   background: '#3cb815',
                   color: '#fff',
                   transition: '0.2s',
                 }
                 
              }}/>
              <YouTubeIcon sx={{
                 width: '50px',
                  height:'50px',
                  padding: '10px',
                 background:' #fff',
                 color: ' #3cb815',
                 borderRadius:' 5rem',
                 fontSize:' 30px',
                 
                 '&:hover': {
                   background: '#3cb815',
                   color: '#fff',
                   transition: '0.2s',
                 }
                 
              }}/>
            </Box>
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
  );
};
