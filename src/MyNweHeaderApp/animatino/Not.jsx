import React from 'react'
import { motion } from 'framer-motion'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'

export const ItemNotification = () => {
  const createSmokePuff = () => ({
    initial: { opacity: 0.8, scale: 0.5, x: 0, y: 0 },
    animate: {
      opacity: 0,
      scale: 1.5, // Bolinha se expande
      x: -30, // Move para trás horizontalmente
      y: -20, // Move para cima verticalmente
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatDelay: 0.5,
      ease: 'easeOut',
    },
  })

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '5px',
       
        cursor: 'pointer',
        width: '900px',
        height: '100x',
        background: '#f0f4f8',
        
      }}
    >
      <motion.div
        initial={{ x: '-150%' }}
        animate={{ x: '70%' }}
        transition={{ duration: 6 }}
        style={{
          position: 'absolute',
          bottom: '60px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Bolinhas de Fumaça no Estilo 💨 */}
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            style={{
              position: 'absolute',
              left: '-30px',
              bottom: 10 + index * 5, // Cada fumaça começa em uma posição ligeiramente diferente
              width: 20,
              height: 20,
              backgroundColor: 'rgba(200, 200, 200, 0.5)', // Cor de fumaça translúcida
              borderRadius: '50%',
              boxShadow: '0 0 10px rgba(200, 200, 200, 0.8)', // Efeito suave de fumaça
            }}
            {...createSmokePuff()}
          />
        ))}

        {/* Caminhão */}
        <LocalShippingIcon style={{ fontSize: 40, color: '#3cb815' }} />
      </motion.div>
    </div>
  )
}
