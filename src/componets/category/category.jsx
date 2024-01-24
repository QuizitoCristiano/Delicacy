import React from 'react';
import { TextField, Typography, Stack, Box } from '@mui/material';
import './category.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import manga from '../../images/manga.jpg';
import morango from '../../images/morango.jpg';
import Uva1 from '../../images/Uva1.png';
import abacate from '../../images/abacate.jpg';
import papaia from '../../images/papaia.png';



const CategoryItem = [
  {
    nome: 'Abacate e Manga',
    descricao: '22 Item',
    img: manga,
    backgroundColor: '#fef4ea',
  },
  {
    nome: 'Morango',
    descricao: '19 Item',
    img: morango,
    backgroundColor: '#e9f4e3', 
  },
  {
    nome: 'Uva',
    descricao: '13 Item',
    img: Uva1,
    backgroundColor: '#faeaea', 
  },
  {
    nome: 'Abacate',
    descricao: '9 Item',
    img: abacate,
    backgroundColor: '#eeeef9', 
  },
  {
    nome: 'Mamão ou Papaia',
    descricao: '22 Item',
    img: papaia,
    backgroundColor: '#f7f6d7', 
  },
];




export const Category = () => {
  const newCategoryItem = CategoryItem.map((item, index) => {
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
          Explorando a Diversidade da Natureza <br />
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
        {newCategoryItem}
      </Stack>
    </Stack>
  );
};
