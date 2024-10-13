import React, { useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import JsBarcode from 'jsbarcode';

export const ModalBoleto = ({ open, onClose, boletoData }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (open && boletoData && barcodeRef.current) {
      JsBarcode(barcodeRef.current, boletoData.codigoDeBarras, {
        format: 'CODE128',
        width: 2,
        height: 100,
        displayValue: true,
      });
    }
  }, [open, boletoData]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <h3>Boleto Gerado</h3>
        <svg ref={barcodeRef}></svg>
        <Button
          href={boletoData?.linkPdf}
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
        >
          Baixar Boleto PDF
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
