import { Stack, Box, Button } from '@mui/material'
import Dellicacy from '../../../imgLogomarca/priclogo1.png'
export const ErrorPageNotFound = () => {
  return (
    <>
      <Stack
        sx={{
          width: '100%',
          height: '100vh',
          

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '2rem',
          backgroundColor: '#F8F9FA',

          padding: '5rem',

          '@media only screen and (max-width: 905px)': {
            width: '100%',
          
            padding: '1rem',
        
            transition: 'all 0.3s ease-in-out',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            height: '100%',
            width: '100%',
            cursor: 'pointer',

            transition: 'all 0.3s ease',

            '@media (max-width: 600px)': {
              cursor: 'pointer',
              height: '100%',
              width: '100%',
            
            },
          }}
        >
          <img  src={Dellicacy} className="logoImageDl" alt="Dellicacy Logo" />
        </Box>

        <Box sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#343A40' }}>
          Não foi possível encontrar a pasta no armazenamento local
        </Box>
        <Box sx={{ fontSize: '1.6rem', color: '#6C757D', fontWeight: '500' }}>
          Tente novamente mais tarde ou verifique a conexão com a internet.
        </Box>

        <Stack
          sx={{
            direction: 'column',
            gap: '4rem',
          }}
        >
          <Box>
            <Button
              sx={{
               
              
                boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 55%)',

            
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
              Tentar novamente
            </Button>
          </Box>
          <Box>
            <a
              href="/"
              style={{
                textDecoration: 'none',
                color: '#343A40',
                fontWeight: 'bold',
                borderBottom: '1px solid blue',
                fontSize: '1.2rem',
              }}
            >
              Entre em contato com a central de ajuda
            </a>
          </Box>
        </Stack>
      </Stack>
    </>
  )
}
