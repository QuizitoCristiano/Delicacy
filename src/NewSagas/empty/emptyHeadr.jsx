import React, { useState } from 'react'

import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import { List, ListItem } from '@mui/material'

import Dellicacy from '../../imgLogomarca/priclogo1.png'
import { IsNotstorage } from './companyNotification/NotStorage'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export const PrimaryAppBarHeadr = ({
  handleSearch,
  handleSearchSubmit,
  filteredCards,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const [showNotifications, setShowNotifications] = useState(false)

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev)
  }

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  return (
    <Box
      sx={{
        fontFamily: '"Almarai","Helvetica","Arial",sans-serif',
        width: '100%',
        height: '80px',
        position: 'fixed',
        padding: '10px 20px',
        top: '0',
        left: '0',
        right: '0',
        flexDirection: 'row',
        display: 'flex',
        background: 'var(--bg-color)',
        // bgcolor: 'GrayText',
        boxShadow: '0 8px 11px rgb(14 55 54 / 65%)',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: '2000',
        '@media only screen and (max-width: 805px)': {
          padding: '0px 0px',
        },
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          //   bgcolor: 'gray',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',

            justifyContent: 'center',
            height: '90%',
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

        <Search
          sx={{
            bgcolor: 'rgba(0,0,0,0.5)',
            color: '#000',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.8)',
              color: '#3cb815 ',
              cursor: 'pointer',
              transition: '0.2s',
            },
          }}
        >
          <SearchIconWrapper>
            <SearchIcon
              sx={{
                fontWeight: 'bold',
              }}
              onClick={handleSearchSubmit}
            />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Pesquisar..."
            inputProps={{ 'aria-label': 'search' }}
            variant="outlined"
            onChange={handleSearch}
          />
        </Search>

        {filteredCards.length > 0 && (
          <List
            sx={{
              position: 'absolute',
              top: '100%',
              background: '#fff',
              width: '100%',
              boxShadow: 3,
            }}
          >
            {filteredCards.map((card) => (
              <ListItem
                key={card.TextName}
                button
                onClick={() => handleSearchSubmit(String(card.TextName))}
              >
                {typeof card.TextName === 'string'
                  ? card.TextName
                  : String(card.TextName)}
              </ListItem>
            ))}
          </List>
        )}

        <Box>
          <IconButton
            size="large"
            aria-label="show notifications"
            color="inherit"
            onClick={toggleNotifications}
          >
            <Badge badgeContent={7} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

      {showNotifications && (
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            right: 0,
            zIndex: 10,
            width: '100vw',
            maxWidth: '400px',
            height: '85vh',
            bgcolor: 'white',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            transform: showNotifications ? 'translateX(0)' : 'translateX(100%)',
             overflowY: 'auto',
          }}
        >
          <IsNotstorage />
        </Box>
      )}
    </Box>
  )
}
