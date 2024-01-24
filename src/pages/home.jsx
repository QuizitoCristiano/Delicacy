import React, { useContext, useState } from 'react'
import './home.css'
import { TextField, Typography, Stack, Box, Button } from '@mui/material'
import { ShoppingItems } from '../shoppingItems/shoppingItems'
import { MyFooter } from '../componets/footer/Footer'
import { SignIn } from '../componets/signin-in/signinIn'
import { SignUp } from '../componets/signUp/signUp'
import { AuthContext } from '../authcontext'
import { Category } from '../componets/category/category'

export const MyHome = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <>
      <Stack
        sx={{
          minHeight: '100vh',
          width: '100%',
          backgroundColor: '#fff',
          // background: 'red',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'colunm',


          '@media only screen and (max-width: 800px)': {
            width: '100%',
            position: 'relative',
          },
        }}
      >



        <ShoppingItems />


        <Stack>
          <button
            className="logoutButton"
          >
            Sair
          </button>
        </Stack>


        <Category/>
        <h2>Ola mundo!!</h2>
        <MyFooter />
      </Stack>
    </>
  )
}
