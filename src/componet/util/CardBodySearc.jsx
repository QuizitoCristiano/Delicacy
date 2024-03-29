import React, { useContext, useEffect, useState } from 'react'
import { Box, Stack, Typography, Button, MenuItem } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { CardStylSearche } from './CardStyles'
import { AuthContext } from '../../authcontext';






export const SearchItem = ({ SearchItemVisible, setSearchItemVisible }) => {
  const{  
    carinho,
    setCarinho,
    termoPesquisa,
    setTermoPesquisa,
    resultados,
    setResultados,
    handlePesquisar,  } = useContext(AuthContext)

 

  const adicionaSacola = (item) => {
    const confirmAdd = window.confirm(`Deseja adicionar "${item.nome}" ao carrinho?`);
    if (confirmAdd) {
      setCarinho([...carinho, item]); 
    }
  };
  



  return (
    <>
      <CardStylSearche.ContainerCard>
        <CardStylSearche.wrapperBox>
          <CardStylSearche.containerIpute
            type="text"
            id="frutaInput"
            placeholder="Digite sua pesquisa"
            oninput="sugerirFrutas()"
            onChange={(e) => setTermoPesquisa(e.target.value)}
          />
          <CardStylSearche.containerButton onClick={handlePesquisar}>
            Pesquisar
          </CardStylSearche.containerButton>
        </CardStylSearche.wrapperBox>

        <div className="frutis-Box">
          <ul id="frutaSugestoes">
          {resultados.map((produto) => (
            
          <MenuItem sx={{fontSize: '20px'}} onClick={()=> adicionaSacola(produto)} key={produto.id}>{produto.nome}</MenuItem>
        ))}
          </ul>
        </div>
      </CardStylSearche.ContainerCard>
    </>
  )
}
