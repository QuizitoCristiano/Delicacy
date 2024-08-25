import React, { useContext, useState } from 'react'
import './StileHeader.css'
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Box,
  Stack,
  Typography,
} from '@mui/material'
import DehazeIcon from '@mui/icons-material/Dehaze'
import StoreIcon from '@mui/icons-material/Store'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { Link, useLocation } from 'react-router-dom'
import { BagMarket } from '../componet/marketBag/marketbag'
import { SearchItem } from '../componet/util/CardBodySearc'
import { AuthContext } from '../authcontext'
import {getFirestore, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseconfig/firebaseconfig';

const myLink = [
  { label: 'Home', link: '/MyHome' },
  { label: 'Quem_Somos', link: '/HomePage' },
  { label: 'Clientes', link: '/CustomerEvaluation' },
  { label: 'Contato', link: '/NewHelpeContato' },
]

export const Header = () => {
  const { user, carinho } = useContext(AuthContext)
  const location = useLocation()
  const [abreMeno, setAbreMeno] = useState(false)
  const [sacola, setSacola] = useState(false)
  const [SearchItemVisible, setSearchItemVisible] = useState(false)
  const [avatarImage, setAvatarImage] = useState(
    localStorage.getItem('avatarImage') || ''
  )
  const [anchorEl, setAnchorEl] = useState(null)

  const abrirMenu = () => setAbreMeno(true)
  const fecharMenu = () => setAbreMeno(false)
  const handleSearchIconClick = () => setSearchItemVisible(!SearchItemVisible)
  const handleToggleSacola = () => setSacola(!sacola)

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget)
  const handleFecharAvatar = () => setAnchorEl(null)

  const handleCloseMenu = () => setAnchorEl(null)

  const handleAvatarChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => {
        const image = reader.result
        console.log('Imagem selecionada:', image) // Verifique a URL da imagem
        localStorage.setItem('avatarImage', image)
        setAvatarImage(image)
      }
      reader.readAsDataURL(file)
    }
  }

  async function handleSaveAvatar(userId, imageDataUrl) {
    try {
      // Verifique o tipo e valor de userId
      if (typeof userId !== 'string' || !userId.trim()) {
        throw new Error('O ID do usuário deve ser uma string não vazia.');
      }
      console.log(`ID do usuário: ${userId}`); // Verifique o valor do ID
  
      // Crie uma referência para o documento do usuário
      const userDocRef = doc(db, 'users', userId);
  
      // Atualize o campo imgUser com a URL da imagem
      await updateDoc(userDocRef, {
        imgUser: imageDataUrl
      });
  
      console.log('Avatar atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o avatar:', error);
    }
  }
  



  return (
    <Stack
      sx={{
        fontFamily: '"Almarai","Helvetica","Arial",sans-serif',
        width: '100%',
        height: '80px',
        position: 'fixed',
        padding: '20px 50px',
        top: '0',
        left: '0',
        right: '0',
        flexDirection: 'row',
        display: 'flex',
        background: 'var(--bg-color)',
        boxShadow: '0 8px 11px rgb(14 55 54 / 35%)',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: '2000',
        '@media only screen and (max-width: 805px)': {
          padding: '10px 10px',
        },
      }}
    >
      {/* Logo e Título */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          height: '100%',
          width: '30%',
        }}
      >
        <StoreIcon
          sx={{ color: 'var(--light-orange-color)', fontSize: '3rem' }}
        />
        <Typography>
          <Link className="logoDelicacy" to="/MyHome">
            Delicacy
          </Link>
        </Typography>
      </Box>

      <Stack
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          height: '100%',
          width: '70%',
        }}
      >
        {/* Links de Navegação */}
        <Stack
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            fontSize: '1.7rem',
            gap: '2rem',
            height: '100%',
            width: '100%',
          }}
        >
          <div className="logo-links">
            {myLink.map((item, index) => (
              <Link
                to={item.link}
                key={index}
                style={{
                  color: item.link === location.pathname ? '#fff' : 'black',
                  background: item.link === location.pathname && '#3cb815',
                  boxShadow:
                    item.link === location.pathname &&
                    'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
                  borderRadius: item.link === location.pathname && '5px',
                  padding: '5px',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Ícones */}
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexDirection: 'row',
              gap: '2rem',
              height: '100%',
              width: '100%',
            }}
          >
            <Box
              sx={{
                flexGrow: 0,
                borderRadius: '50%',
                border: '1px solid #3cb815',
              }}
            >
              <Tooltip title="Editar Avatar">
                <IconButton onClick={handleAvatarClick}>
                  <Avatar src={avatarImage}>
                    {!avatarImage && getInitials(user?.displayName || '')}
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem
                  style={{
                    right: '0',
                    top: '10%',
                    gap: '20px',
                    width: '19rem',
                    height: '19rem',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'left',
                      alignItems: 'left',
                      gap: '10px',
                      padding: '20px',
                      borderRadius: '5px',
                      backgroundColor: '#3cb815',
                      color: '#fff',
                    }}
                  >
                    <CloseIcon
                      onClick={handleFecharAvatar}
                      sx={{
                        color: 'var(--light-orange-color)',
                        fontSize: '25px',
                      }}
                    />
                  </Box>

                  <label htmlFor="avatarInput" style={{ cursor: 'pointer' }}>
                    Selecionar Avatar
                  </label>
                  <input
                    id="avatarInput"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleAvatarChange}
                  />
                </MenuItem>
                <MenuItem
                  sx={{
                    color: 'var(--light-orange-color)',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                  }}
                  onClick={handleSaveAvatar}
                >
                  Salvar Avatar
                </MenuItem>
              </Menu>
            </Box>

            <Box
              sx={{
                color: 'var(--light-orange-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                height: '37px',
                width: '37px',
              }}
            >
              <SearchIcon
                sx={{ color: 'var(--light-orange-color)', fontSize: '25px' }}
                onClick={handleSearchIconClick}
              />
              <Stack>
                {SearchItemVisible && (
                  <Stack
                    sx={{
                      position: 'fixed',
                      height: '100vh',
                      width: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      boxShadow: '20px 20px 50px rgba(0, 0, 0, 0.4)',
                      backdropFilter: 'blur(20px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      top: '2px',
                      right: '0',
                      padding: '20px',
                      zIndex: '20000',
                      transition: '0.2s ease-out',
                      transform: SearchItemVisible
                        ? 'translateX(0)'
                        : 'translateX(100%)',
                      '@media only screen and (max-width: 805px)': {
                        width: '97%',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '5px',
                        cursor: 'pointer',
                        color: 'var(--light-orange-color)',
                        fontSize: '30px',
                      }}
                    >
                      <CloseIcon
                        sx={{ fontSize: '20px' }}
                        onClick={handleSearchIconClick}
                      />
                    </Box>

                    <SearchItem
                      SearchItemVisible={SearchItemVisible}
                      setSearchItemVisible={setSearchItemVisible}
                    />
                  </Stack>
                )}
              </Stack>
            </Box>

            <Box
              sx={{
                position: 'relative',
                color: 'var(--light-orange-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                height: '37px',
                width: '37px',
              }}
            >
              <Stack
                sx={{
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: '-5px',
                  left: '-1px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: 'orange',
                }}
              >
                {carinho.length}
              </Stack>

              <ShoppingCartIcon
                sx={{ fontSize: '20px' }}
                onClick={handleToggleSacola}
              />
            </Box>

            <Box
              sx={{
                color: 'black',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                height: '37px',
                width: '37px',
                '@media (max-width:800px)': {
                  display: 'flex',
                },
              }}
              className="logo-icons"
            >
              <span onClick={abrirMenu}>
                {abreMeno ? (
                  <CloseIcon sx={{ fontSize: '25px' }} />
                ) : (
                  <DehazeIcon sx={{ fontSize: '25px' }} />
                )}
              </span>
            </Box>
          </Stack>
        </Stack>

        {/* Menu para Dispositivos Móveis */}
        {abreMeno && (
          <div className="menu-celular">
            <div className="icone-fechar" onClick={fecharMenu}>
              <Typography sx={{ fontSize: '25px' }}>Fechar</Typography>
              <CloseIcon sx={{ fontSize: '25px' }} />
            </div>
            <div className="itens-menu-celular">
              {myLink.map((item, index) => {
                const isLink = item.link === location.pathname
                return (
                  <Link
                    style={{
                      color: isLink ? '#fff' : 'black',
                      borderRadius: '5px',
                      padding: isLink && '4px',
                      boxShadow:
                        isLink &&
                        'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
                      transition: 'all .3s',
                      background: isLink && '#3cb815',
                    }}
                    to={item.link}
                    key={index}
                  >
                    <p>{item.label}</p>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </Stack>

      {/* Componente da Sacola de Compras */}
      {sacola && (
        <Stack
          sx={{
            position: 'fixed',
            height: '100vh',
            width: '360px',
            bgcolor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            zIndex: '1000',
            top: '82px',
            right: '0',
            padding: '20px',
            boxShadow: '0 8px 11px rgb(14 55 54 / 55%)',
            '@media only screen and (max-width: 805px)': {
              width: '97%',
            },
          }}
          className={sacola ? 'sacola-ativa' : ''}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '10px',
              right: '5px',
              cursor: 'pointer',
              color: 'var(--light-orange-color)',
              fontSize: '30px',
            }}
          >
            <CloseIcon sx={{ fontSize: '20px' }} onClick={handleToggleSacola} />
          </Box>

          <BagMarket sacola={sacola} setSacola={setSacola} />
        </Stack>
      )}
    </Stack>
  )
}
