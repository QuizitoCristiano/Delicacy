import { Box, Stack, Button, styled, Input } from '@mui/material'

export const CardStylSearche = {
  ContainerCard: styled(Stack)(({}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '1200px',
    width: '100%',
    fontWeight: '7000',
    padding: '10px 20px',
    color: 'green',
  
    
    overflow: 'hidden', 
    maxHeight: '100vh', 
    '@media (max-width: 750px)': {
      width: '100%',
      padding: '15px',
    },
  })),
  
  wrapperfort: styled(Box)(({}) => ({
    width: '100%',

    gap: '2.6rem',
    display: 'flex',
    padding: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '15px',

    boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 25%)',
    flexDirection: 'column',
    '@media (max-width: 750px)': {
      width: '100%',
      padding: '15px',
    },
  })),

  containerButton: styled(Button)(({}) => ({
    width: '100%',
    height: '3.5rem',
    fontSize: '1.5rem',
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'var(--green-color)',
    '&:hover': {
      backgroundColor: '#c0eb7b',
    },
  })),

  containerBoxIpt: styled(Input)(({}) => ({
    width: '100%',
    display: 'grid',
    gap: '1.7rem',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '10px',
    '@media (max-width: 550px)': {
      gridTemplateColumns: '1fr',
    },
  })),

  containerBox: styled(Box)(({}) => ({
    width: '100%',
    display: 'grid',
    gap: '1.7rem',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '10px',
    '@media (max-width: 550px)': {
      gridTemplateColumns: '1fr',
    },
  })),

  nweWarrpeBox: styled(Box)(({}) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '10px',
    width: '100%',
    '@media (max-width: 550px)': {
      gridTemplateColumns: '1fr',
    },
  })),
}
