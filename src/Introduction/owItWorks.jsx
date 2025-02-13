import React from 'react'
import { Typography, Stack, Box } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import Pimentao from '../dellicacyClinte/img/Pimentao.png'
import lecumes from '../dellicacyClinte/img/lecumes.png'
import batataDoce from '../dellicacyClinte/img/batata-doce.png'
import alho from '../dellicacyClinte/img/alho.jpg'
import piripire from '../dellicacyClinte/img/piripire.jpg'
import manga from '../dellicacyClinte/images/manga.jpg'
import morango from '../dellicacyClinte/images/morango.jpg'
import Uva1 from '../dellicacyClinte/images/Uva1.png'
import abacate from '../dellicacyClinte/images/abacate.jpg'
import papaia from '../dellicacyClinte/images/papaia.png'

const cartoesArmazenados = [
  { nome: 'Abacate e Manga', img: manga, backgroundColor: '#fef4ea' },
  { nome: 'Morango', img: morango, backgroundColor: '#e9f4e3' },
  { nome: 'Uva', img: Uva1, backgroundColor: '#faeaea' },
  { nome: 'Abacate', img: abacate, backgroundColor: '#eeeef9' },
  { nome: 'Mamão ou Papaia', img: papaia, backgroundColor: '#f7f6d7' },
  { img: Pimentao, nome: 'Pimentão', backgroundColor: '#dee2ff' },
  { img: alho, nome: 'Alho', backgroundColor: '#fad2f5' },
  { img: lecumes, nome: 'Lecumes', backgroundColor: '#e4fada' },
  { img: batataDoce, nome: 'Batata-Doce', backgroundColor: '#c8ccc8' },
  { img: piripire, nome: 'Piripire', backgroundColor: '#dee2ff' },
]

export const ComoFunciona = () => {
  return (
    <Stack
      sx={{
        width: '100%',
 
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <Stack
        sx={{
          '& h1 ': {
            fontSize: '2.5rem',
            color: 'var(--text-color)',
            fontWeight: 600,
            letterSpacing: '-0.015em',
          },

          '& span': {
            fontSize: '2rem',
            color: ' #3cb815',
            fontWeight: 800,
            letterSpacing: '-0.01em',
          },

          '& a': {
            textDecoration: 'none',
            color: '#fff',
            fontSize: '1.4rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            marginTop: '2rem',
            '&:hover': {
              color: 'var(--light-orange-color)',
              transition: '0.4s all linear',
            },
          },

          '@media only screen and (max-width: 355px)': {
            '& h1 ': {
              fontSize: '1.5rem',
              color: 'var(--text-color)',
              fontWeight: 600,
              letterSpacing: '-0.015em',
            },
          },
        }}
      >
        <h1>
          Explorando a Diversidade da Natureza <br />
          <span>Frutas</span>
        </h1>
        <a href="#" className="btnMyButton">
          Ver tudo <ArrowForwardIcon className="bx" />
        </a>
      </Stack>

      <Stack
        sx={{
          display: 'grid',
       
          gridTemplateColumns: 'repeat(5, 1fr)', // 5 itens por linha em telas grandes
          gap: '1rem',
          marginTop: '2rem',
          '@media (max-width: 900px)': {
            gridTemplateColumns: 'repeat(3, 1fr)', // 3 itens por linha em telas médias
          },
          '@media (max-width: 500px)': {
            gridTemplateColumns: 'repeat(2, 1fr)', // 2 itens por linha em telas pequenas
          },
        }}
      >
        {cartoesArmazenados.map((item, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: item.backgroundColor,
              borderRadius: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1rem',
              '& img': {
                width: '90%',
                height: '80px',
                objectFit: 'contain',
              },
              '& .textName': {
                fontSize: '0.875rem', // Tamanho pequeno para o texto
                fontWeight: 500,
                marginTop: '0.5rem',
                textAlign: 'center',
              },
            }}
          >
            <img src={item.img} alt={`Imagem de ${item.nome}`} />
            <Typography className="textName">{item.nome}</Typography>
            <ArrowForwardIcon
              sx={{
                color: 'var(--bg-color)',
                fontSize: '1.5rem',
                marginTop: '0.5rem',
                display: 'none',
                '&:hover': {
                  display: 'block',
                },
              }}
            />
          </Box>
        ))}
      </Stack>
    </Stack>
  )
}
