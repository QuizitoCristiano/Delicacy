import React, { useContext, useState } from 'react'
import './home.css'
import {
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { ShoppingItems } from '../shoppingItems/shoppingItems'
import { MyFooter } from '../componets/footer/Footer'
import { AuthContext } from '../authcontext'
import { Category } from '../componets/category/category'
import { Products } from '../componets/Products/Products'
import { ProductsLegumes } from '../componets/ProductsLegumes/ProductsLegumes'
import { AboutUs } from '../componets/about/aboutUs'
import Clientes from '../componets/customer/cliente'
import { NewCategorys } from '../componets/screens/newCategorys'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { SearchItem } from '../componet/util/CardBodySearc'
export const MyHome = () => {
  const { user, logout } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('newUser');
    localStorage.removeItem('isLogged');
    logout()
    navigate('/');
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (confirmLogout) => {
    setOpen(false)
    if (confirmLogout) {
      handleLogout()
    }
  }

  return (
    <>
      <Stack
        sx={{
          minHeight: '100vh',
          width: '100%',
          gap: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          '@media only screen and (max-width: 800px)': {
            width: '100%',
            marginTop: '4rem',
            position: 'relative',
          },
        }}
      >
        <ShoppingItems />

        <Stack>
          <button className="logoutButton" onClick={handleClickOpen}>
            Sair
          </button>
        </Stack>

        <Dialog open={open} onClose={() => handleClose(false)}>
          <DialogTitle
            style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3cb815' }}
          >
            {'Confirmar Logout'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{
                fontSize: '1.8rem',
                color: '#f75f1d;',
                fontWeight: 'bold',
              
              }}
            >
              Você tem certeza que deseja sair?
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'space-evenly',
              gap: '1rem',
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              
              color: '#3ca63a',
            }}
          >
            <Button
              sx={{
                padding: '10',
                color: '#fff',
                borderRadius: '8px',
                fontSize: '14px',
                gap: '1rem',
                backgroundColor: '#1a2428',
                boxShadow: '1px 5px 20px #3ca63a',
                '&:hover': {
                  boxShadow: '1px 5px 20px #f75f1d',
                  border: '2px solid #3ca63a',
                  background: '#f75f1d',
                  color: '#000',

                },
              }}
              onClick={() => handleClose(true)}
            >
              <ArrowBackIcon sx={{ fontSize: '2rem' }} />
              Sim
            </Button>

            <Button
              sx={{
                padding: '10',
                boxShadow: '1px 5px 20px #3ca63a',
                backgroundColor: '#1a2428',
                color: '#fff',
                borderRadius: '8px',
                fontSize: '14px',
                gap: '1rem',
                '&:hover': {
                  boxShadow: '1px 5px 20px #3ca63a',
                  border: '2px solid #3ca63a',
                  color: '#3ca63a',
                },
              }}
              onClick={() => handleClose(false)}
            >
              Não
              <ArrowForwardIcon sx={{ fontSize: '2rem' }} />
            </Button>
          </DialogActions>
        </Dialog>

       

        <Category />
        <Products />
        <NewCategorys />
        <ProductsLegumes />
        <AboutUs />
        <Clientes />
        <MyFooter />
      </Stack>
    </>
  )
}
