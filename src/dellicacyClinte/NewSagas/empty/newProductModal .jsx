

import React, { useState, useEffect } from 'react'
import { Box, Stack, Button, styled, Modal } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { StyleEmptyLoader } from './emptyLoader'



const ProductModal = ({ openModal, handleClose, selectedProduct }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleNavigate = () => {
    setLoading(true)
    setTimeout(() => {
      navigate('/MyHome', {
        state: { selectedProduct },
      })
      setLoading(false)
      handleClose()
    }, 1000) // Tempo para exibir o loader antes de navegar
  }

  return (
    <>
      {loading && (
        <StyleEmptyLoader.containerCardLoader>
        <StyleEmptyLoader.loader sx={{ animation: 'rotation 1s linear infinite' }}>
          <StyleEmptyLoader.loaderAfter />
        </StyleEmptyLoader.loader >
        <div>Logando...</div>
      </StyleEmptyLoader.containerCardLoader>
      )}

    

      <Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            borderRadius: '15px',
            p: 4,
            boxShadow: '20px 20px 50px rgba(0, 0, 0, 0.9)',
            '@media (max-width: 750px)': { width: '97%' },
          }}
        >
          <h5
            style={{
              fontWeight: 800,
              fontSize: '18px',
              marginBottom: '20px',
              color: 'rgb(51, 191, 48)',
            }}
          >
            As suas Compras serão realizadas: {selectedProduct}
          </h5>
          <Box
            sx={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button
              onClick={handleClose}
              sx={{
                marginTop: '50px',
                height: '50px',
                width: '40%',
                fontSize: '15px',
                fontWeight: 'bold',
                borderRadius: '15px 0px 15px 0px',
                bgcolor: 'rgb(51, 191, 48)',
                color: '#fff',
                boxShadow: '20px 20px 50px rgba(0, 0, 0, 0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: '0 0 15px 5px #f75f1d',
                  background: '#3cb815',
                  transform: 'scale(1.05)',
                  color: '#f75f1d',
                },
              }}
            >
              Fechar
            </Button>

            <Button
              onClick={handleNavigate}
              disabled={loading}
              sx={{
                marginTop: '50px',
                height: '50px',
                width: '40%',
                borderRadius: '15px 0px 15px 0px',
                bgcolor: 'rgb(51, 191, 48)',
                color: '#fff',
                boxShadow: '20px 20px 50px rgba(0, 0, 0, 0.4)',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: 'bold',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: '0 0 15px 5px #3cb815',
                  background: '#3cb815',
                  transform: 'scale(1.05)',
                },
              }}
            >
              Vamos lá
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default ProductModal
