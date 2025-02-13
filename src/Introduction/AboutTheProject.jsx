import { Stack, Button, Box, Grid } from '@mui/material'
import React from 'react'
import { NewCategorys } from '../dellicacyClinte/componets/screens/newCategorys'
import { ComoFunciona } from './owItWorks'

const arrayGeneral = [
  {
    title: 'Como Funciona',
    discretion: `Seja bem-vindo(a) ao nosso projeto! Aqui, conectamos pessoas que buscam adquirir produtos frescos e de alta qualidade, como frutas, verduras e legumes, a empresas especializadas nesse segmento. Nossa missão é tornar o processo de compra e venda mais simples, prático e eficiente, promovendo economia e agilidade em cada etapa. 
          Se você é um empresário que deseja expandir seu alcance ou um consumidor que valoriza produtos saudáveis e frescos, temos a solução ideal para atender às suas expectativas.`,
    TheForttitleP: '',
  },
  {
    title: 'Escolha Seu Perfil',
    discretion: `Agora é o momento de decidir como você gostaria de participar do nosso projeto!`,
    options: [
      {
        label: 'Sou um empresário',
        description: `Deseja cadastrar sua empresa e divulgar seus produtos no nosso site? Escolha essa opção e aumente a visibilidade do seu negócio.`,
      },
      {
        label: 'Sou um cliente',
        description: `Pretende se cadastrar como usuário para comprar os melhores produtos frescos de maneira simples? Essa é a opção para você.`,
      },
    ],
    TheForttitleP: `Escolha o perfil que melhor se encaixa nas suas necessidades e aproveite todas as vantagens de fazer parte do nosso projeto!`,
  },
]

export const GeneralExplanation = ({ loadApp }) => {
  return (
    <Stack
      sx={{
        width: '100%',
        margin: '0 auto',
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        
        borderRadius: '8px',
        gap: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: '1rem',
        fontWeight: 'bold',
        letterSpacing: '-0.02em',
      }}
    >
      <h1 style={{ 
        isplay: 'flex',
        color: '#ff7e00',
        fontWeight: 'bold',
        marginBottom: '1rem',
        marginTop: '1rem',
        fontSize: '2rem',
 
        
       }}>Bem-vindo ao Nosso Projeto</h1>

      {arrayGeneral.map((item, index) => (
        <React.Fragment key={item.title}>
          {/* Renderiza conteúdo textual */}
          <Stack>
            <h2 style={{ color: '#ff7e00' }}>{item.title}</h2>
            <p>{item.discretion}</p>

            {index === 0 && <ComoFunciona />}
          </Stack>

          {/* Grid Responsivo */}
          <Grid
            container
            spacing={2}
            sx={{
              width: '100%',
              justifyContent: 'center',
              '@media (max-width:800px)': {
                gap: '1rem',
              },
            }}
          >
            {item.options &&
              item.options.map((option, idx) => (
                <Grid
                  key={idx}
                  item
                  xs={12} // Tela pequena ocupa 100%
                  sm={6} // Tela média ocupa 50%
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Stack
                    sx={{
                      width: '100%',
                      maxWidth: '300px',
                      padding: '1rem',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Mais transparente
                      boxShadow: '0 4px 8px rgba(44, 43, 43, 0.6)',
                      backdropFilter: 'blur(10px)', // Adiciona desfoque ao fundo
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        boxShadow: '0 8px 16px rgba(60, 184, 21, 0.6)',
                        transform: 'scale(1.05)',
                        cursor: 'pointer',
                      },
                    }}
                  >
                    <strong style={{ color: '#3cb815' }}>
                      ➡ {option.label}
                    </strong>
                    <p>{option.description}</p>
                  </Stack>
                </Grid>
              ))}
          </Grid>

          {item.TheForttitleP && (
            <p style={{ color: ' #3cb815' }}>{item.TheForttitleP}</p>
          )}
        </React.Fragment>
      ))}

      {/* Botões */}
      <Box sx={{
       display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        alignItems: 'center',
        marginBottom: '2rem',
        '@media (max-width:800px)': {
          gap: '5px',
          flexDirection: 'column',
        }
      }}>
        <Button
          sx={{
            width: '200px',
            height: '50px',
            background: '#3cb815',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            borderRadius: '5px',
            transition: 'all 0.5s ease-in-out',
            boxShadow: '1px 2px 11px 4px rgb(14 55 54 /40%)',
            '&:hover': {
              background: '#f75f1d',
              cursor: 'pointer',
              boxShadow: '1px 2px 11px 4px rgb(14 55 54 /80%)',
            },
            '@media (maxWidth:800px)': {
              width: '100% !important',
            },
          }}
          onClick={() => loadApp('client')}
          style={{ margin: '10px' }}
        >
          Client App
        </Button>
        <Button
          sx={{
            width: '200px',
            height: '50px',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            borderRadius: '5px',
            transition: 'all 0.5s ease-in-out',
            backgroundColor: '#3cb815',
            cursor: 'pointer',
            boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 60%)',
            '&:hover': {
              boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 80%)',
              backgroundColor: '#f75f1d',
            },
            '@media (maxWidth:800px)': {
              width: '100%',
            },
          }}
          onClick={() => loadApp('company')}
          style={{ margin: '10px' }}
        >
          Company App
        </Button>
      </Box>
    </Stack>
  )
}
