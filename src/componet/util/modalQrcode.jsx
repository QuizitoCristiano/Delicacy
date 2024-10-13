import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material'
import QRCode from 'react-qr-code'

export const ModalQRCode = ({ open, onClose }) => {
  const pixValue = 'Quizito Cristiano Agostinho'

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent
        sx={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}
      >
        <QRCode value={pixValue} size={200} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
