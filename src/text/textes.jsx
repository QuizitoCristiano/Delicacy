import React, { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MicIcon from '@mui/icons-material/Mic';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import './chatStyles.css';

export const ChatWhatsApp = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { type: 'incoming', text: 'Olá, como posso ajudá-lo hoje?' },
  ]);
  const [isMicActive, setIsMicActive] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  
  // Novo estado para armazenar a imagem ou vídeo
  const [mediaFile, setMediaFile] = useState(null);

  const toggleChat = () => setIsChatOpen((prev) => !prev);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prev) => [...prev, { type: 'outgoing', text: message }]);
      setMessage('');
    }
    // Enviar a imagem ou vídeo se houver
    if (mediaFile) {
      const mediaUrl = URL.createObjectURL(mediaFile);
      setMessages((prev) => [...prev, { type: 'outgoing', text: 'Arquivo enviado', media: mediaUrl }]);
      setMediaFile(null); // Limpar após enviar
    }
  };

  const handleMicPress = async () => {
    setIsMicActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newRecorder = new MediaRecorder(stream);
      newRecorder.ondataavailable = (event) => setAudioBlob(event.data);
      newRecorder.start();
      setRecorder(newRecorder);
    } catch (error) {
      console.error('Erro ao acessar o microfone:', error);
      setIsMicActive(false);
    }
  };

  const handleMicRelease = () => {
    if (recorder) {
      recorder.stop();
      recorder.stream.getTracks().forEach((track) => track.stop());
      setRecorder(null);
      setIsMicActive(false);

      if (audioBlob) {
        const audioUrl = URL.createObjectURL(audioBlob);
        setMessages((prev) => [
          ...prev,
          { type: 'outgoing', text: 'Áudio enviado', audio: audioUrl },
        ]);
      }
    }
  };

  // Função para abrir a câmera ou selecionar um arquivo
  const handleMediaClick = () => {
    const options = {
      title: 'Selecione ou tire uma foto',
      options: [
        { text: 'Abrir câmera', onClick: openCamera },
        { text: 'Selecionar da galeria', onClick: () => openFileSelector() },
      ],
    };

    // Aqui você deve implementar um modal ou outro método para escolher as opções
    // Por exemplo, usando um alert simples ou um modal personalizado
    if (window.confirm(options.title + '\n1. ' + options.options[0].text + '\n2. ' + options.options[1].text)) {
      options.options[0].onClick();
    } else {
      options.options[1].onClick();
    }
  };

  const openCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    // Aqui você deve implementar a lógica para capturar a imagem da câmera
    // Isso pode incluir mostrar a câmera em um elemento <video> e capturar uma imagem
    // Não implementaremos isso aqui, pois é um pouco mais complexo e depende de UI
    console.log("Câmera aberta");
  };

  const openFileSelector = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*,video/*';
    fileInput.onchange = (e) => {
      if (e.target.files.length) {
        setMediaFile(e.target.files[0]);
      }
    };
    fileInput.click();
  };

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
              sx={{
                fontSize: '40px',
                color: '#fff',
                cursor: 'pointer',
              }}
            />
          ) : (
            <WhatsAppIcon
              sx={{
                fontSize: '50px',
                color: '#fff',
                cursor: 'pointer',
              }}
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
                  ) : msg.media ? (
                    <img src={msg.media} alt="Arquivo enviado" style={{ maxWidth: '100px' }} />
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
                  '&:hover': {
                    boxShadow: '0 0 10px #3cb815',
                  },
                  '&:active': {
                    boxShadow: '0 0 15px #3cb815',
                  },
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
    </Stack>
  );
};
