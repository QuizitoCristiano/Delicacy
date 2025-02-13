import "./styles/styleFilds.css";

import React from "react";
import { TextField, Typography, Stack, Box, Button } from "@mui/material";

const InputFields = ({ controlSteFields, setControlSteFields }) => {
  const {
    cnpj,
    cnpjError,
    endereco,
    enderecoError,
    horaAbertura,
    horaAberturaError,
    fechamento,
    funcionamentoError,
  } = controlSteFields;

  const buttonStyles = {
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
    ":hover": {
      background: "var(--light-orange-color)",
      border: "none",
      outline: "none",
      color: "var(--bg-color)",
      transition: "all 0.45s ease",
    },
  };

  const validarFormularioClient = () => {
    let isValid = true;

    if (horaAbertura.trim() === "") {
      setControlSteFields((prevState) => ({
        ...prevState,
        horaAberturaError: "Campo de horário de abertura é obrigatório",
      }));
      isValid = false;
    } else {
      setControlSteFields((prevState) => ({
        ...prevState,
        horaAberturaError: "",
      }));
    }

    if (fechamento.trim() === "") {
      setControlSteFields((prevState) => ({
        ...prevState,
        funcionamentoError: "Campo de horário de fechamento é obrigatório",
      }));
      isValid = false;
    } else {
      setControlSteFields((prevState) => ({
        ...prevState,
        funcionamentoError: "",
      }));
    }

    if (cnpj.trim() === "") {
      setControlSteFields((prevState) => ({
        ...prevState,
        cnpjError: "Campo CNPJ da empresa é obrigatório",
      }));
      isValid = false;
    } else if (!validarCnpj(cnpj.trim())) {
      setControlSteFields((prevState) => ({
        ...prevState,
        cnpjError: "Informe um CNPJ válido",
      }));
      isValid = false;
    } else {
      setControlSteFields((prevState) => ({ ...prevState, cnpjError: "" }));
    }

    if (endereco.trim() === "") {
      setControlSteFields((prevState) => ({
        ...prevState,
        enderecoError: "Campo Localização  da empresa é obrigatório",
      }));
      isValid = false;
    } else {
      setControlSteFields((prevState) => ({ ...prevState, enderecoError: "" }));
    }

    return isValid;
  };

  const handleEnderecoChange = (e) => {
    const input = e.target.value;
    setControlSteFields((prevState) => ({ ...prevState, endereco: input }));
    if (input.trim() === "") {
      setControlSteFields((prevState) => ({
        ...prevState,
        enderecoError: "Campo de endereço é obrigatório",
      }));
    } else if (!/\d/.test(input) && !/^\d{5}-?\d{3}$/.test(input)) {
      setControlSteFields((prevState) => ({
        ...prevState,
        enderecoError:
          "Por favor, inclua o número do endereço ou um CEP válido.",
      }));
    } else {
      setControlSteFields((prevState) => ({ ...prevState, enderecoError: "" }));
    }
  };

  const handleFechamentoChange = (e) => {
    const input = e.target.value;
    if (/^[0-9:]*$/.test(input) || input === "") {
      setControlSteFields((prevState) => ({ ...prevState, fechamento: input }));
      if (input === horaAbertura) {
        setControlSteFields((prevState) => ({
          ...prevState,
          funcionamentoError:
            "A hora de fechamento deve ser diferente da hora de abertura",
        }));
        return;
      } else {
        setControlSteFields((prevState) => ({
          ...prevState,
          funcionamentoError: "",
        }));
      }
    } else {
      setControlSteFields((prevState) => ({
        ...prevState,
        funcionamentoError:
          "Por favor, informe uma horário de fechamento válido",
      }));
    }
  };

  const handleHoraAberturaChange = (e) => {
    const input = e.target.value;
    if (/^[0-9:]*$/.test(input) || input === "") {
      setControlSteFields((prevState) => ({
        ...prevState,
        horaAbertura: input,
        horaAberturaError: "",
      }));
    } else {
      setControlSteFields((prevState) => ({
        ...prevState,
        horaAberturaError: "Por favor, informe um horário válido",
      }));
    }
  };

  const validarCnpj = (cnpj) => {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    return cnpjRegex.test(cnpj);
  };

  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "659px",
          gap: "2.6rem",
          display: "flex",
          padding: "20px",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "1px 2px 11px 4px rgb(14 55 54 / 25%)",
          flexDirection: "column",
          "@media (max-width: 750px)": { width: "100%" },
        }}
      >
        <Stack
          sx={{
            paddingBottom: "1.8rem",
            color: "var(--green-color)",
            fontSize: "1.8rem",
            gap: "0.9rem",
            width: "100%",
          }}
        >
          <h4>Cadastro sua Empresa</h4>
        </Stack>

        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridGap: "10px",
            "@media (max-width: 550px)": {
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
                borderColor:
                  horaAberturaError || funcionamentoError ? "red" : null,
              }}
              type="text"
              label="Horário de Abertura"
              id="Abertura"
              placeholder="Horário de Abertura (HH:MM)"
              variant="outlined"
              size="small"
              value={horaAbertura}
              onChange={handleHoraAberturaChange}
              error={!!horaAberturaError}
            />
            <Typography
              sx={{ fontSize: "1.3rem", color: "red" }}
              className="error"
            >
              {horaAberturaError}
            </Typography>
          </Box>

          <Box>
            <TextField
              sx={{
                width: "100%",
                marginBottom: "1.5rem",
                display: "flex",
                textAlign: "center",
                fontSize: "2.6rem!important",
                borderColor: cnpjError ? "red" : null,
              }}
              type="text"
              label="CNPJ"
              id="celular"
              placeholder="Número de registro da empresa"
              variant="outlined"
              size="small"
              value={cnpj}
              onChange={(e) =>
                setControlSteFields((prevState) => ({
                  ...prevState,
                  cnpj: e.target.value,
                }))
              }
              error={!!cnpjError}
            />
            <Typography
              sx={{ fontSize: "1.3rem", color: "red" }}
              id="celularErro"
              className="error"
            >
              {cnpjError}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridGap: "10px",
            "@media (max-width: 550px)": {
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
                marginBottom: "1.5rem",
                display: "flex",
                textAlign: "center",
                fontSize: "1.6rem",
                borderColor: enderecoError ? "red" : null,
              }}
              type="text"
              label="Endereço da empresa"
              variant="outlined"
              size="small"
              value={endereco}
              onChange={handleEnderecoChange}
              error={!!enderecoError}
            />
            <Typography
              sx={{ fontSize: "1.3rem", color: "red" }}
              id="enderecoError"
              className="error"
            >
              {enderecoError}
            </Typography>
          </Box>

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
                borderColor:
                  horaAberturaError || funcionamentoError ? "red" : null,
              }}
              type="text"
              label="Horário de Fechamento"
              id="Fechamento"
              placeholder="Horário de Fechamento (HH:MM)"
              variant="outlined"
              size="small"
              value={fechamento}
              onChange={handleFechamentoChange}
              error={!!funcionamentoError}
            />
            <Typography
              sx={{ fontSize: "1.3rem", color: "red" }}
              className="error"
            >
              {funcionamentoError}
            </Typography>
          </Box>
        </Box>

        <Button sx={buttonStyles} onClick={validarFormularioClient}>
          Insira os Dados
        </Button>
      </Box>
    </Stack>
  );
};

export default InputFields;


