import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./newStyle.css";

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
  const [itemsCarrinho, setItemsCarrinho] = useState(carrinho);

  const toggleSacola = () => {
    setSacolaAberta(!sacolaAberta);
    if (setSacola) {
      setSacola(!sacolaAberta);
    }
  };

  const adicionarItem = (index) => {
    const novoCarrinho = [...itemsCarrinho];
    novoCarrinho[index].quantidade++;
    setItemsCarrinho(novoCarrinho);
  };

  const removerItemIcon = (index) => {
    const novoCarrinho = itemsCarrinho.filter((_, i) => i !== index);
    setItemsCarrinho(novoCarrinho);
  };

  const removerItem = (index) => {
    const novoCarrinho = [...itemsCarrinho];
    if (novoCarrinho[index].quantidade > 1) {
      novoCarrinho[index].quantidade--;
    } else {
      if (window.confirm("Tem certeza que deseja remover este item?")) {
        novoCarrinho.splice(index, 1);
      }
    }
    setItemsCarrinho(novoCarrinho);
  };

  const renderizarItensCarrinho = () => {
    return itemsCarrinho.map((produto, index) => (
      <Stack
        sx={{
          width: "100%",
          bgcolor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          borderRadius: "5px",
          margin: "0px 5px 5px 0px",
          boxShadow: "1px 2px 11px 4px rgb(14 55 54 / 45%)",
          gap: "2rem",
        }}
        key={index}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              margin: "5px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "1.8rem",
              }}
            >
              {produto.nome}
            </Typography>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "1.8rem",
                marginTop: " 0.5rem",
                color: " var(--light-orange-color)",
              }}
            >
              Preço: R$ {produto.preco}
            </Typography>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "1.8rem",
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
              margin: "5px",
              gap: "3px",
            }}
          >
            <Box>
              <DeleteIcon
                onClick={() => removerItemIcon(index)}
                sx={{
                  color: "var(--light-orange-color)",
                  fontWeight: 800,
                  fontSize: "2.3rem",
                  cursor: "pointer",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "8px",
                justifyContent: "flex-end",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <button
                className="buttonQuntidade"
                onClick={() => adicionarItem(index)}
              >
                +
              </button>
              <button
                className="buttonQuntidade"
                onClick={() => removerItem(index)}
              >
                -
              </button>
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h2>Minha Sacola de Compras</h2>
      <button onClick={toggleSacola}>Abrir Sacola</button>
      {sacolaAberta && (
        <Stack
          sx={{
            width: "100%",
            margin: "10px",
            height: "690px",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column",
            overflowY: "auto",
            padding: "10px",
            overflowX: "hidden",
          }}
        >
          <button onClick={toggleSacola}>Fechar Sacola</button>
          {renderizarItensCarrinho()}
        </Stack>
      )}

      <Box
        sx={{
          width: "100%",
          margin: "10px",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            color: "var(--light-orange-color)",
          }}
        >
         Total: R${" "}
          {itemsCarrinho
            .reduce(
              (total, item) => total + item.preco * item.quantidade,
              0
            )
            .toFixed(2)
            .toLocaleString()}
        </Typography>

        <Button
          sx={{
            color: "white",
            border: "none",
            padding: "10px 15px",
            cursor: "pointer",
            borderRadius: "5px",
            fontSize: "1rem",
            fontWeight: "600",
            bgcolor: "var(--green-color)",

            ":hover": {
              backgroundColor: "var(--orange-color)",
            },
          }}
          onClick={() => {
            setSacola(true);
          }}
        >
          Finalizar Compra
        </Button>
      </Box>
    </Stack>
  );
};
