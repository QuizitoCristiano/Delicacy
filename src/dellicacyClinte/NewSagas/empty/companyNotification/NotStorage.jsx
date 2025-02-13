import { useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'

const ArrryMessage = [
  {
    name: 'Muffato',
    message:
      'No Muffato, você encontra frutas e legumes frescos com qualidade incomparável. Aproveite os preços baixos e a entrega rápida para sua casa!',
  },
  {
    name: 'Verde Mais',
    message:
      'Verde Mais garante o frescor que você merece! Produtos diretamente da horta para sua mesa, com qualidade e rapidez na entrega.',
  },
  {
    name: 'Komprão',
    message:
      'No Komprão, frescor e economia andam juntos. Descubra frutas e legumes selecionados pelos melhores preços da região!',
  },
  {
    name: 'Atacadão',
    message:
      'No Atacadão, frutas e legumes frescos estão sempre disponíveis com preços imbatíveis e a garantia de qualidade que você confia!',
  },
  {
    name: 'Pague Menos',
    message:
      'Pague Menos para ter mais! Escolha frutas e legumes frescos com preços que cabem no seu bolso e uma entrega ágil.',
  },
  {
    name: 'Bahamas',
    message:
      'O frescor das frutas e legumes no Bahamas é único! Aproveite a qualidade premium e os preços baixos que você só encontra aqui.',
  },
  {
    name: 'Koch',
    message:
      'Na Koch, frescor e qualidade são nossa prioridade! Frutas e legumes com preços baixos e entrega rápida para você economizar com saúde.',
  },
  {
    name: 'Carrefour',
    message:
      'No Carrefour, sua experiência com frutas e legumes é diferenciada. Produtos frescos, preços acessíveis e entrega com agilidade garantida!',
  },
]

export const IsNotstorage = ({notifications, readNotifications, markAsRead }) => {
  const [expandedCard, setExpandedCard] = useState(null) // Rastreamento do card expandido
  const [isRotating, setIsRotating] = useState(false) // Controle de rotação do ícone

  const handleToggle = (cardName) => {
    setIsRotating(true) // Inicia a rotação
    setTimeout(() => {
      setIsRotating(false) // Para a rotação após a animação
      setExpandedCard((prev) => (prev === cardName ? null : cardName)) // Alterna o estado do card
    }, 300) // Tempo de duração da rotação
  }

  return (
    <Stack
      spacing={2}
      sx={{
        display: 'flex',
        maxWidth: '1290px',
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(0, 0, 0, 0.1)', 
        margin: '0 auto', 
        boxSizing: 'border-box',
        gap: '2rem',
        padding: '20px 20px',
        
        '@media only screen and (max-width: 800px)': {
          width: '100%',
          padding: '12px 11px',
        },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: '#3cb815',
          fontWeight: 'bold',
          fontSize: '2rem',
          textAlign: 'center',
        }}
      >
        Notificações de Empresas
      </Typography>

      {ArrryMessage.map((company) => (
        <Box
          key={company.name}
          sx={{
            width: '100%',
            maxWidth: '400px',
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '15px',
       
            transition: 'height 0.3s ease',
            boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 65%)',
            marginBottom: '2rem',
            '&:hover': {
              backgroundColor: 'white',
              boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 70%)',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: '#3cb815',
                fontWeight: 'bold',
                fontSize: '1.5rem',
              }}
            >
              {company.name}
            </Typography>

            {expandedCard === company.name ? (
              <CheckIcon
                sx={{
                  fontSize: '3rem',
                  color: '#3cb815',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  transform: isRotating ? 'rotate(360deg)' : 'rotate(0deg)', // Gira o ícone

                  boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 65%)',
                  marginBottom: '2rem',
                    borderRadius: '50%',
                  '&:hover': {
                    backgroundColor: 'white',
                    boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 70%)',
                  
                  },
                 
                }}
                onClick={() => handleToggle(company.name)}
              />
            ) : (
              <AddIcon
                sx={{
                  fontSize: '3rem',
                  color: '#3cb815',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  transform: isRotating ? 'rotate(360deg)' : 'rotate(0deg)', // Gira o ícone
                }}
                onClick={() => handleToggle(company.name)}
              />
            )}
          </Box>

          {expandedCard === company.name && (
            <Typography
              sx={{
                marginTop: '10px',
                fontSize: '1rem',
                color: 'rgba(0, 0, 0, 0.8)',
              }}
            >
              {company.message}
            </Typography>
          )}
        </Box>
      ))}
    </Stack>
  )
}
