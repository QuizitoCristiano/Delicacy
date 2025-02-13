import React, { useState } from "react";
import "./styles/indexStyle.css";
import { Button, Box, Stack, Typography, TextField } from "@mui/material";

const MyNewStep = (props) => {
  const [modalAberto, setModalAberto] = useState(false);
  const [descricaoModalAberto, setDescricaoModalAberto] = useState(false);

  const { controlMyNewStep, setControlMyNewStep } = props;

  const {
    fotoLogotipo,
    fotoLogotipoError,
    formasDePagamento,
    formasDePagamentoError,
    descricaoEmpresa,
    descricaoEmpresaError,
    logisticaDeVendas,
    logisticaDeVendasError,
    
  } = controlMyNewStep;

  const handleOpenModal = (e) => {
    e.preventDefault();
    setModalAberto(true);
  };

  const handleCloseModal = () => {
    setModalAberto(false);
  };

  const handleFormaPagamentoChange = (e) => {
    setFormasDePagamento(e.target.value);
    setModalAberto(false);
  };

  const handleOpenDescricaoModal = (e) => {
    e.preventDefault();
    setDescricaoModalAberto(true);
  };

  const handleCloseDescricaoModal = () => {
    setDescricaoModalAberto(false);
  };

  const handleDescricaoChange = (e) => {
    setDescricaoEmpresa(e.target.value);
  };

  const handleDescricaoSubmit = () => {
    if (descricaoEmpresa.length < 20) {
      setControlMyNewStep((prevState) => ({
        ...prevState,
        descricaoEmpresaError: "A descrição deve ter no mínimo 20 caracteres",
      }));
    } else {
      setControlMyNewStep((prevState) => ({
        ...prevState,
        descricaoEmpresaError: "",
      }));
      handleCloseDescricaoModal();
    }
  };

  const validarFormulario = () => {
    let isValid = true;

    if (logisticaDeVendas.trim() === "") {
      setControlMyNewStep((prevState) => ({
        ...prevState,
        logisticaDeVendasError: "Campo de logística de vendas é obrigatório",
      }));
      isValid = false;
    } else {
      setControlMyNewStep((prevState) => ({
        ...prevState,
        logisticaDeVendasError: "",
      }));
    }

    if (descricaoEmpresa.trim() === "") {
      setControlMyNewStep((prevState) => ({
        ...prevState,
        descricaoEmpresaError: "Campo Descrição da Empresa é obrigatório",
      }));
      isValid = false;
    } else {
      setControlMyNewStep((prevState) => ({
        ...prevState,
        descricaoEmpresaError: "",
      }));
    }

    if (formasDePagamento.trim() === "") {
      setControlMyNewStep((prevState) => ({
        ...prevState,
        formasDePagamentoError: "Campo Formas de Pagamento é obrigatório",
      }));
      isValid = false;
    } else {
      setControlMyNewStep((prevState) => ({
        ...prevState,
        formasDePagamentoError: "",
      }));
    }

    if (fotoLogotipo.trim() === "") {
      setControlMyNewStep((prevState) => ({
        ...prevState,
        fotoLogotipoError: "Campo Foto/Logotipo da Empresa é obrigatório",
      }));
    } else {
      setControlMyNewStep((prevState) => ({
        ...prevState,
        fotoLogotipoError: "",
      }));
    }

    return isValid;
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
          "@media (max-width: 750px)": {
            width: "100%",
          },
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
          <h4>Cadastre sua Empresa</h4>
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
          <Box>
            <TextField
              sx={{
                width: "100%",
                fontSize: "1.3rem",
                borderColor: fotoLogotipoError ? "red" : null,
              }}
              type="file"
              variant="outlined"
              size="small"
              onChange={(e) => {
                const file = e.target.files[0];
                setFotoLogotipo(file);
              }}
              error={!!fotoLogotipoError}
              inputProps={{
                accept: "image/*",
              }}
            />
            <Typography
              sx={{ fontSize: "0.2rem", color: "red" }}
              className="error"
            >
              {fotoLogotipoError}
            </Typography>
          </Box>

          <Box>
            <TextField
              sx={{
                width: "100%",
                marginBottom: "1.5rem",
                display: "flex",
                textAlign: "center",
                fontSize: "1.6rem",
                borderColor: logisticaDeVendasError ? "red" : null,
              }}
              type="text"
              label="Logística de Vendas"
              variant="outlined"
              size="small"
              value={logisticaDeVendas}
              onChange={(e) => setLogisticaDeVendas(e.target.value)}
              error={!!logisticaDeVendasError}
            />

            <Typography
              sx={{ fontSize: "1.3rem", color: "red" }}
              id="celularErro"
              className="error"
            >
              {logisticaDeVendasError}
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
          <Box>
            <TextField
              sx={{
                width: "100%",
                fontSize: "1.3rem",
                borderColor: formasDePagamentoError ? "red" : null,
              }}
              type="text"
              label="Formas de Pagamento Aceitas"
              variant="outlined"
              size="small"
              value={formasDePagamento}
              onFocus={handleOpenModal}
              onChange={(e) => setFormasDePagamento(e.target.value)}
              error={!!formasDePagamentoError}
            />
            <Typography
              sx={{ fontSize: "1.3rem", color: "red" }}
              id="enderecoError"
              className="error"
            >
              {formasDePagamentoError}
            </Typography>
          </Box>

          {modalAberto && (
            <Box>
              <select id="formaPagamento" onChange={handleFormaPagamentoChange}>
                <option value="">Forma de Pagamento</option>
                <option value="pix">Pix</option>
                <option value="Cartão de Crédito">Cartão de crédito</option>
                <option value="Cartão de Débito">Cartão de Débito</option>
                <option value="Pagamento Na Entrega">
                  Pagamento na Entrega
                </option>
              </select>
              <Typography id="formaPagamentoError" className="error">
                {formasDePagamentoError}
              </Typography>
            </Box>
          )}

          <Box>
            <TextField
              sx={{
                width: "100%",
                marginBottom: "1.5rem",
                display: "flex",
                textAlign: "center",
                fontSize: "1.6rem",
                borderColor: descricaoEmpresaError ? "red" : null,
              }}
              type="text"
              label="Descrição da Empresa"
              variant="outlined"
              size="small"
              value={descricaoEmpresa}
              onClick={handleOpenDescricaoModal}
              error={!!descricaoEmpresaError}
            />
            <Typography
              sx={{ fontSize: "1.3rem", color: "red" }}
              id="enderecoError"
              className="error"
            >
              {descricaoEmpresaError}
            </Typography>
          </Box>
        </Box>

        {descricaoModalAberto && (
          <Box>
            <textarea
              className="myTexteArea"
              value={descricaoEmpresa}
              onChange={handleDescricaoChange}
              rows={5}
              cols={30}
              placeholder="Digite uma descrição (mínimo 20 caracteres)"
              sx={{
                marginBottom: "10px",
                resize: "none",
                height: "240px",
              }}
            />
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                justifyContent: "space-between",
                alignItems: "center",
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
                  ":hover": {
                    background: "var(--light-orange-color)",
                    border: "none",
                    outline: "none",
                    color: "var(--bg-color)",
                    transition: "all 0.45s ease",
                  },
                }}
                onClick={handleDescricaoSubmit}
              >
                Salvar
              </Button>
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
                  ":hover": {
                    background: "var(--light-orange-color)",
                    border: "none",
                    outline: "none",
                    color: "var(--bg-color)",
                    transition: "all 0.45s ease",
                  },
                }}
                onClick={handleCloseDescricaoModal}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        )}

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
            ":hover": {
              background: "var(--light-orange-color)",
              border: "none",
              outline: "none",
              color: "var(--bg-color)",
              transition: "all 0.45s ease",
            },
          }}
          onClick={() => {
            if (validarFormulario()) {
              // Se o formulário for válido, faça algo aqui
            } else {
              // Se houver erros, você pode lidar com isso aqui
            }
          }}
        >
          Insira os Dados
        </Button>
      </Box>
    </Stack>
  );
};

export default MyNewStep;
