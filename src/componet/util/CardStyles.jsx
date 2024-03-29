import { Box, Stack, Button, styled, Input } from '@mui/material'

export const CardStylSearche = {
  ContainerCard: styled(Stack)(({}) => ({
    backgroundColor: ' #fefefe',
    margin: '25% auto',
    padding: '30px',
    border: '1px solid #888',
    width: '488px',

    justifyContent: 'space-around',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    borderRadius: '10px',
    '@media only screen and (max-width: 805px)': {
      width: '100%',
    },
  })),

  wrapperBox: styled(Box)(({}) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    justifyContent: 'center',
    flexDirection: 'row',
  })),

  containerButton: styled(Button)(({}) => ({
    backgroundColor: 'var(--green-color)',
    color: 'white',
    borderRadius: '5px',
    width: '100px',
    height: '50px',
    '&:hover': {
      backgroundColor: 'var(--light-orange-color)',
    },
  })),

  containerIpute: styled(Input)(({}) => ({
    width:' 80%',
    padding: '10px',
    fontSize:'1.5rem',
    margin: '10px 0',
    borderRadius:' 5px',
    border:' 2px solid var(--green-color)',
    outline: 'none',
  })),
}
