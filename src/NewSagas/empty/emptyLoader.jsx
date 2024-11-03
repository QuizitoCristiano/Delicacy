import { Box, Stack, styled } from '@mui/material'

export const StyleEmptyLoader = {
  containerCardLoader: styled(Stack)(({ theme }) => ({
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '10px',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: '100vh',
    width: '100%',
    zIndex: 9000,
    top: 0,
    left: 0,
  })),

  loader: styled(Box)(({ theme }) => ({
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'inline-block',
    borderTop: '4px solid #3cb815',
    borderRight: '4px solid transparent',
    boxSizing: 'border-box',
    animation: 'rotation 1s linear infinite',
    position: 'relative',
  })),

  loaderAfter: styled(Box)(({ theme }) => ({
    boxSizing: 'border-box',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    borderBottom: '4px solid #f75f1d',
    borderLeft: '4px solid transparent',
  })),
}
