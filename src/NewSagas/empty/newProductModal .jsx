import React from 'react'
import { Box, Button, Modal } from '@mui/material'

const ProductModal = ({ openModal, handleClose, selectedProduct }) => (
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
        '@media (max-width: 750px)': {
          width: '97%',
        },
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
        As suas Compras serão realizadas : {selectedProduct}
      </h5>
        <Box sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
  
        }}>


        <Button
        onClick={handleClose}
        sx={{
            marginTop: "50px",
            height: "50px",
            width: "40%",
            fontSize: '15px',
            fontWeight: "bold",
            borderRadius: "15px 0px 15px 0px",
            bgcolor: "rgb(51, 191, 48)",
            color: "#fff",
            boxShadow: "20px 20px 50px rgba(0, 0, 0, 0.4)",
            cursor: "pointer",
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

        sx={{
          marginTop: "50px",
          height: "50px",
          width: "40%",
          borderRadius: "15px 0px 15px 0px",
          bgcolor: "rgb(51, 191, 48)",
          color: "#fff",
          boxShadow: "20px 20px 50px rgba(0, 0, 0, 0.4)",
          cursor: "pointer",
          fontSize: '15px',
          fontWeight: "bold",
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
)

export default ProductModal
