import React, { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MicIcon from '@mui/icons-material/Mic';
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

  const toggleChat = () => setIsChatOpen((prev) => !prev);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prev) => [...prev, { type: 'outgoing', text: message }]);
      setMessage('');
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
                  ) : (
                    <p>{msg.text}</p>
                  )}
                </li>
              ))}
            </ul>

            <div className="chat-input">
              <textarea
                placeholder="Enviar Mensagem..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <Button
                onClick={message.trim() ? handleSendMessage : null}
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
