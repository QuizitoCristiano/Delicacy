import React, { useContext, useState } from 'react';
import { Box, Button, Stack, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './newStyle.css';
import { AuthContext } from '../../authcontext';
import { SearchItem } from '../util/CardBodySearc';

export const BagMarket = ({ sacola, setSacola }) => {
  const { carinho, setCarinho } = useContext(AuthContext);
  const [sacolaAberta, setSacolaAberta] = useState(false);
  const [itemsCarrinho, setItemsCarrinho] = useState(carinho);
  const [removItemArray, setRemoveItemArray] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
    setCarinho(novoCarrinho);
  };

  const removerItem = (index) => {
    const novoCarrinho = [...itemsCarrinho];
    if (novoCarrinho[index].quantidade > 1) {
      novoCarrinho[index].quantidade--;
    } else {
      if (window.confirm('Tem certeza que deseja remover este item?')) {
        novoCarrinho.splice(index, 1);
      }
    }
    setItemsCarrinho(novoCarrinho);
    setCarinho(novoCarrinho);
  };

  const adicionarNovoItem = (produto) => {
    // Adicionar o mesmo produto como um novo item no carrinho sem somar à quantidade
    const novoItem = { ...produto, quantidade: 1 };
    setItemsCarrinho([...itemsCarrinho, novoItem]);
    setCarinho([...itemsCarrinho, novoItem]);
  };

  const removerItemIcon = (index) => {
    setRemoveItemArray(index);
    setTimeout(() => {
      const novoCarrinho = itemsCarrinho.filter((_, i) => i !== index);
      setItemsCarrinho(novoCarrinho);
      setCarinho(novoCarrinho);
      setRemoveItemArray(null);
    }, 500);
  };

  const renderizarItensCarrinho = () => {
    return itemsCarrinho.map((produto, index) => (
      <Stack
        key={index}
        sx={{
          width: '100%',
          bgcolor: removItemArray === index ? 'rgba(255, 0, 0, 0.3)' : '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          borderRadius: '5px',
          margin: '0px 5px 5px 0px',
          boxShadow: '1px 2px 11px 4px rgb(14 55 54 / 45%)',
          gap: '2rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: '100%',
              margin: '5px',
            }}
          >
            <Typography
              sx={{
                fontWeight: '700',
                fontSize: '1.8rem',
              }}
            >
              {produto.nome}
            </Typography>
            <Typography
              sx={{
                fontWeight: '700',
                fontSize: '1.8rem',
                marginTop: '0.5rem',
                color: 'var(--light-orange-color)',
              }}
            >
              Preço: R$ {produto.price}
            </Typography>
            <Typography
              sx={{
                fontWeight: '700',
                fontSize: '1.8rem',
                marginTop: '0.5rem',
              }}
            >
              Quantidade: {produto.quantidade}
            </Typography>
          </Box>
          <Stack
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              flexDirection: 'column',
              margin: '5px',
              gap: '3px',
            }}
          >
            <Box>
              <DeleteIcon
                onClick={() => removerItemIcon(index)}
                sx={{
                  color: 'var(--light-orange-color)',
                  fontWeight: 800,
                  fontSize: '2.3rem',
                  cursor: 'pointer',
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
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
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        flexDirection: 'column',
      }}
    >
      <h2>Minha Sacola de Compras</h2>
      <Stack
        sx={{
          width: '100%',
          margin: '10px',
          height: '71%',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          overflowY: 'auto',
          padding: '10px',
          overflowX: 'hidden',
        }}
      >
        {renderizarItensCarrinho()}
      </Stack>

      <Box
        sx={{
          width: '100%',
          margin: '10px',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <Typography
          sx={{
            fontWeight: '700',
            color: 'var(--light-orange-color)',
          }}
        >
          Total: R${' '}
          {itemsCarrinho
            .reduce((total, item) => total + item.price * item.quantidade, 0)
            .toFixed(2)
            .toLocaleString()}
        </Typography>

        <Button
          sx={{
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            cursor: 'pointer',
            borderRadius: '5px',
            fontSize: '1rem',
            fontWeight: '600',
            bgcolor: 'var(--green-color)',
            ':hover': {
              backgroundColor: 'var(--orange-color)',
            },
          }}
          onClick={() => {
            toggleSacola(); // Fechar a sacola
            handleOpenModal(); // Abrir o modal
          }}
        >
          Finalizar Compra
        </Button>
      </Box>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            zIndex: 1300,
          },
        }}
      >
        <DialogTitle>Confirmar Dados da Entrega</DialogTitle>
        <DialogContent>
          <SearchItem />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};
