import React from 'react';
import { TextField, Typography, Stack, Box } from '@mui/material';
import './styles/myCategory.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import Pimentao from '../../img/Pimentao.png';
import Abobrinha from '../../img/Abobrinha.png';
import lecumes from '../../img/lecumes.png';
import tomate1 from '../../img/tomate1.png';
import Cenoura1 from '../../img/Cenoura1.png';
import batataDoce from '../../img/batata-doce.png';
import alho from '../../img/alho.jpg';
import feijoaVermelo from '../../img/feijoa-Vermelo.png';
import broccoli1 from '../../img/broccoli1.png';
import piripire from '../../img/piripire.jpg';





const dadosDosCartoes = [
  {
    img: Pimentao,
    descricao: '4 Item',
    nome: "Pimentão",
    backgroundColor: "#fef4ea",
  },
  {
    img: Abobrinha,
    descricao: '8 Item',
    nome: "Abobrinha ",
    backgroundColor: "#eeeef9",
  },
  {
    img: lecumes,
    descricao: '95 Item',
    nome: "Lecumes ",
    backgroundColor: "#faeaea",
  },
  {
    img: batataDoce,
    descricao: '18 Item',
    nome: "Batata-Doce",
    backgroundColor: "#eeeef9",
  },
  {
    img: tomate1,
    descricao: '12 Item',
    nome: "Tomate",
    backgroundColor: "#e1fed3",
  },
  {
    img: Cenoura1,
    descricao: '7 Item',
    nome: "Cenoura",
    backgroundColor: "#e4fada ",
  },

  {
    img: alho,
    descricao: '19 Item',
    nome: "Alho ",
    backgroundColor: "#fad2f5",
  },
  {
    img: feijoaVermelo,
    descricao: '12 Item',
    nome: "feijoa Vermeloumes ",
    backgroundColor: "#ebf7f5",
  },
  {
    img: broccoli1,
    descricao: '17 Item',
    nome: "Broccoli1 ",
    backgroundColor: "#c8ccc8",
  },
  {
    img: piripire,
    descricao: '25 Item',
    nome: "Piripire ",
    backgroundColor: "#dee2ff",
  },
];





export const NewCategorys = () => {
  const NewCategoryItem = dadosDosCartoes.map((item, index) => {
    return (
      <Stack
        key={index}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '2rem',
         
          '@media only screen and (max-width: 305px)': {
            gap: '1rem',
          },
        }}
      >
        <Box
          className="box"
          sx={{
            width: '100%',
            backgroundColor: item.backgroundColor,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        
            borderRadius: '0.5rem',
            '& img': {
              width: '100%',
              height: '100px',
              objectFit: 'contain',
              objectPosition: 'center',
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
          }}
        >
          <img src={item.img} alt="Opa!! Não deu certo, tenta novamente." />
          <Typography className='textName'>{item.nome}</Typography>
          <p>{item.descricao}</p>
          <ArrowForwardIcon sx={{
            color: 'var(--bg-color)',
            fontSize: '3.8rem',
         
          }} className="bx"/>
        </Box>
      </Stack>
    );
  });

  return (
    <Stack className="categoria">
      <Stack className="heading">
        <h1>
        Nossos Produtos Populares<br />
          <span>Frutas</span>
        </h1>
        <a href="#" className="btnMyButton">
          Ver tudo <ArrowForwardIcon className="bx"/>
        </a>
      </Stack>


      

      {/* container content  */}
      <Stack
        className="categoria-container"
        sx={{
          display: 'grid',
          width:'100',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginTop: '2rem',
         
        
          alignItems: 'center',
          justifyContent: 'center', 
          '@media only screen and (max-width: 500px)': {
         
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          
            gridTemplateColumns: '1fr',
          },
        }}
      >
        {NewCategoryItem}
      </Stack>
    </Stack>
  );
};
