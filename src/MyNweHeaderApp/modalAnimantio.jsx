import React, { useState, useEffect, useCallback } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import animationData from './path-to-your-lottie-file.json'; // Substitua pelo caminho correto

const Notification = ({ notifications }) => {
  // Este componente só renderiza quando há notificações
  if (notifications.length === 0) return null;

  return (
    <Stack
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
          animationData={animationData}
          loop={false}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </Box>

      <Typography sx={{ fontSize: '1.6rem', fontWeight: 'bold' }}>
        {notifications[0]} {/* Exibe a primeira notificação na fila */}
      </Typography>
    </Stack>
  );
};

const App = () => {
  const [notifications, setNotifications] = useState([]);
  const [carinho, setCarinho] = useState([]);

  // Função para adicionar item ao carinho
  
  useEffect(() => {
    if (carinho.length > 0) {
      const lastItem = carinho[carinho.length - 1];

      // Adicionar a notificação apenas se ela ainda não estiver na fila
      setNotifications((prevNotifications) => {
        if (!prevNotifications.includes(lastItem.nome)) {
          return [...prevNotifications, lastItem.nome];
        }
        return prevNotifications;
      });

      // Remover a notificação após 1 segundo
      const timer = setTimeout(() => {
        setNotifications((prev) => prev.slice(1)); // Remove a primeira notificação da fila
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [carinho]);

  return (
    <div>
      {/* Sua UI para adicionar itens ao carinho */}
      <button onClick={() => adicionarItem({ nome: 'Batata' })}>Adicionar Batata</button>
      <button onClick={() => adicionarItem({ nome: 'Abóbora' })}>Adicionar Abóbora</button>

      {/* Componente de notificação */}
      <Notification notifications={notifications} />
    </div>
  );
};

export default App;
