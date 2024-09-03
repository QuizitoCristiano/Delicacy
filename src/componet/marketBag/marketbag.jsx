import React, { useContext, useState } from 'react'
import {
  Box,
  Button,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import './newStyle.css'
import { AuthContext } from '../../authcontext'
import { SearchItem } from '../util/CardBodySearc'

export const BagMarket = () => {
  const { carinho, incrementarQuantidade, removerItem, totalItensCarrinho } =
    useContext(AuthContext)
  const [openModal, setOpenModal] = useState(false)
  const [removItemArray, setRemoveItemArray] = useState(null)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [itemToRemove, setItemToRemove] = useState(null)
  const [openAlert, setOpenAlert] = useState(false) // Adicionado para controle de alerta

  const handleOpenModal = () => {
    if (carinho.length === 0) {
      setOpenAlert(true) // Exibe o alerta se o carrinho estiver vazio
    } else {
      setOpenModal(true) // Abre o modal se houver itens no carrinho
    }
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const removerItemIcon = (index) => {
    removerItem(index) // Remove o item diretamente ao clicar no ícone de deletar
  }

  const handleDecrementClick = (index) => {
    setItemToRemove(index)
    setOpenConfirm(true) // Abre o diálogo de confirmação ao clicar no botão de decrementar
  }

  const handleConfirmRemove = () => {
    removerItem(itemToRemove)
    setOpenConfirm(false) // Fecha o diálogo após a confirmação
  }

  const handleCancelRemove = () => {
    setOpenConfirm(false) // Fecha o diálogo se o usuário cancelar a remoção
  }

  const renderizarItensCarrinho = () => {
    return carinho.map((produto, index) => (
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
            <Typography sx={{ fontWeight: '700', fontSize: '1.8rem' }}>
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
                onClick={() => incrementarQuantidade(index)}
              >
                +
              </button>
              <button
                className="buttonQuntidade"
                onClick={() => handleDecrementClick(index)}
              >
                -
              </button>
            </Box>
          </Stack>
        </Box>
      </Stack>
    ))
  }

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
          position: 'sticky',
          bottom: '0',
          margin: '10px',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          bgcolor: '#fff',
          padding: '10px',
          zIndex: 10,
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          sx={{
            fontWeight: '700',
            fontSize: '1.4rem',
            color: 'var(--light-orange-color)',
          }}
        >
          Total: R${' '}
          {carinho
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
          onClick={handleOpenModal}
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

      {/* Alerta de Carrinho Vazio */}
      <Dialog open={openAlert} onClose={handleCloseAlert}>
        <DialogTitle>Aviso</DialogTitle>
        <DialogContent>
          <Alert severity="info">Adicione itens ao carrinho para continuar com o processo.</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de Confirmação */}
      <Dialog open={openConfirm} onClose={handleCancelRemove}>
        <DialogTitle>Remover Item</DialogTitle>
        <DialogContent>
          Tem certeza que deseja remover este item do carrinho?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRemove} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmRemove} color="error">
            Remover
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}
