import React, { useContext, useState, useEffect } from 'react'
import './StileHeader.css'
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Box,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
} from '@mui/material'
import Lottie from 'lottie-react'
import DehazeIcon from '@mui/icons-material/Dehaze'
import StoreIcon from '@mui/icons-material/Store'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { Link, useLocation } from 'react-router-dom'

import { BagMarket } from '../componet/marketBag/marketbag'
import { SearchItem } from '../componet/util/CardBodySearc'
import { AuthContext } from '../authcontext'
import {
  getFirestore,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
  collection,
} from 'firebase/firestore'
import { db } from '../../firebaseconfig/firebaseconfig'
import AddTaskIcon from '@mui/icons-material/AddTask'
import Dellicacy from '../imgLogomarca/priclogo1.png'
import animationData from './animatino/islikeIcon.json'
import { PoupNewItem } from '../componet/bbitem/poupItem'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'

const myLink = [
  { label: 'Home', link: '' },
  { label: 'Quem_Somos', link: '/HomePage' },
  { label: 'Clientes', link: '/CustomerEvaluation' },
  { label: 'Contato', link: '/NewHelpeContato' },
]

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Algo deu errado.</h1>
    }

    return this.props.children
  }
}

export const Header = () => {
  const { user, carinho } = useContext(AuthContext)
  const [openModal, setOpenModal] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [lastAddedItem, setLastAddedItem] = useState(null)
  const [animationState, setAnimationState] = useState({
    isStopped: true,
    isPaused: false,
  })

  const { fullName, id, imgUser } = user
  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  const location = useLocation()
  const [abreMeno, setAbreMeno] = useState(false)
  const [sacola, setSacola] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)

  const [SearchItemVisible, setSearchItemVisible] = useState(false)
  const [imgUrl, setImageUrl] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const abrirMenu = () => setAbreMeno(true)
  const fecharMenu = () => setAbreMeno(false)
  const handleSearchIconClick = () => setSearchItemVisible(!SearchItemVisible)
  const handleToggleSacola = () => setSacola(!sacola)

  useEffect(() => {
    if (carinho.length > 0) {
      const lastItem = carinho[carinho.length - 1]
      setLastAddedItem(lastItem.nome)
      // Adicione o item às notificações e inicie a animação
      setNotifications((prevNotifications) => [...prevNotifications, lastItem])
      setAnimationState({ isStopped: false, isPaused: false })
      // Defina o tempo para parar a animação e remover a notificação
      const timer = setTimeout(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((item) => item !== lastItem)
        )
        setAnimationState({ isStopped: true, isPaused: false }) // Pare a animação
      }, 2000) // Ajuste o tempo conforme a duração da animação

      return () => clearTimeout(timer)
    }
  }, [carinho])

  useEffect(() => {
    setImageUrl(imgUser)
    console.log('Animation State:', animationState)
  }, [animationState])

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser && storedUser.imgUser) {
      setImageUrl(storedUser.imgUser)
    }
  }, [])

  const getInitials = (name) => {
    const names = name.split(' ')
    return names.length > 1
      ? `${names[0][0]}${names[1][0]}`?.toUpperCase()
      : names[0][0]?.toUpperCase()
  }

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = async () => {
        const image = reader.result
        await handleSaveAvatar(id, image)
      }
      reader.readAsDataURL(file)
    }
  }

  async function handleSaveAvatar(userInternalId, imageDataUrl) {
    try {
      const usersCollection = collection(db, 'users')
      const q = query(usersCollection, where('id', '==', userInternalId))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]
        const userDocRef = userDoc.ref

        // Atualiza o campo imgUser no Firestore
        await updateDoc(userDocRef, { imgUser: imageDataUrl })

        // Atualiza o localStorage com a nova imagem
        const updatedUser = { ...user, imgUser: imageDataUrl }
        localStorage.setItem('user', JSON.stringify(updatedUser))

        setImageUrl(imageDataUrl) // Atualiza o estado local
      } else {
        console.log('Nenhum documento encontrado com o id interno fornecido.')
      }
    } catch (error) {
      console.error('Erro ao atualizar o avatar:', error)
    }
  }

  const handleFecharAvatar = () => {
    setAnchorEl(null)
  }

  const handleCloseModal = () => {
    if (carinho.length === 0) {
      setOpenModal(false)
    } else {
      setSacola(false) // Fecha a sacola
      setTimeout(() => {
        setOpenModal(true) // Abre o modal de confirmação de entrega após o atraso
      }, 500) // Ajuste o tempo de atraso conforme necessário (500ms, por exemplo)
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            height: '100%',
            width: '100%',
            cursor: 'pointer',

            transition: 'all 0.3s ease',

            '@media (max-width: 600px)': {
              cursor: 'pointer',
              height: '100%',
              width: '100%',
            },
          }}
        >
          <img src={Dellicacy} className="logoImageDl" alt="Dellicacy Logo" />
        </Box>
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
              <Tooltip title="Editar Avatar" onClick={handleAvatarClick}>
                
                <Avatar alt={user ? getInitials(user.fullName) : ''} src={imgUrl || null} />

              </Tooltip>
            </Box>
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
              >
                Salvar Avatar
              </MenuItem>
            </Menu>

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
                    onClick={fecharMenu} // Adicione esta linha
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
      {/* {sacola && (
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

          <BagMarket
            handleToggleSacola={handleToggleSacola}
            openModal={openModal}
            setOpenModal={setOpenModal}
            sacola={sacola}
            setSacola={setSacola}
          />
        </Stack>
      )} */}{' '}
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
            <CloseIcon
              sx={{ fontSize: '20px' }}
              onClick={() => setSacola(false)}
            />
          </Box>

          <BagMarket
            handleToggleSacola={() => setSacola(!sacola)}
            openModal={openModal}
            setOpenModal={setOpenModal}
            sacola={sacola}
            setSacola={setSacola}
            openAlert={openAlert}
            setOpenAlert={setOpenAlert}
          />
        </Stack>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        sx={{
          zIndex: 1300,
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          '@media (max-width: 600px)': {
            margin: 0,
            borderRadius: 0,
          },
        }}
      >
        <DialogContent
          sx={{
            width: '100%',
            background: 'transparent',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '5px',
          }}
        >
          <SearchItem />
        </DialogContent>
      </Modal>
      {/* Animação */}
      {notifications.map((item, index) => (
        <PoupNewItem
          item={item}
          index={index}
          lastAddedItem={lastAddedItem}
          animationState={animationState}
          defaultOptions={defaultOptions}
        />
      ))}
    </Stack>
  )
}
