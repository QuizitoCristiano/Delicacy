import { Box, Stack, Typography } from '@mui/material'
import Lottie from 'lottie-react'
import React from 'react'

export const PoupNewItem = ({
  defaultOptions,
  index,
  item,
  animationState,
  lastAddedItem,
 
 
}) => {
  return (
    <>
      <Stack
        key={index}
        sx={{
          position: 'fixed',
          height: '45px',
          width: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '1rem',
          color: '#fff',
          fontWeight: 'bold',
          flexDirection: 'row',
          zIndex: '1000',
          top: '122px',
          bgcolor: '#3cb815',
          borderRadius: '1.8rem',
          left: '0',
          right: '20px',
          padding: '20px',
          boxShadow: '0 8px 11px rgb(14 55 54 / 55%)',
          '@media only screen and (max-width: 805px)': {
            width: '97%',
          },
        }}
      >
        <Box
          sx={{
            borderRadius: '1.8rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '45px',
            height: '45px',
          }}
        >
          <Lottie
            options={defaultOptions}
            isStopped={animationState.isStopped}
            isPaused={animationState.isPaused}
            key={Date.now()} // Forçar re-renderização com uma chave única
            style={{ width: '100%', height: '100%' }}
          />
        </Box>

        <Typography sx={{ fontSize: '1.6rem', fontWeight: 'bold' }}>
          {lastAddedItem}
        </Typography>

        <Box className="notification">
          <Typography>{`Preço: R$ ${item.price}`}</Typography>
        </Box>
      </Stack>
    </>
  )
}
