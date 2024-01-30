import { Typography, Stack, Box } from '@mui/material'
import { Grid } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import './Products.css'

import Maracuja from '../../images/Maracuja.png'

const ProductItem = [
  {
    nome: 'Maracujá',
    img: Maracuja,
    price: 'R$:19',
  },
  {
    nome: 'Maracujá',
    img: Maracuja,
    price: 'R$:19',
  },
  {
    nome: 'Maracujá',
    img: Maracuja,
    price: 'R$:19',
  },
  {
    nome: 'Maracujá',
    img: Maracuja,
    price: 'R$:19',
  },
  {
    nome: 'Maracujá',
    img: Maracuja,
    price: 'R$:19',
  },
  {
    nome: 'Maracujá',
    img: Maracuja,
    price: 'R$:19',
  },
]

export const Products = () => {
  const newProductsItem = ProductItem.map((item, index) => (
    <Grid item key={index}>
      <Box
        sx={{
          padding: '10px',
          boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 25%)',
          borderRadius: '0.5rem',
          bgcolor: 'black',
          height: '280px',
          width: '315px',
          position: 'relative',
          backgroundColor: 'ButtonFace',

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
                height: 'auto',
                objectFit: 'contain',
                objectPosition: 'center',

                
                '@media only screen and (max-width: 500px)': {
                  width: '150%',
                  height: 'auto'
                },
                
              },
            }}
          >
            <img  src={`${item.img}`}
             alt={item.title}
             />
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
              {item.price}
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
  ))

  return (
    <Stack className="categoriaProducts">
      <Grid container spacing={3} justifyContent="center">
        {newProductsItem}
      </Grid>
    </Stack>
  )
}
