import React, { useState } from "react";
import { TextField, Typography, Stack, Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { StyleEmptyLoader } from "./emptyLoader";
import { useAuth } from "../authcontext/index";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

export const Login = () => {
  const { handleSignIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErros] = useState({});
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErros({ email: "", password: "" }); // Reseta os erros antes de validar
  
    let errors = {};
  
    if (!email.trim()) {
      errors.email = "O campo de e-mail é obrigatório.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Por favor, insira um e-mail válido.";
    }
  
    if (!password.trim()) {
      errors.password = "O campo de senha é obrigatório.";
    } else if (password.length < 6) {
      errors.password = "A senha deve ter pelo menos 6 caracteres.";
    }
  
    setErros(errors);
  
    if (Object.keys(errors).length > 0) {
      setLoading(false); // Impede o envio se houver erros
      return;
    }
  
    try {
      const success = await handleSignIn(email, password);
      if (success) {
        navigate("/HomeCompany");
      } else {
        setErros({ email: "E-mail ou senha incorretos." });
      }
    } catch (error) {
      setErros({
        email: "Erro ao tentar logar. Tente novamente.",
        password: "Senha incorreta. Tente novamente.",
      });
      console.error("Erro no login:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      {loading && (
        <StyleEmptyLoader.containerCardLoader>
          <StyleEmptyLoader.loader
            sx={{ animation: "rotation 1s linear infinite" }}
          >
            <StyleEmptyLoader.loaderAfter />
          </StyleEmptyLoader.loader>
          <div>Logando...</div>
        </StyleEmptyLoader.containerCardLoader>
      )}

      <Box
        sx={{
          width: "659px",
          gap: "2.6rem",
          display: "flex",
          padding: "20px",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "1rem",
          boxShadow: "1px 2px 11px 4px rgb(14 55 54 / 25%)",
          flexDirection: "column",
          backgroundColor: "white",
          "@media (max-width: 750px)": {
            width: "96%",
          },
        }}
        component="form"
        onSubmit={handleSubmit}
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
          <h4>Para garantir a sua segurança, faça login</h4>
        </Stack>

        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
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
              sx={{ width: "100%" }}
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
            <Typography sx={{ fontSize: "1.3rem", color: "red" }}>
              {emailError}
            </Typography>
          </Box>

          <Box>
            <TextField
              sx={{ width: "100%", marginBottom: "1.5rem" }}
              type={showPassword ? "text" : "password"}
              label="Senha"
              id="password"
              variant="outlined"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography sx={{ fontSize: "1.3rem", color: "red" }}>
              {passwordError}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              padding: "12px 28px",
              backgroundColor: "var(--green-color)",
              borderRadius: "5px",
              color: "var(--bg-color)",
              fontSize: "1rem",
              fontWeight: 600,
              ":hover": { background: "var(--light-orange-color)" },
            }}
            type="submit"
            disabled={loading}
          >
            Entrar
          </Button>

          <Link to="/PasswordRecovery">
            <Typography>Esqueceu a senha?</Typography>
          </Link>

          <Link
            style={{ color: "#f75f1d", textDecoration: "none" }}
            to="/MeuCadastro"
          >
            <Typography
              style={{
                color: "#f75f1d",
                fontWeight: "600",
                fontSize: "1.3rem",
              }}
            >
              Cadastrar-se
            </Typography>
          </Link>
        </Box>
      </Box>
    </>
  );
};
