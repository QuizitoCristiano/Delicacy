import React, { useEffect, useState } from 'react'
import { Stack, Box, Typography, Button } from '@mui/material'

import Angeloni from '../../imgLogomarca/angiloni.png'
import Muffato from '../../imgLogomarca/muffato3.png'
import Verdemais from '../../imgLogomarca/Verdemais.png'
import Komprao from '../../imgLogomarca/komprao.png'
import Atacadao from '../../imgLogomarca/Atacadao1.png'
import gilassi from '../../imgLogomarca/gilassi.png'
import Bahamas from '../../imgLogomarca/Bahamas.png'
import koch from '../../imgLogomarca/koch.png'
import Carrefour from '../../imgLogomarca/Carrefour.png'

import ProductModal from './newProductModal '

const ArrayCardIdCammpane = [
  {
    TextName: 'Muffato',
    img: Muffato,
    description: `Aproveite ofertas incríveis todos os dias no Muffato! A qualidade dos nossos produtos é garantida.`,
    labelTitle: 'Há 36 anos no mercado',
  },
  {
    TextName: 'Verde Mais',
    img: Verdemais,
    description: `Descubra frescor e qualidade no Verde Mais! Venha conferir nossos produtos frescos e saudáveis.`,
    labelTitle: 'Há 23 anos no mercado',
  },
  {
    TextName: 'Komprão',
    img: Komprao,
    description: `No Komprão, você encontra tudo que precisa com preços imbatíveis! Não perca nossas promoções.`,
    labelTitle: 'Há 18 anos no mercado',
  },
  {
    TextName: 'Atacadão',
    img: Atacadao,
    description: `Faça suas compras no Atacadão e economize mais! Ofertas de atacado para o seu dia a dia.`,
    labelTitle: 'Há 20 anos no mercado',
  },
  {
    TextName: 'Pague Menos',
    img: gilassi,
    description: `Pague Menos e leve mais para casa! Preços baixos em produtos de qualidade todos os dias.`,
    labelTitle: 'Há 24 anos no mercado',
  },
  {
    TextName: 'Bahamas',
    img: Bahamas,
    description: `No Bahamas, qualidade e variedade se encontram. Venha conferir nossos produtos selecionados!`,
    labelTitle: 'Há 30 anos no mercado',
  },
  {
    TextName: 'Koch',
    img: koch,
    description: `Koch oferece produtos frescos e de qualidade para sua mesa! Venha conhecer nossas ofertas especiais.`,
    labelTitle: 'Há 70 anos no mercado',
  },
  {
    TextName: 'Carrefour',
    img: Carrefour,
    description: `No Carrefour, você encontra tudo em um só lugar! Venha aproveitar nossas promoções imperdíveis.`,
    labelTitle: 'Há 45 anos no mercado',
  },
]

export const MyEmptyCrad = () => {
  const [openModal, setOpenModal] = useState(false)

  const [selectedProduct, setSelectedProduct] = useState('')

  const handleOpenModal = (productName) => {
    setSelectedProduct(productName)
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  return (
    <Stack
      sx={{
        display: 'flex',
        maxWidth: '1290px',
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        padding: '20px 20px',
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: '1.6rem',
            fontWeight: 600,
            color: 'black',
            margin: '2rem',
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 65%)',
            fontFamily: '"Roboto", "Helvetica", Arial, sans-serif',
            marginBottom: '2rem',
            '&:hover': {
              backgroundColor: 'white',
              boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 70%)',
            },
          }}
        >
          Conectamos consumidores a supermercados excepcionais, como Angeloni,
          Muffato, Verde Mais, Komprão, Atacadão, Pague Menos, Bahamas, Koch,
          Carrefour. Explore a diversidade desses mercados em nosso site, o seu
          ponto de encontro perfeito para uma experiência de compra única.
        </Typography>
      </Box>

      <Stack
        direction="row"
        sx={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr',
          },
          justifyItems: 'center',
          width: '100%',

          p: 2,

          '@media (max-width: 768px)': { p: 0 },
        }}
      >
        {ArrayCardIdCammpane.map((item, index) => (
          <Stack
            key={index}
            className="card"
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              border: '1px solid #ddd',
              boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 45%)',
              height: 'auto',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                
                boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 95%)',
                transform: 'scale(1.05)',
              },
              width: '100%', // Garante que o card ocupe 100% da largura do grid
            }}
          >
            {/* Imagem */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '200px',
                position: 'relative',
                '&:hover .hover-content': {
                  transform: 'translateY(0%)',
                  opacity: 1,
                },
              }}
            >
              <img
                src={item.img}
                alt={item.TextName}
                style={{
                  width: '750px',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>

            {/* Conteúdo */}
            <Box sx={{ p: 2 }} className="card-body">
              <Typography
                sx={{
                  fontSize: '2.2rem',
                  fontWeight: 'bold',
                  color: 'green',
                }}
                variant="h5"
                gutterBottom
              >
                {item.TextName}
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 1.5, fontSize: '1.5rem', fontWeight: '600' }}
              >
                {item.description}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <Typography sx={{ fontSize: '9px', fontWeight: 'bold' }}>
                  {item.labelTitle}
                </Typography>
                <Button
                  sx={{
                    padding: '1.2rem 1.5rem',
                    background: 'var(--green-color)',
                    color: 'var(--bg-color)',
                    fontWeight: 600,
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    columnGap: '0.5rem',
                    fontSize: '1.5rem',
                    width: '100%',
                    maxWidth: '180px',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 0 15px 5px #3cb815',
                      background: '#3cb815',
                      transform: 'scale(1.05)',
                    },
                  }}
                  onClick={() => handleOpenModal(item.TextName)}
                >
                  Comprar aqui!
                </Button>
              </Box>
            </Box>
          </Stack>
        ))}
      </Stack>

      {/* Modal para selecionar cor e quantidade */}
      <ProductModal
        openModal={openModal}
        handleClose={handleClose} // Passa a função de fechar o modal
        selectedProduct={selectedProduct} // Passa o nome do produto selecionado
      />
    </Stack>
  )
}
