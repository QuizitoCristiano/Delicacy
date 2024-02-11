import React, { useState } from 'react';
import { Typography, Stack, Box } from '@mui/material';
import { Grid } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './legumescss.css';
import ProductItemLegume from './legunes.jsx';

export const ProductsLegumes = () => {
  const [carinho, setCarinho] = useState([]);

  const adicionaItemAoCarinho = (item) => {
    setCarinho([...carinho, item]);
  };

  const totalItensCarrinho = carinho.length;

  const newProductsItem = ProductItemLegume.map((item, index) => (
    <Grid item key={index}>
     
      <Box

        sx={{
          padding: '10px',
          boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 25%)',
          borderRadius: '0.5rem',
          height: '280px',
          width: '315px',
          position: 'relative',

          '@media only screen and (max-width: 500px)': {
            width: '100%',
          },
        }}
      >
        <Stack>
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '210px',
              borderRadius: '0.5rem',
              overflow: 'hidden',

              '& img': {
                width: '200%',
                height: '210px',
                objectFit: 'contain',
                objectPosition: 'center',

                '@media only screen and (max-width: 500px)': {
                  width: '150%',
                  height: '210px',
                },
              },
            }}
          >
            <img src={item.img} alt={item.title} />
          </Stack>
       
          <Typography
            variant="h1"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.8rem',
              color: 'black',
            }}
          >
            {item.nome}
          </Typography>

          <Stack direction="row" justifyContent="space-between">
            <Typography
              sx={{
                color: 'var(--light-orange-color)',
                display: 'flex',
                justifyContent: 'center',
                gap: '0.2rem',
                fontWeight: '600',
                fontSize: '2.2rem',
              }}
            >
              R$:{item.price}
            </Typography>

            <Box
              sx={{
                width: '50%',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  right: '0px',
                  bottom: '0px',
                  color: 'var(--bg-color)',
                  fontSize: '3rem',
                  display: 'flex',
                  justifyItems: 'center',
                  alignItems: 'center',
                  padding: '8px',
                  background: 'var(--green-color)',
                  borderRadius: '0.5rem 0px',
                  '&:hover': {
                    background: 'var(--orange-color)',
                    transition: '0.2s',
                  },
                }}
                onClick={() => adicionaItemAoCarinho(item)}
              >
                <ShoppingCartIcon
                  sx={{
                    height: '25px',
                    width: '25px',
                  }}
                />
              </Box>
              <FavoriteBorderIcon
                sx={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  fontSize: '20px',
                  color: 'var(--light-orange-color)',
                }}
              />
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Grid>
  ));

  return (
    <Stack className="categoriaProducts">
      <Stack
        sx={{
          padding: ' 6rem 2% 2rem',
          fontSize: '1rem',
          color: 'var(--text-color: #1a2428',
        }}
      >
        <h2>
          Nossos Produtos Populares <br />
          <span>Produtos de Frutas</span>
        </h2>
        <a href="#" className="btnMyButton">
          Ver tudo <ArrowForwardIcon className="bx" />
        </a>
      </Stack>

      <Grid container spacing={3} justifyContent="center">
        {newProductsItem}
      </Grid>

      {/* Div para exibir total de itens no carrinho */}
      <Box
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
          padding: '10px',
        
          borderRadius: '50%',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.9)',
    
          fontSize: '1.4rem',
          fontWeight: '900',
          background: 'red'
        }}
      >
        <Typography></Typography>
        <Typography>{totalItensCarrinho}</Typography>
      </Box>
    </Stack>
  );
};
