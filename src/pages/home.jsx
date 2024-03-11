import React, { useContext, useState } from 'react'
import './home.css'
import { TextField, Typography, Stack, Box, Button } from '@mui/material'
import { ShoppingItems } from '../shoppingItems/shoppingItems'
import { MyFooter } from '../componets/footer/Footer'

import { AuthContext } from '../authcontext'
import { Category } from '../componets/category/category'
import { Products } from '../componets/Products/Products'
import { ProductsLegumes } from '../componets/ProductsLegumes/ProductsLegumes'
import { AboutUs } from '../componets/about/aboutUs'

export const MyHome = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <>
      <Stack
        sx={{
          minHeight: '100vh',
          width: '100%',
          // backgroundColor: '#fff',
     
          gap: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'colunm',


          '@media only screen and (max-width: 800px)': {
            width: '100%',
            marginTop: '4rem',
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

        <Products/>
    
        <h2>Ola mundo tudo cerdo!!</h2>
        <p>Vamos nessa</p>
        <h2>Eba!!</h2>
       <ProductsLegumes/>
       <AboutUs/>
        <MyFooter/>

      </Stack>
    </>
  )
}
