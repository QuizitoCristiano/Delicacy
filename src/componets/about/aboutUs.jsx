import React from "react";
import "./aboutUs.css";
import { Stack, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Tropical from "../../img/legumes.avif";

const myNewArray = [
  {
    titleP: "🌱 Nossas Promessas para Você 🌱",
    img: Tropical,
    mytitle: "🌿 Sobre Nós - Delicacty: Nutrição Fresca e Sabor Puro 🌿",
    discretion: `
    Na Delicacty, acreditamos que uma vida saudável começa com escolhas
    alimentares saudáveis. Nossa jornada começou com a paixão por
    proporcionar a você e sua família acesso a frutas e legumes frescos
    e de alta qualidade, diretamente à sua porta.
        `,
    mytitle2: "🌱 Qualidade e Frescor 🌱",
    discretion2: `
    Na Delicacty, a qualidade e o frescor são nossas principais
    prioridades. Trabalhamos incansavelmente para selecionar os produtos
    mais frescos e saborosos, diretamente de produtores locais e
    fornecedores confiáveis. Cada fruta e legume é escolhido a dedo para
    garantir que apenas o melhor chegue à sua mesa.
        `,
  },
];

export const AboutUs = () => {
  return (
    <>
      <Stack
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        
        }}
      ></Stack>

      <Stack
        sx={{
          height: "100vh",
          position: "relative",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          background: "#fff",
          color: "black",
         
          gap: '2rem',
        
          
          //   padding: '5rem 9% 2rem',
          "@media only screen and (max-width: 805px)": {
            minHeight: "768px",
          },
        }}
      >
        <Stack
          sx={{
            gap: "1.8rem",
            position: 'relative',
            gap: '2rem',
            height: "auto",
            width: "100%",
            color: "black",
            display: "flex",
            alignItems: "center",
            position: "relative",
            justifyContent: "space-between",
            flexDirection: "row",

            "@media only screen and (max-width: 905px)": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              position: "relative",
            },
          }}
        >
          {myNewArray.map((item, index) => (
            <Box key={index} className="home-text">
              <Box sx={{
                display:'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2rem',
                flexDirection: 'column',
               

                '& img': {
                    width: '190%',
                    height: 'aouto',
                    objectFit: 'contain',
                    objectPosition: 'center',

                    "@media only screen and (max-width: 905px)": {
                        width: '170%',
                        height: 'aouto',
                      },
                  },
                  '& h2': {
                    fontSize: '1.7rem',
                    color: 'black',
                    fontWeight: 600,
                  },
                  '& span': {
                    fontSize: '0.8rem',
                    fontWeight: 400,
                    marginBottom: '1rem',
                  },
                  '& .bx': {
                    padding: '10px',
                    color: 'var(--bg-color)',
                    borderRadius: '5rem',
                    marginTop: '2rem',
                    position: 'absolute',
                    bottom: '-8%',
                    display: 'none',
                  },
                  '&:hover .bx': {
                    display: 'block',
                    transition: '0.5s all linear',
                  },
                
              }}>
                <img
                  src={item.img}
                  alt="Opa!! Não deu certo, tenta novamente."
                />
              </Box>
              <Box className="swiper-slide">
                <span>{item.titleP}</span>
                <p>{item.discretion}</p>
                <span>{item.mytitle2}</span>
                <p>{item.discretion2}</p>
                <a class="btnArrow">
                  Compre agora <ArrowForwardIcon className="bx" />
                </a>
              </Box>
            </Box>
          ))}
        </Stack>
      </Stack>
    </>
  );
};
