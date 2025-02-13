import { Box, Stack } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom'
import './StileHeader.css'
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))

export const NewImgAvatar = ({
  img,
  newUser,
  imgUser,
  fullName,
  getInitials,
  handleAvatarClick,
}) => {
  return (
    <div className="containerImgAvatar">
      <StyledBadge>
        <img
          onClick={handleAvatarClick}
          id="icnAvatar"
          alt={newUser ? getInitials(newUser.fullName) : ''}
          src={newUser.imgUser || undefined}
        />

        
      </StyledBadge>
    </div>
  )
}
