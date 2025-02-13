import React, { useState } from "react";
import { TextField, Typography, Stack, Box, Button} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom' 

export const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validarFormularioClient = () => {
    let isValid = true;

    if (email.trim() === "") {
      setEmailError(" e-mail registrado durante o cadastro da empresa..");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };

  const isValidEmail = (email) => {
    return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(
      email
    );
  };

  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        // backgroundColor: "var(--bg-color)",
       
      }}
    >
      <Box
        sx={{
          width: "659px",
          gap: "2.6rem",
          borderRadius: "1rem",
          display: "flex",
          padding: "20px",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "1px 2px 11px 4px rgb(14 55 54 / 25%)",
          flexDirection: "column",
          
    
          "@media (max-width: 750px)": {
            width: "96%",
          },
        }}
      >
         

        <Stack
          sx={{
            paddingBottom: "1.8rem",
            color: "var(--green-color)",
            fontSize: "1.3rem",
            gap: "0.9rem",
            width: "100%",
            "@media (max-width: 550px)": {
               fontSize: "1rem",
              },
          }}
        >
          <h4>Insira o e-mail cadastrado para recuperar a senha</h4>
        </Stack>

        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gridGap: "10px",
            "@media (max-width: 550px)": {
              gap: "2.2rem",
              width: "100%",
              gridTemplateColumns: "1fr",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: "1.3rem",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <TextField
              sx={{
                width: "100%",
                fontSize: "1.3rem",
                borderColor: emailError ? "red" : null,
              }}
              type="text"
              label="E-mail da empresa"
              id="email"
              placeholder="Insira o e-mail da empresa"
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
            />
            <Typography
              sx={{ fontSize: "1.3rem", color: "red" }}
              className="error"
            >
              {emailError}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
       
          }}
        >
          <Button
            sx={{
              display: "inline-block",
              padding: "12px 28px",
              backgroundColor: "var(--green-color)",
              borderRadius: "5px",
              color: "var(--bg-color)",
              fontSize: "1rem",
              letterSpacing: "1px",
              fontWeight: 600,
              transition: "all 0.45s ease",
              border: "none",
              outline: "none",
              cursor: "pointer", // Adicionando estilo de cursor pointer
              ":hover": {
                background: "var(--light-orange-color)",
                border: "none",
                outline: "none",
                color: "var(--bg-color)",
                transition: "all 0.45s ease",
              },
            }}
            onClick={(e) => {
              if (validarFormularioClient()) {
                // Lógica de recuperação de senha aqui
              } else {
                // Tratar erros aqui
              }
            }}
          >
            Recuperar Senha
          </Button>

          

          <Link to={"/"}>
        
            <Typography
              sx={{ fontSize: "1.3rem", color: "var(--orange-color)", marginLeft: "1rem" }}
            >
              Canselar
            </Typography>
       
          </Link>

        </Box>
      </Box>
    </Stack>
  );
};

