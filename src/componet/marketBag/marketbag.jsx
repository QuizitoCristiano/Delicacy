import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const carrinho = [
  {
    nome: " Tangerina",
    quantidade: 2,
    preco: 10.99,
  },
  {
    nome: "Laranja",
    quantidade: 1,
    preco: 5.99,
  },
  {
    nome: "Ameixa",
    quantidade: 1,
    preco: 5.99,
  },
  {
    nome: "Blueberry",
    quantidade: 1,
    preco: 5.99,
  },
];

export const BagMarket = ({ sacola, setSacola }) => {
  const [sacolaAberta, setSacolaAberta] = useState(false);

  const toggleSacola = () => {
    setSacolaAberta(!sacolaAberta);
    if (setSacola) {
      setSacola(!sacolaAberta);
    }
  };

  const renderizarItensCarrinho = () => {
    return carrinho.map((produto, index) => (
      <Stack
        sx={{
          width: "100%",
          bgcolor: "pink",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "2rem",
        }}
        key={index}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "5px",
            flexDirection: "row",
            width: "100%",
            
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "1.2rem",
              }}
            >
              {produto.nome}
            </Typography>
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "1.2rem",
                marginTop: " 0.5rem",
                color: " var(--light-orange-color)",
              }}
            >
              Preço: R$ {produto.preco}
            </Typography>

            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "1.2rem",
                marginTop: " 0.5rem",
              }}
            >
              Quantidade: {produto.quantidade}
            </Typography>
          </Box>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              flexDirection: "column",
              gap: "3px",
              margin: "5px",
            }}
          >
            <Box>
              <DeleteIcon
                sx={{
                  color: "var(--light-orange-color)",

                  fontWeight: 800,
                  fontSize: "2.3rem",
                }}
              />
            </Box>

            <Box sx={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'flex-end',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Button sx={{
                border: 'none',
                outline: 'none',
                background: 'var(--green-color)',
                color: 'var(--bg-color)',
                fontSize: '20px',
                borderRadius: '1.5rem 0 1.5rem 0',
              }}>+</Button>
              <Button 
              sx={{
                background: 'var(--green-color)',
                color: 'var(--bg-color)',
                fontSize: '20px',
                borderRadius: '1.5rem 0 1.5rem 0',
              }}
              >-</Button>
            </Box>
          </Stack>
        </Box>
      </Stack>
    ));
  };

  return (
    <Stack
      sx={{
        width: "100%",
        height: "auto",
        bgcolor: "peachpuff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "2rem",

        boxShadow: "1px 2px 11px 4px rgba(14, 55, 54, 0.15)",
      }}
    >
      <h2>Minha Sacola de Compras</h2>
      <button onClick={toggleSacola}>Abrir Sacola</button>
      {sacolaAberta && (
        <Stack
          sx={{
            width: "100%",
            margin: "10px",
            borderRadius: "5px",
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <button onClick={toggleSacola}>Fechar Sacola</button>
          {renderizarItensCarrinho()}
        </Stack>
      )}
    </Stack>
  );
};
