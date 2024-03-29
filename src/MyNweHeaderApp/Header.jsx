import React, { useContext, useState } from 'react'
import './StileHeader.css'
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import DehazeIcon from '@mui/icons-material/Dehaze'
import { Box, Stack, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import StoreIcon from '@mui/icons-material/Store'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search'
import { BagMarket } from '../componet/marketBag/marketbag'
import CloseIcon from '@mui/icons-material/Close'
import { SearchItem } from '../componet/util/CardBodySearc'
import { AuthContext } from '../authcontext'

const myLink = [
  {
    label: 'Home',
    link: '/',
  },

  {
    label: 'Quem_Somos',
    link: '/quem_Somos',
  },
  {
    label: 'Clintes',
    link: '/clintes',
  },
  {
    label: 'Contato',
    link: '/contato',
  },
]

export const Header = () => {
  const { user, carinho } = useContext(AuthContext)
  const location = useLocation()
  const [abreMeno, setAbreMeno] = useState(false)
  const [sacola, setSacola] = useState(false)
  const [SearchItemVisible, setSearchItemVisible] = useState(false)
  const [avatarImage, setAvatarImage] = useState(
    localStorage.getItem('avatarImage') || null
  ) // Estado para armazenar a imagem do avatar

  const handleSearchIconClick = () => {
    setSearchItemVisible(!SearchItemVisible)
  }

  const abrirMenu = () => {
    setAbreMeno(true)
  }

  const fecharMenu = () => {
    setAbreMeno(false)
  }

  const handleToggleSacola = () => {
    setSacola(!sacola) // Inverte o estado da sacola ao clicar no ícone do carrinho
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => {
        // Armazena a imagem no localStorage
        localStorage.setItem('avatarImage', reader.result)
        // Atualiza o estado com a imagem selecionada
        setAvatarImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
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
          transition: '0.5s',
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
            // bgcolor: "#b3d6e4",
            justifyContent: 'center',
            height: '100%',
            width: '30%',
          }}
        >
          <StoreIcon
            sx={{
              color: 'var(--light-orange-color)',
              fontSize: '3rem',
            }}
          />

          <Typography>
            <Link className="logoDelicacy" to="/">
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

                position: 'relative',
                gap: '2rem',
                height: '100%',
                width: '100%',
              }}
            >
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <label htmlFor="avatarInput">
                    <IconButton component="span">
                      {/* Renderiza o Avatar com a imagem selecionada ou padrão */}
                      <Avatar
                        alt="User Avatar"
                        src={avatarImage || '/path/to/avatar.jpg'}
                      />
                    </IconButton>
                  </label>
                </Tooltip>
                {/* Input invisível para seleção de arquivo de imagem */}
                <input
                  id="avatarInput"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                />
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
                  sx={{
                    color: 'var(--light-orange-color)',
                    fontSize: '25px',
                  }}
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
                        transition: ' 0.2s ease-out', // Adicionando a transição
                        transform: SearchItemVisible
                          ? 'translateX(0)'
                          : 'translateX(100%)', // Aplicando a transformação
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

              // backgroundColor: "rgba(128,128,128,0.9)",
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
              <CloseIcon
                sx={{ fontSize: '20px' }}
                onClick={handleToggleSacola}
              />
            </Box>

            <BagMarket sacola={sacola} setSacola={setSacola} />
          </Stack>
        )}
      </Stack>
    </>
  )
}
