import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import { ModalBoleto } from './ModalBoleto';

const Comprovante = () => {
  const [formData, setFormData] = useState({ paymentMethod: '' });
  const [isBoletoModalOpen, setBoletoModalOpen] = useState(false);
  const [boletoData, setBoletoData] = useState(null); // Dados do boleto

  // Função para gerar o boleto
  const generateBoleto = async () => {
    const codigoDeBarras = Math.random().toString().slice(2, 14); // Exemplo simples
    return {
      codigoDeBarras,
      linkPdf: 'https://www.example.com/boleto.pdf',
    };
  };

  // Abrir o modal e gerar o boleto
  const handleOpenBoletoModal = async () => {
    const data = await generateBoleto();
    setBoletoData(data);
    setBoletoModalOpen(true);
  };

  const handleCloseBoletoModal = () => {
    setBoletoModalOpen(false);
  };

  // Alteração no método de pagamento
  const handlePaymentMethodChange = async (value) => {
    setFormData({ ...formData, paymentMethod: value });

    if (value === 'código de barras') {
      await handleOpenBoletoModal();
    }
  };

  const paymentMethods = [
    { label: 'Pix', value: 'pix' },
    { label: 'Cartão de Crédito', value: 'credit_card' },
    { label: 'Cartão de Débito', value: 'debit_card' },
    { label: 'Alimentação', value: 'alimentacao' },
    { label: 'Código de Barras', value: 'código de barras' },
    { label: 'Refeição', value: 'refeicao' },
    { label: 'Pagamento na Entrega', value: 'cash_on_delivery' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.7rem',
        width: '100%',
      }}
    >
      <FormControl fullWidth>
        <InputLabel>Método de Pagamento</InputLabel>
        <Select
          value={formData.paymentMethod || ''}
          onChange={(e) => handlePaymentMethodChange(e.target.value)}
        >
          {paymentMethods.map((method) => (
            <MenuItem key={method.value} value={method.value}>
              {method.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Modal do Boleto */}
      <ModalBoleto
        open={isBoletoModalOpen}
        onClose={handleCloseBoletoModal}
        boletoData={boletoData}
      />
    </Box>
  );
};

export default Comprovante;




// leticiajosealbino@gmail.com
// Leticia29

// willjose121@gmail.com
// Will5543
// 74580-520

// felipemario@gmail.com
// agostinho@25


// anaclaudia@gmail.com
// AnaClaudia28

// kuizitocritiano@10gmail.com
// Agostinho10

// lynacristiano28@gmai.com
// lyina28

// biancamario29@gmail.com

// bianca25


// lisaniatharciso18@gmail.com
// 1983628lT


// marjory@gmai.com
// 1903647


// emerina@gmail.com
// ncvhsakid8



// andoni6743@uorak.com
// 1524380



// delicacy10@gmail.com
// delicaclly19


// quizitocritiano@10gmail.com
// Agostinho@10