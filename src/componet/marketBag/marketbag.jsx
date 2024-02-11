import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Supondo que você tenha os itens do carrinho disponíveis neste formato
const carrinho = [
  {
    nome: 'Produto 1',
    quantidade: 2,
    preco: 10.99,
  },
  {
    nome: 'Produto 2',
    quantidade: 1,
    preco: 5.99,
  },
];

export const BagMarket = ({ sacola, setSacola }) => {
  const toggleDrawer = (open) => () => {
    setSacola(open);
  };

  // Função para renderizar os itens do carrinho
  const renderizarItensCarrinho = () => {
    return carrinho.map((produto, index) => (
      <Box key={index}>
        <Box>
          <ShoppingCartIcon />
        </Box>
        <ListItemText
          primary={produto.nome}
          secondary={`Quantidade: ${produto.quantidade}`}
        />
      </Box>
    ));
  };

  return (
    <Drawer anchor="right" open={sacola} onClose={toggleDrawer(false)}>
      <Box
        sx={{
          position: "relative",
          padding: "20px",
          bgcolor: "#fff",
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <h2>Itens no Carrinho</h2>
        <CloseIcon
          sx={{
            top: 10,
            right: 10,
            position: "absolute",
            cursor: "pointer",
            fontWeight: "800",
            fontSize: "2rem",
            color: "var(--light-orange-color)",
          }}
          onClick={toggleDrawer(false)}
        />
        <List>{renderizarItensCarrinho()}</List>
      </Box>
    </Drawer>
  );
};
