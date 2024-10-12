import React, { useState, useEffect } from 'react'
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  styled,
} from '@mui/material'
import axios from 'axios'
import InputMask from 'react-input-mask'
import { getAuth } from 'firebase/auth'
import { db } from '../../../firebaseconfig/firebaseconfig'

const SearchItem = () => {
  const auth = getAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    telefone: '',
    cpf: '',
    email: '',
    enderecoDaEntrega: '',
  })

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          await getAddressFromCoordinates(latitude, longitude)
        },
        (error) => {
          console.error('Erro ao obter localização: ', error)
        }
      )
    } else {
      alert('A geolocalização não é suportada pelo seu navegador.')
    }
  }

  const getAddressFromCoordinates = async (lat, lon) => {
    try {
      const apiKey = 'SUA_API_KEY_GOOGLE'
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`
      )

      const address = response.data.results[0]?.formatted_address || ''
      setFormData(prevData => ({ ...prevData, enderecoDaEntrega: address })) // Atualiza o campo de endereço
    } catch (error) {
      console.error('Erro ao obter endereço:', error)
    }
  }

  useEffect(() => {
    fetchUserLocation()
  }, [])

  const handleInputChange = (fullName, value) => {
    setFormData(prevData => ({ ...prevData, [fullName]: value }))
    localStorage.setItem('userData', JSON.stringify({ ...formData, [fullName]: value }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Endereço de Entrega"
        value={formData.enderecoDaEntrega}
        onChange={(e) => handleInputChange('enderecoDaEntrega', e.target.value)}
      />
      {/* ... outros campos ... */}
    </form>
  )
}

export default SearchItem







// leticiajosealbino@gmail.com
// Leticia29

// willjose121@gmail.com
// Will5543
// 74580-520

// felipemario@gmail.com
// agostinho@25


// anaclaudia@gmail.com
// AnaClaudia28

// biancamario29@gmail.com

// bianca25


// lisaniatharciso18@gmail.com
// 1983628lT


// marjory@gmai.com
// 1903647


// emerina@gmail.com
// ncvhsakid8



// andoni6743@uorak.com
// 1524380



// delicacy10@gmail.com
// delicaclly19


// quizitocritiano@10gmail.com
// Agostinho@10