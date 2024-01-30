import { TextField, Typography, Stack, Box } from '@mui/material';
import { Grid } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Products.css';

import Maracuja from '../../images/Maracuja.png';

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
  return (
  
      <Grid container spacing={2} justifyContent="center"
        sx={{
          width: '998px',
          height: 'auto',
            bgcolor: 'green	',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
      >
        <h2>todo bem</h2>

     
          {ProductItem.map((item, index) => (
               <Stack
               sx={{
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center',
                 width: '100%',
                 gap: '2rem',

                 bgcolor: 'ActiveBorder',
                 flexDirection: 'row',
                 flexWrap: 'wrap',
                 '@media only screen and (max-width: 500px)': {
                  
                 },
               }}
             >
            <Box
              sx={{
                padding: '10px',
                boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 55%)',
                borderRadius: ' 0.5rem',
                height: '280px',
                width: '315px',
             
                position: 'relative',

                '@media only screen and (max-width: 500px)': {
                  height: '100%',
                  width: '320px',
                  bgcolor: 'GrayText'
                },
              }}
              key={index}
            >
              <Stack
                sx={{
                  bgcolor: 'red',
                  height: '210px',
                  width: '100%',
                }}
              >
                <img
                className='miImag'
                  src={item.img}
                  alt="dfsf"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Stack>

              <Typography
                sx={{
                  fontWeight: '800',
                  fontSize: '1.9rem',
                  color: 'black',
                }}
              >
                {item.nome}
              </Typography>
              <Stack
                sx={{
                  display: 'flex',
                  justifyItems: 'center',
                  alignContent: 'space-between',
                  flexDirection: 'row',
                }}
              >
                <Box
                  sx={{
                    width: '50%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <Typography
                    sx={{
                      marginTop: '0.5rem',
                      color: 'var(--light-orange-color)',
                      fontWeight: '600',
                      fontSize: '1.8rem',
                    }}
                  >
                    {item.price}
                  </Typography>

                  <Typography sx={{ color: 'var(--text-color)' }}>
                    Kg
                  </Typography>
                </Box>
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
            </Box>
            </Stack>
          ))}
      
      </Grid>
 
  )
}
