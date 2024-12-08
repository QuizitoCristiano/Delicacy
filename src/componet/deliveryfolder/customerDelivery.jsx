import React, { useState, useEffect } from 'react'
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
  styled,
  List,
  ListItem,
  AppBar,
  Toolbar,
  InputBase,
  Badge,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Dellicacy from '../../imgLogomarca/priclogo1.png'
import { ButtonGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { StyleEmptyLoader } from '../../NewSagas/empty/emptyLoader'
import { db } from '../../../firebaseconfig/firebaseconfig' // ajuste o caminho para a configuração do Firebase
import { collection, getDocs } from 'firebase/firestore'
import { MyFooter } from '../../componets/footer/Footer'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export const CustomerDliveryClant = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const [filteredCards, setFilteredCards] = React.useState([]) // Exemplo de estado para filteredCards
  const [searchTerm, setSearchTerm] = React.useState('')

  const [orderDetails, setOrderDetails] = useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const navigateHome = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleClickMyHome = () => {
    // MyHome
    setTimeout(() => {
      setLoading(true)
      navigateHome('/', {
        state: { selectedProduct },
      })
      setLoading(false)
      handleClose()
    }, 1000)
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
    // Adicione a lógica para atualizar filteredCards com base no searchTerm
  }

  const handleSearchSubmit = (term) => {
    // Adicione a lógica para lidar com o envio da pesquisa
    console.log('Searching for:', term)
  }

  //   useEffect(() => {
  //     const fetchOrderDetails = async () => {
  //       try {
  //         const querySnapshot = await getDocs(collection(db, 'userRequest'));

  //         if (!querySnapshot.empty) {
  //           const data = querySnapshot.docs.map((doc) => doc.data());
  //           const lastOrder = data[data.length - 1]; // Último pedido
  //           setOrderDetails(lastOrder);
  //           console.log('Dados recuperados do Firebase:', lastOrder);
  //         } else {
  //           const localCart = JSON.parse(localStorage.getItem('carinho'));
  //           const localTotal = localStorage.getItem('total');

  //           if (localCart && localTotal) {
  //             setOrderDetails({
  //               items: localCart,
  //               total: localTotal,
  //             });
  //             console.log('Dados recuperados do localStorage');
  //           }
  //         }
  //       } catch (error) {
  //         console.error('Erro ao recuperar dados:', error);
  //       }
  //     };

  //     fetchOrderDetails();
  //   }, []);

  useEffect(() => {
    const fetchOrderDetails = () => {
      // Tente recuperar os dados do localStorage
      const localCart = JSON.parse(localStorage.getItem('carinho'))
      const localTotal = localStorage.getItem('total')

      if (localCart && localTotal) {
        setOrderDetails({
          items: localCart,
          total: localTotal,
        })
        console.log('Dados recuperados do localStorage')
      } else {
        console.log('Nenhum dado encontrado no localStorage')
      }
    }

    fetchOrderDetails()
  }, [])
  return (
    <>
      {loading && (
        <StyleEmptyLoader.containerCardLoader>
          <StyleEmptyLoader.loader
            sx={{ animation: 'rotation 1s linear infinite' }}
          >
            <StyleEmptyLoader.loaderAfter />
          </StyleEmptyLoader.loader>
          <div>Logando...</div>
        </StyleEmptyLoader.containerCardLoader>
      )}

      <Stack
        sx={{
          display: 'flex',
          width: '100%',
          padding: "0.1rem 5% 0.1rem",
          marginLeft: 'auto',
          marginRight: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          bgcolor: '#fff',
          gap: '2rem',
        


          '@media only screen and (max-width: 905px)': {
            gap: '1rem',
            padding: '10px 10px',
            position: 'relative',
            bgcolor: '#fff',
            width: '100%',
          },
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

              fontFamily: '"Roboto", "Helvetica", Arial, sans-serif',
              marginBottom: '2rem',
              '&:hover': {
                backgroundColor: 'white',
                boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 70%)',
              },
            }}
          ></Typography>
        </Box>

        <Stack sx={{ width: '100%' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#000' }}>
            Detalhes do Pedido
          </Typography>

          <Box>
            {orderDetails ? (
              <>
                <Typography
                  sx={{ fontWeight: 700, color: '#3cb815', fontSize: '1.8rem' }}
                >
                  Total R$: {orderDetails.total}
                </Typography>
                <Typography
                  sx={{ fontWeight: 700, color: '#000', fontSize: '1.8rem' }}
                >
                  Personalizações: Nenhuma
                </Typography>
              </>
            ) : (
              <Typography sx={{ color: '#f00' }}>
                Carregando detalhes do pedido...
              </Typography>
            )}
          </Box>

          <Box>
            {orderDetails &&
            orderDetails.items &&
            orderDetails.items.length > 0 ? (
              orderDetails.items.map((item, index) => (
                <Box key={index}>
                  <Typography
                    sx={{ fontWeight: 700, color: '#000', fontSize: '1.8rem' }}
                  >
                    Nome: {item.nome}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: '#f75f1d',
                      fontSize: '1.8rem',
                    }}
                  >
                    Total R$:{' '}
                    {item.subtotal || (item.price * item.quantidade).toFixed(2)}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 600, color: '#000', fontSize: '1.8rem' }}
                  >
                    Quantidade: {item.quantidade}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography sx={{ color: '#f00' }}>
                Nenhum item encontrado.
              </Typography>
            )}
          </Box>
        </Stack>
        <Stack
          sx={{
            width: '100%',
            gap: '10px',
            // bgcolor: 'rgba(0, 0, 0,0.2)',
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#000' }}>
              Informações do Delicacy
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                color: '#000',
                fontSize: '1.5rem',
                '&:hover': {
                  color: '#f75f1d',
                  cursor: 'pointer',
                  transition: '0.2s',
                },
              }}
            >
              Nome: Delicacy
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                color: '#000',
                fontSize: '1.5rem',
                '&:hover': {
                  color: '#f75f1d',
                  cursor: 'pointer',
                  transition: '0.2s',
                },
              }}
            >
              Telefone: (41) 9761-0740
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                color: '#000',
                fontSize: '1.5rem',
                '&:hover': {
                  color: '#f75f1d',
                  cursor: 'pointer',
                  transition: '0.2s',
                },
              }}
            >
              Email: delicacy@gmail.com
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                color: '#000',
                fontSize: '1.5rem',
                '&:hover': {
                  color: '#f75f1d',
                  cursor: 'pointer',
                  transition: '0.2s',
                },
              }}
            >
              Endereço: Rua da Delícia, 123
            </Typography>
          </Box>

          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#000' }}>
              Status do Pedido
            </Typography>

            <Typography
              sx={{ fontSize: '1.7rem', fontWeight: 600, color: '#3cb815' }}
            >
              Seu pedido foi confirmado e está em preparo.
            </Typography>

            <Typography
              sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#000' }}
            >
              Número do Pedido: 654321
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: '#000',

                '@media only screen and (max-width: 905px)': {
                  fontWeight: 700,
                  fontSize: '2.2rem',
                  color: '#000',
                  transition: 'all 0.3s ease-in-out',
                },
              }}
            >
              Tempo Estimado de Confirmação
            </Typography>

            <Typography
              sx={{ fontSize: '1.7rem', fontWeight: 600, color: '#3cb815' }}
            >
              Estimativa: 20 minutos
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                gap: '10px',
                alignItems: 'center',

                '@media only screen and (max-width: 505px)': {
                  justifyContent: 'center',
                  gap: '10px',
                  alignItems: 'center',
                },
              }}
            >
              <Button
                variant="contained"
                onClick={handleClickMyHome}
                disabled={loading}
                sx={{
                  padding: '1.2rem 1.5rem',
                  background: 'var(--green-color)',
                  color: 'var(--bg-color)',
                  fontWeight: 600,
                  borderRadius: '5px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',

                  columnGap: '0.5rem',
                  fontSize: '1.5rem',

                  width: '245px',

                  transition: 'all 0.3s ease-in-out',

                  '&:hover': {
                    boxShadow: '0 0 15px 5px #3cb815',
                    background: '#3cb815',
                    transform: 'scale(1.05)',
                  },

                  '@media only screen and (max-width: 905px)': {
                    width: '95%',
                    transition: 'all 0.3s ease-in-out',
                  },
                }}
              >
                Voltar para para Home
              </Button>
            </Box>

          </Box>

          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: '#000',
                paddingBottom: '10px',
                '@media only screen and (max-width: 905px)': {
                  fontWeight: 700,
                  fontSize: '2.1rem',
                  color: '#000',
                  transition: 'all 0.3s ease-in-out',
                },
              }}
            >
              Informações de Contato e Suporte
            </Typography>

            <Typography
              sx={{ fontSize: '1.7rem', fontWeight: 600, color: '#000' }}
            >
              Entre em contato conosco em caso de dúvidas ou problemas: (41)
              9761-0740
            </Typography>

            <Typography
              sx={{ fontSize: '1.7rem', fontWeight: 600, color: '#000' }}
            >
              Email: delicacy@gmail.com
            </Typography>
          </Box>
        </Stack>

        <Box>
          
        </Box>
      </Stack>

      <MyFooter/>
    </>
  )
}
