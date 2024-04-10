import React from 'react'
import { Box, Button, Stack, Typography, TextField } from '@mui/material';
import { ContainerCarousel } from '../helpers/sagas';
import StepCardsclient from './HelpeContatoClintes';
import { MyFooter } from '../../componets/footer/Footer';


export const NewHelpeContato = () => {


   

  return (
    <>
    <ContainerCarousel.containerBody>
      <ContainerCarousel.content>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            marginTop: '4rem',
            justifyContent: 'center',
            flexDirection: 'column',
            maxWidth: '1200px',
            width: '100%',
            
            fontWeight: '800',
            padding: '10px 85px',
            color: '#f75f1d',
            '@media (max-width:800px)': {
              padding: '10px 40px',
            }
          }}
        >
          <h2> Em caso de reclamações </h2>
        </Box>

        <Stack
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            maxWidth: '1200px',
            width: '100%',
            fontWeight: '7000',
            padding: '10px 20px',
            // backgroundColor: '#674279',
            color: 'green',
          }}
        >
        <ContainerCarousel.wrapper>
            No Delicacy, valorizamos a transparência e a satisfação do cliente.
            Se você não estiver totalmente satisfeito com sua experiência de
            compra, estamos aqui para ajudar. Nosso compromisso é resolver
            qualquer problema de forma rápida e eficiente. No Delicacy, sua
            opinião é importante e estamos constantemente trabalhando para
            melhorar nossos serviços com base no feedback dos clientes.
          </ContainerCarousel.wrapper>
        </Stack>

        
        <StepCardsclient/>
       
      </ContainerCarousel.content>
    </ContainerCarousel.containerBody>

    <MyFooter/>
    </>

  )
}


