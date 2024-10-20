import React from 'react'
import { TextField, Typography, Stack, Box } from '@mui/material'
import './styles/myCategory.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import manga from '../../images/manga.jpg'
import morango from '../../images/morango.jpg'
import Uva1 from '../../images/Uva1.png'
import abacate from '../../images/abacate.jpg'
import papaia from '../../images/papaia.png'

const CategoryItem = [
  {
    nome: 'Abacate e Manga',
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
    img: Uva1,
    backgroundColor: '#faeaea',
  },
  {
    nome: 'Abacate',
    img: abacate,
    backgroundColor: '#eeeef9',
  },
  {
    nome: 'Mamão ou Papaia',
    img: papaia,
    backgroundColor: '#f7f6d7',
  },
]

export const Category = () => {
  const newCategoryItem = CategoryItem.map((item, index) => (
    <Box
      key={index}
      className="ItemMubox"
      sx={{
        width: '100%',
        maxWidth: '250px',
        backgroundColor: item.backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '2.5rem',
        padding: '1rem',
        gap: '0.5rem',
        position: 'relative',

        '& img': {
          width: '80%',
          height: '100px',
          objectFit: 'contain',
        },

        '& h2': {
          fontSize: '1.5rem',
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
          borderRadius: '50%',
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
      <img src={item.img} alt={`Imagem de ${item.nome}`} />
      <Typography className="textName">{item.nome}</Typography>
      <p>{item.descricao}</p>
      <ArrowForwardIcon
        sx={{ color: 'var(--bg-color)', fontSize: '3.2rem' }}
        className="bx"
      />
    </Box>
  ))

  return (
    <Stack className="categoria" sx={{ width: '100%' }}>
      <Stack
        className="heading"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '2rem',
          width: '100%',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginLeft: '1rem' }}>
          Explorando a Diversidade da Natureza <br />
          <span style={{ fontSize: '2rem', fontWeight: 700 }}>Frutas</span>
        </h1>
        <a href="#" className="btnMyButton">
          Ver tudo <ArrowForwardIcon className="bx" />
        </a>
      </Stack>

      {/* Container para os Cards */}
      <Stack
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          width: '100%',
          marginTop: '2rem',
          justifyContent: 'center',

          '@media (max-width: 500px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
        }}
      >
        {newCategoryItem}
      </Stack>
    </Stack>
  )
}
