import React, { useState } from 'react'
import { Box, Button, Stack, Modal, Typography } from '@mui/material'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import MicIcon from '@mui/icons-material/Mic'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'

import './chatStyles.css'

export const ChatWhatsApp = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { type: 'incoming', text: 'Olá, como posso ajudá-lo hoje?' },
  ])
  const [isMicActive, setIsMicActive] = useState(false)
  const [recorder, setRecorder] = useState(null)
  const [audioBlob, setAudioBlob] = useState(null)
  const [mediaFile, setMediaFile] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleChat = () => setIsChatOpen((prev) => !prev)

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prev) => [...prev, { type: 'outgoing', text: message }])
      setMessage('')
    }
    if (mediaFile) {
      const mediaUrl = URL.createObjectURL(mediaFile)
      const mediaType = mediaFile.type.startsWith('image/')
        ? 'image'
        : mediaFile.type.startsWith('video/')
        ? 'video'
        : 'file'
      setMessages((prev) => [
        ...prev,
        {
          type: 'outgoing',
          text: 'Arquivo enviado',
          media: mediaUrl,
          mediaType,
        },
      ])
      setMediaFile(null)
    }
  }

  const handleMicPress = async () => {
    setIsMicActive(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const newRecorder = new MediaRecorder(stream)
      newRecorder.ondataavailable = (event) => setAudioBlob(event.data)
      newRecorder.start()
      setRecorder(newRecorder)
    } catch (error) {
      console.error('Erro ao acessar o microfone:', error)
      setIsMicActive(false)
    }
  }

  const handleMicRelease = () => {
    if (recorder) {
      recorder.stop()
      recorder.stream.getTracks().forEach((track) => track.stop())
      setRecorder(null)
      setIsMicActive(false)
      if (audioBlob) {
        const audioUrl = URL.createObjectURL(audioBlob)
        setMessages((prev) => [
          ...prev,
          { type: 'outgoing', text: 'Áudio enviado', audio: audioUrl },
        ])
      }
    }
  }

  const handleMediaClick = () => {
    const options = {
      title: 'Selecione ou tire uma foto',
      options: [
        { text: 'Abrir câmera', onClick: openCamera },
        { text: 'Selecionar da galeria', onClick: () => openFileSelector() },
      ],
    }

    if (
      window.confirm(
        options.title +
          '\n1. ' +
          options.options[0].text +
          '\n2. ' +
          options.options[1].text
      )
    ) {
      options.options[0].onClick()
    } else {
      options.options[1].onClick()
    }
  }

  const openCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    // Aqui você deve implementar a lógica para capturar a imagem da câmera
    console.log('Câmera aberta')
  }

  const openFileSelector = () => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = 'image/*,video/*'
    fileInput.onchange = (e) => {
      if (e.target.files.length) {
        setMediaFile(e.target.files[0])
        setIsModalOpen(true) // Abre o modal ao selecionar o arquivo
      }
    }
    fileInput.click()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setMediaFile(null) // Limpa o arquivo ao cancelar
  }

  const handleConfirmSend = () => {
    const mediaUrl = URL.createObjectURL(mediaFile)
    const mediaType = mediaFile.type.startsWith('image/')
      ? 'image'
      : mediaFile.type.startsWith('video/')
      ? 'video'
      : 'file'
    setMessages((prev) => [
      ...prev,
      { type: 'outgoing', text: 'Arquivo enviado', media: mediaUrl, mediaType },
    ])
    setMediaFile(null)
    setIsModalOpen(false) // Fecha o modal
  }

  return (
    <Stack
      sx={{
        display: 'flex',
        maxWidth: '1290px',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#e3f2fd',
        gap: '2rem',
        padding: '20px 20px',
      }}
    >
      <Stack className="show-chatbot">
        <button className="chatbot-toggler" onClick={toggleChat}>
          {isChatOpen ? (
            <CloseIcon
              sx={{ fontSize: '40px', color: '#fff', cursor: 'pointer' }}
            />
          ) : (
            <WhatsAppIcon
              sx={{ fontSize: '50px', color: '#fff', cursor: 'pointer' }}
            />
          )}
        </button>

        {isChatOpen && (
          <Box className="chatbot">
            <Box
              sx={{
                background: '#3cb815',
                padding: '16px 0',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <h2 style={{ color: '#fff', fontSize: '1.4rem' }}>
                Fale com agente
              </h2>
            </Box>

            <ul className="chatbox">
              {messages.map((msg, index) => (
                <li
                  key={index}
                  className={`chat ${msg.type}`}
                  style={{
                    display: 'flex',
                    justifyContent:
                      msg.type === 'incoming' ? 'flex-start' : 'flex-end',
                  }}
                >
                  {msg.type === 'incoming' && <WhatshotIcon />}
                  {msg.audio ? (
                    <audio controls src={msg.audio}></audio>
                  ) : msg.mediaType === 'image' ? (
                    <img
                      src={msg.media}
                      alt="Arquivo enviado"
                      style={{ maxWidth: '200px', margin: '5px' }}
                    />
                  ) : msg.mediaType === 'video' ? (
                    <video
                      controls
                      src={msg.media}
                      style={{ maxWidth: '200px', margin: '5px' }}
                    />
                  ) : (
                    <p>{msg.text}</p>
                  )}
                </li>
              ))}
            </ul>

            <div className="chat-input">
              <AddAPhotoIcon
                onClick={handleMediaClick}
                sx={{
                  color: '#3cb815',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  boxShadow: '0 0 5px #3cb815',
                  transition: 'box-shadow 0.3s ease',
                  '&:hover': { boxShadow: '0 0 10px #3cb815' },
                  '&:active': { boxShadow: '0 0 15px #3cb815' },
                }}
              />
              <textarea
                placeholder="Enviar Mensagem..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <Button
                onClick={handleSendMessage}
                onMouseDown={handleMicPress}
                onMouseUp={handleMicRelease}
              >
                {message.trim() ? (
                  <SendIcon
                    sx={{
                      color: '#3cb815',
                      fontSize: '2.35rem',
                      cursor: 'pointer',
                    }}
                  />
                ) : (
                  <MicIcon
                    sx={{
                      color: isMicActive ? '#3cb815' : '#ccc',
                      fontSize: '2.35rem',
                      cursor: 'pointer',
                    }}
                  />
                )}
              </Button>
            </div>
          </Box>
        )}
      </Stack>

      {/* Modal para confirmar o envio da imagem ou vídeo */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
            maxWidth: 450,
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute', // Usar 'absolute' para centralizar o modal
            top: '50%', // Posiciona o topo do modal no meio da tela
            left: '50%', // Posiciona a esquerda do modal no meio da tela
            transform: 'translate(-50%, -50%)', // Move o modal para o centro
            textAlign: 'center',
          }}
        >
          <img
            src={mediaFile ? URL.createObjectURL(mediaFile) : ''}
            alt="Preview"
            style={{ maxWidth: '100%', margin: '10px 0' }}
          />

          <h5
            style={{
              fontWeight: 800,
              fontSize: '18px',
              marginBottom: '20px',
              color: 'rgb(51, 191, 48)',
            }}
          >
            Confirmar envio de mídia
          </h5>
          <Box
            sx={{
              marginTop: '10px',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button
              onClick={handleCloseModal}
              sx={{
                height: '50px',
                width: '40%',
                borderRadius: '15px 0px 15px 0px',
                bgcolor: 'rgb(51, 191, 48)',
                color: '#fff',
                boxShadow: '20px 20px 50px rgba(0, 0, 0, 0.4)',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: 'bold',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: '0 0 15px 5px #3cb815',
                  background: '#3cb815',
                  transform: 'scale(1.05)',
                },
              }}
            >
              Cancelar
            </Button>

            <Button
              onClick={handleConfirmSend}
              sx={{
                height: '50px',
                width: '40%',
                fontSize: '15px',
                fontWeight: 'bold',
                borderRadius: '15px 0px 15px 0px',
                bgcolor: 'rgb(51, 191, 48)',
                color: '#fff',
                boxShadow: '20px 20px 50px rgba(0, 0, 0, 0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: '0 0 15px 5px #f75f1d',
                  background: '#3cb815',
                  transform: 'scale(1.05)',
                  color: '#f75f1d',
                },
              }}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Stack>
  )
}
