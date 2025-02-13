import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

const PreparoComponent = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [minutes, setMinutes] = useState("");

  const handleAdiantarPreparo = () => {
    setModalMessage(
      "Agradecemos pela sua paciência. O seu pedido está sendo preparado."
    );
    setOpenModal(true);
  };

  const handlePosAtendimento = (minutesInput) => {
    setModalMessage(
      `Por favor, aguarde um momento. Estamos preparando o seu pedido. Você receberá uma atualização em aproximadamente ${minutesInput} minutos.`
    );
    setOpenModal(true);
  };

  const handleCancelarPreparo = () => {
    setModalMessage(
      "Seu pedido foi cancelado. Se desejar, você pode refazer o pedido a qualquer momento."
    );
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handlePosAtendimentoClick = () => {
    const minutesInput = prompt("Digite o número de minutos de espera:");
    if (minutesInput) {
      setMinutes(minutesInput);
      handlePosAtendimento(minutesInput); // Passa o valor imediatamente para a mensagem
    }
  };

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.8rem",
          margin: "0.5rem",
        }}
      >
        <Button
          onClick={handleAdiantarPreparo}
          sx={{
            padding: "10px 20px",
            borderRadius: "15px 0px 15px 0px",
            bgcolor: "rgb(51, 191, 48)",
            color: "#fff",
            boxShadow: "20px 20px 50px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "bold",
            transition: "all 0.3s ease-in-out",

            "&:hover": {
              boxShadow: "0 0 15px 5px #3cb815",
              background: "#3cb815",
              transform: "scale(1.05)",
            },
          }}
        >
          Adiantar o Preparo
        </Button>
        <Button
          onClick={handlePosAtendimentoClick} // Usa a nova função para lidar com o clique
          sx={{
            padding: "10px 20px",
            fontSize: "15px",
            fontWeight: "bold",
            borderRadius: "15px 0px 15px 0px",
            bgcolor: "rgb(51, 191, 48)",
            color: "#fff",
            boxShadow: "10px 10px 50px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",

            "&:hover": {
              boxShadow: "0 0 15px 5px rgba(0, 0, 0, 0.5)",
              background: "#3cb815",
              transform: "scale(1.05)",
              color: "#FFF",
            },
          }}
        >
          Pos-Atendimento
        </Button>
        <Button
          onClick={handleCancelarPreparo}
          sx={{
            padding: "10px 20px",
            borderRadius: "15px 0px 15px 0px",
            bgcolor: "rgb(51, 191, 48)",
            color: "#fff",
            boxShadow: "20px 20px 50px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "bold",
            transition: "all 0.3s ease-in-out",

            "&:hover": {
              boxShadow: "0 0 15px 5px #f75f1d",
              background: "#3cb815",
              transform: "scale(1.05)",
              color: "#f75f1d",
            },
          }}
        >
          Cancelar o Preparo
        </Button>
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: "10px",
            padding: "20px",
            maxWidth: "400px",
            margin: "auto",
            marginTop: "100px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6">{modalMessage}</Typography>
          <Button onClick={handleCloseModal} sx={{ marginTop: "20px" }}>
            Fechar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default PreparoComponent;
