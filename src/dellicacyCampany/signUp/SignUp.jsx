import React, { useState, useContext } from "react";

import InputMask from "react-input-mask";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import {
  addDoc,
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  doc,
  setDoc
} from "firebase/firestore";

import {
  Button,
  Box,
  Stack,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  styled,
} from "@mui/material";
import { AuthContext } from "../authcontext";

import { Link } from "react-router-dom";
import { StyleClientNweLib } from "../lib/newStylesLib";

// Estilização para a tela de carregamento
const ContainerCardLaoder = styled(Stack)(({ theme }) => ({
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "10px",
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  height: "100vh",
  width: "100%",
  zIndex: 9000,
  top: 0,
  left: 0,
}));

const Loader = styled(Box)(({ theme }) => ({
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  display: "inline-block",
  borderTop: "4px solid #3cb815",
  borderRight: "4px solid transparent",
  boxSizing: "border-box",
  animation: "rotation 1s linear infinite",
  position: "relative",
}));

const LoaderAfter = styled(Box)(({ theme }) => ({
  content: "''",
  boxSizing: "border-box",
  position: "absolute",
  left: 0,
  top: 0,
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  borderBottom: "4px solid #f75f1d",
  borderLeft: "4px solid transparent",
}));

const globalStyles = `
    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

export const MeuCadastro = () => {
  const {
    descricaoModalAberto,
    setDescricaoModalAberto,
    horaAbertura,
    setHoraAbertura,
    horaFechamento,
    setHoraFechamento,
    email,
    setEmail,
    password,
    setPassword,
    telefone,
    setTelefone,
    cnpj,
    setCnpj,
    descricaoEmpresa,
    setDescricaoEmpresa,
    formasDePagamento,
    setFormasDePagamento,
    nomedaEmpresa,
    setNomedaEmp,
    fotoLogotipo,
    setFotoLogotipo,
    cep,
    setCep,
    bairro,
    setBairro,
    cidade,
    setCidade,
    estado,
    setEstado,
    rua,
    setRua,
    numeroDoEdificios,
    setNumeroDoEdificios,
    showPassword,
    setShowPassword,
    erros,
    setErros,
  } = useContext(AuthContext);

  const [cepDigitadoCorretamente, setCepDigitadoCorretamente] = useState(false);
  const [myNewloading, setMyNewloading] = useState(false);
  const [formData, setFormData] = useState({});

  const isHoraValida = (horaAbertura, horaFechamento) => {
    const [horaA, minutoA] = horaAbertura.split(":").map(Number);
    const [horaF, minutoF] = horaFechamento.split(":").map(Number);

    // Converte as horas e minutos para minutos totais
    const aberturaEmMinutos = horaA * 60 + minutoA;
    const fechamentoEmMinutos = horaF * 60 + minutoF;

    const diferencaEmMinutos = fechamentoEmMinutos - aberturaEmMinutos;

    // Verifica se a diferença é de no mínimo 4 horas (240 minutos) e no máximo 8 horas e 30 minutos (510 minutos)
    if (diferencaEmMinutos >= 240 && diferencaEmMinutos <= 510) {
      return true;
    }
    return false;
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeCep = (e) => {
    setCep(e.target.value);
  };

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    const cepValido = cep.length === 8; // Verifica se o CEP tem 8 dígitos
  
    if (cepValido) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("CEP não encontrado");
          }
          return res.json();
        })
        .then((data) => {
          if (data.erro) {
            throw new Error("CEP não encontrado");
          }
  
          // Preenche os campos automaticamente
          setRua(data.logradouro || "");
          setBairro(data.bairro || "");
          setCidade(data.localidade || "");
          setEstado(data.uf || "");
  
          setCepDigitadoCorretamente(true);
          setErros((prevErros) => ({ ...prevErros, cep: "" }));
        })
        .catch((error) => {
          console.error(error.message);
          setErros((prevErros) => ({
            ...prevErros,
            cep: "CEP não encontrado",
          }));
          setCepDigitadoCorretamente(false);
        });
    } else {
      setCepDigitadoCorretamente(false);
    }
  };
  

  // Manipuladores para edição manual
  const handleChangeCidade = (e) => {
    setCidade(e.target.value);
  };

  const handleChangeRua = (e) => {
    setRua(e.target.value);
  };
  
  const handleChangeBairro = (e) => {
    setBairro(e.target.value);
  };
  
  const handleChangeEstado = (e) => {
    setEstado(e.target.value);
  };
  


  const validaFormSinginUp = () => {
    let isValid = true;
    let novosErros = {};

    if (cep.trim() === "") {
      novosErros.cep = "Por favor, informe o CEP.";
      isValid = false;
    }

    if (rua.trim() === "") {
      novosErros.rua = "Por favor, informe o nome da rua.";
      isValid = false;
    }

    if (bairro.trim() === "") {
      novosErros.bairro = "Por favor, informe o nome do bairro.";
      isValid = false;
    }

    if (cidade.trim() === "") {
      novosErros.cidade = "Por favor, informe o nome da cidade.";
      isValid = false;
    }

    if (estado.trim() === "") {
      novosErros.estado = "Por favor, informe o nome do estado.";
      isValid = false;
    }

    if (numeroDoEdificios.trim() === "") {
      novosErros.numeroDoEdificios =
        "Por favor, informe o nome do número do edifício.";
      isValid = false;
    }

    if (nomedaEmpresa.trim() === "") {
      novosErros.nomedaEmpresa = "Por favor, informe o nome da empresa.";
      isValid = false;
    } else if (!validaNomedaEmpresa(nomedaEmpresa)) {
      novosErros.nomedaEmpresa = "Por favor, informe um nome válido.";
      isValid = false;
    }

    if (horaAbertura.trim() === "") {
      novosErros.horaAbertura = "Por favor, informe o horário de abertura.";
      isValid = false;
    }

    if (horaFechamento.trim() === "") {
      novosErros.horaFechamento = "Por favor, informe o horário de fechamento.";
      isValid = false;
    }

    if (cnpj.trim() === "") {
      novosErros.cnpj = "Por favor, informe o CNPJ.";
      isValid = false;
    } else if (!validarCNPJ(cnpj)) {
      novosErros.cnpj = "Por favor, informe um CNPJ válido.";
      isValid = false;
    }

    if (email.trim() === "") {
      novosErros.email = "Por favor, informe o email.";
      isValid = false;
    } else if (!validarEmail(email)) {
      novosErros.email = "Por favor, informe um email válido.";
      isValid = false;
    }

    if (password.trim() === "") {
      novosErros.password = "Por favor, informe a senha.";
      isValid = false;
    } else if (!validarSenha(password)) {
      novosErros.password =
        "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.";
      isValid = false;
    }

    if (telefone.trim() === "") {
      novosErros.telefone = "Por favor, informe o telefone.";
      isValid = false;
    } else if (!validarTelefone(telefone)) {
      novosErros.telefone = "Por favor, informe um telefone válido.";
      isValid = false;
    }

    if (formasDePagamento.length === 0) {
      novosErros.formasDePagamento =
        "Por favor, selecione ao menos uma forma de pagamento.";
      isValid = false;
    }

    if (descricaoEmpresa.length < 20) {
      novosErros.descricaoEmpresa =
        "Por favor, o minimo da descrição deve ser 20 caracters.";
      isValid = false;
    }

    if (!fotoLogotipo) {
      novosErros.fotoLogotipo =
        "Por favor, adicione uma imagem ou um logotipo.";
      isValid = false;
    }

    setErros(novosErros);
    return isValid;
  };

  const validaNomedaEmpresa = (nomedaEmpresa) => {
    const padrao = /^[a-zA-Z\s]+$/;
    return padrao.test(nomedaEmpresa);
  };

  const handleChangeNome = (e) => {
    const input = e.target.value;
    setNomedaEmp(input);
    if (input.trim() === "") {
      setErros((prevErros) => ({
        ...prevErros,
        nomedaEmpresa: "Por favor, informe o nome da empresa.",
      }));
    } else if (!validaNomedaEmpresa(input)) {
      setErros((prevErros) => ({
        ...prevErros,
        nomedaEmpresa: "Por favor, informe um nome válido.",
      }));
    } else {
      setErros((prevErros) => ({ ...prevErros, nomedaEmpresa: "" }));
    }
  };

  const validarEmail = (email) => {
    var emailPattern =
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPattern.test(email);
  };

  const handleChangeEmail = (e) => {
    const input = e.target.value;
    setEmail(input);
    if (input.trim() === "") {
      setErros((prevErros) => ({
        ...prevErros,
        email: "Por favor, informe o email.",
      }));
    } else if (!validarEmail(input)) {
      setErros((prevErros) => ({
        ...prevErros,
        email: "Por favor, informe um email válido.",
      }));
    } else {
      setErros((prevErros) => ({ ...prevErros, email: "" }));
    }
  };

  const validarSenha = (senha) => {
    const padrao =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return padrao.test(senha);
  };

  const handleChangePassword = (e) => {
    const input = e.target.value;
    setPassword(input);
    if (input.trim() === "") {
      setErros((prevErros) => ({
        ...prevErros,
        password: "Por favor, informe a senha.",
      }));
    } else if (!validarSenha(input)) {
      setErros((prevErros) => ({
        ...prevErros,
        password:
          "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial @.",
      }));
    } else {
      setErros((prevErros) => ({ ...prevErros, password: "" }));
    }
  };

  const validarTelefone = (telefone) => {
    const padrao = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return padrao.test(telefone);
  };

  const handleChangePhone = (e) => {
    const input = e.target.value;
    setTelefone(input);
    if (input.trim() === "") {
      setErros((prevErros) => ({
        ...prevErros,
        telefone: "Por favor, informe o telefone.",
      }));
    } else if (!validarTelefone(input)) {
      setErros((prevErros) => ({
        ...prevErros,
        telefone: "Por favor, informe um telefone válido.",
      }));
    } else {
      setErros((prevErros) => ({ ...prevErros, telefone: "" }));
    }
  };

  const handleHoraAberturaChange = (e) => {
    const value = e.target.value;
    setHoraAbertura(value);

    if (/^([01]\d|2[0-3]):([0-5]\d)$/.test(value) || value === "") {
      if (horaFechamento && isHoraValida(value, horaFechamento)) {
        setErros((prevErros) => ({
          ...prevErros,
          horaAbertura: "",
          horaFechamento: "",
        }));
      } else {
        setErros((prevErros) => ({
          ...prevErros,
          horaFechamento:
            "A diferença de horas deve ser entre 4 e 8 horas e 30 minutos (HH:MM)",
        }));
      }
    } else {
      setErros((prevErros) => ({
        ...prevErros,
        horaAbertura: "Por favor, informe um horário válido (HH:MM)",
      }));
    }
  };

  const handleHoraFechamentoChange = (e) => {
    const value = e.target.value;
    setHoraFechamento(value);

    if (/^([01]\d|2[0-3]):([0-5]\d)$/.test(value) || value === "") {
      if (horaAbertura && isHoraValida(horaAbertura, value)) {
        setErros((prevErros) => ({
          ...prevErros,
          horaAbertura: "",
          horaFechamento: "",
        }));
      } else {
        setErros((prevErros) => ({
          ...prevErros,
          horaFechamento:
            "A diferença de horas deve ser entre 4 e 8 horas e 30 minutos ",
        }));
      }
    } else {
      setErros((prevErros) => ({
        ...prevErros,
        horaFechamento: "Por favor, informe um horário válido (HH:MM)",
      }));
    }
  };

  const handleChangeCNPJ = (e) => {
    const input = e.target.value;
    setCnpj(input);

    if (input.trim() === "") {
      setErros((prevErros) => ({
        ...prevErros,
        cnpj: "Por favor, informe o CNPJ.",
      }));
    } else if (!validarCNPJ(input)) {
      setErros((prevErros) => ({
        ...prevErros,
        cnpj: "Por favor, informe um CNPJ válido.",
      }));
    } else {
      setErros((prevErros) => ({ ...prevErros, cnpj: "" }));
    }
  };

  const validarCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/[^\d]+/g, "");
    if (cnpj.length !== 14) return false;
    if (/^(\d)\1+$/.test(cnpj)) return false;
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) return false;
    return true;
  };

  const handleFormasDePagamentoChange = (event) => {
    const selectedForma = event.target.value;
    setFormasDePagamento([selectedForma]);
    setErros((prevErros) => ({ ...prevErros, formasDePagamento: "" }));
  };

  const handleDescricaoEmpresaChange = (event) => {
    const input = event.target.value;
    setDescricaoEmpresa(input);

    if (input.trim().length < 20) {
      setErros((prevErros) => ({
        ...prevErros,
        descricaoEmpresa: "Por favor, informe a descrição da empresa.",
      }));
    } else {
      setErros((prevErros) => ({
        ...prevErros,
        descricaoEmpresa: "",
      }));
    }
  };

  const handleFotoLogotipoChange = (e) => {
    const file = e.target.files[0];
    setFotoLogotipo(file);

    if (!file) {
      setErros((prevErros) => ({
        ...prevErros,
        fotoLogotipo: "Por favor, adicione uma imagem ou um logotipo.",
      }));
    } else {
      setErros((prevErros) => ({ ...prevErros, fotoLogotipo: "" }));
    }
  };

  // Dellicacy@25
  // quizitocristiano10@gmail.com
  // dellicacy36323@gmail.com
  // useresCompany



  const handleSubmit = async () => {
    if (validaFormSinginUp()) {



      const auth = getAuth()
      const firestore = getFirestore()
      const usersCollection = collection(firestore, 'useresCompany')
       
   
  
      try {
        setMyNewloading(true);
        console.log("Tentando registrar usuário com e-mail:", formData.email);
  
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        console.log("Usuário registrado com sucesso:", userCredential.user);
  
        const user = userCredential.user;
        
        // Atualizar o perfil com o nome completo
        await updateProfile(user, { displayName: formData.fullName });
        

        const userDocRef = doc(usersCollection, user.uid);
        await setDoc(userDocRef, {
          id: user.uid,
          nome: formData.nome,
          sobrenome: formData.sobrenome,
          cpf: formData.cpf,
          imgUser: formData.imgUser || "",
          endereco: formData.endereco,
          cidade: formData.cidade,
          estado: formData.estado,
          cep: formData.cep,
          telefone: formData.telefone,
          horarioAbertura: formData.horarioAbertura,
          horarioFechamento: formData.horarioFechamento,
          cnpj: formData.cnpj,
          formasDePagamento: formData.formasDePagamento,
          descricaoEmpresa: formData.descricaoEmpresa,
          logo: formData.fotoLogotipo.logo,
        });
        
  
        localStorage.setItem("userData", JSON.stringify(formData));
        alert("Usuário cadastrado com sucesso!");
  
        // Limpar dados do formulário
        setFormData(initialFormData);
        navigate("/");
      } catch (error) {
        console.error("Erro ao criar usuário:", error.message);
        
        if (error.code === "auth/email-already-in-use") {
          alert("Este e-mail já está em uso.");
        } else if (error.code === "auth/weak-password") {
          alert("A senha deve ter pelo menos 6 caracteres.");
        } else {
          alert("Erro ao criar empresa: " + error.message);
        }
      }
      
    } else {
      console.log("Formulário inválido, corrigir erros.");
    }
  };
  
  

  return (
    <>
      {myNewloading && (
        <ContainerCardLaoder>
          <Loader sx={{ animation: "rotation 1s linear infinite" }}>
            <LoaderAfter />
          </Loader>
          <div>Logando...</div>
        </ContainerCardLaoder>
      )}

      <StyleClientNweLib.container>
        <StyleClientNweLib.wrapper>
          <Stack
            sx={{
              color: "var(--green-color)",
              fontSize: "1.8rem",
              gap: "0.9rem",
              width: "100%",
              "@media (max-width: 800px)": {
                fontSize: "1.4rem",
                transition: "all 200ms",
              },
            }}
          >
            <h4>Cadastre sua Empresa</h4>
          </Stack>

          <StyleClientNweLib.containerChild>
            <StyleClientNweLib.wrapperCardBox>
              <InputMask
                mask="99999-999"
                value={cep}
                onChange={handleChangeCep}
                onBlur={checkCEP}
              >
                {() => (
                  <TextField
                    sx={{ width: "100%", fontSize: "1.3rem" }}
                    type="text"
                    label="CEP"
                    autoComplete="true"
                    id="cep"
                    placeholder="Informe o cep da empresa"
                    variant="outlined"
                    size="small"
                    value={cep}
                    error={!!erros.cep}
                    helperText={erros.cep}
                  />
                )}
              </InputMask>
            </StyleClientNweLib.wrapperCardBox>

            <StyleClientNweLib.wrapperCardBox>
              <TextField
                sx={{ width: "100%", fontSize: "1.3rem" }}
                type="text"
                label="Rua"
                id="rua"
                autoComplete="true"
                placeholder="Informe a rua da empresa"
                variant="outlined"
                size="small"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
                error={!!erros.rua}
                helperText={erros.rua}
              />
            </StyleClientNweLib.wrapperCardBox>
          </StyleClientNweLib.containerChild>

          <StyleClientNweLib.containerChild>
            <StyleClientNweLib.wrapperCardBox>
              <TextField
                sx={{ width: "100%", fontSize: "1.3rem" }}
                type="text"
                label="Número"
                id="numeroDoEdificios"
                placeholder="Informe o número do edifício..."
                variant="outlined"
                size="small"
                autoComplete="true"
                value={numeroDoEdificios}
                onChange={(e) => setNumeroDoEdificios(e.target.value)}
                error={!!erros.numeroDoEdificios}
                helperText={erros.numeroDoEdificios}
              />
            </StyleClientNweLib.wrapperCardBox>

            <StyleClientNweLib.wrapperCardBox>
              <TextField
                sx={{ width: "100%", fontSize: "1.3rem" }}
                type="text"
                label="Cidade"
                id="cidade"
                placeholder="Informe a cidade da empresa"
                variant="outlined"
                size="small"
                autoComplete="true"
                value={cidade} // Controlado pelo estado
                onChange={handleChangeCidade} // Permite edição manual
                error={!!erros.cidade}
                helperText={erros.cidade}
              />
            </StyleClientNweLib.wrapperCardBox>
          </StyleClientNweLib.containerChild>

          <StyleClientNweLib.containerChild>
            <StyleClientNweLib.wrapperCardBox>
              <TextField
                   sx={{ width: "100%", fontSize: "1.3rem" }}
                   type="text"
                   label="Bairro"
                   id="bairro"
                   autoComplete="true"
                   placeholder="Informe o bairro da empresa"
                   variant="outlined"
                   size="small"
                   value={bairro} // Controlado pelo estado
                   onChange={handleChangeBairro} // Permite edição manual
                   error={!!erros.bairro}
                   helperText={erros.bairro}
              />
            </StyleClientNweLib.wrapperCardBox>

            <StyleClientNweLib.wrapperCardBox>
              <TextField
                 sx={{ width: "100%", fontSize: "1.3rem" }}
                 type="text"
                 label="Estado"
                 id="estado"
                 placeholder="Informe o estado da empresa"
                 variant="outlined"
                 size="small"
                 autoComplete="true"
                 value={estado} // Controlado pelo estado
                 onChange={handleChangeEstado} // Permite edição manual
                 error={!!erros.estado}
                 helperText={erros.estado}
              />
            </StyleClientNweLib.wrapperCardBox>
          </StyleClientNweLib.containerChild>

          <StyleClientNweLib.containerChild>
            <StyleClientNweLib.wrapperCardBox>
              <InputMask
                mask="99:99"
                value={horaAbertura}
                onChange={handleHoraAberturaChange}
              >
                {() => (
                  <TextField
                    sx={{ width: "100%", fontSize: "1.3rem" }}
                    type="text"
                    label="Horário de Abertura"
                    id="Abertura"
                    placeholder="Horário de Abertura (HH:MM)"
                    variant="outlined"
                    size="small"
                    value={horaAbertura}
                    error={!!erros.horaAbertura}
                    helperText={erros.horaAbertura}
                  />
                )}
              </InputMask>
            </StyleClientNweLib.wrapperCardBox>

            <StyleClientNweLib.wrapperCardBox>
              <InputMask
                mask="99:99"
                value={horaFechamento}
                onChange={handleHoraFechamentoChange}
              >
                {() => (
                  <TextField
                    sx={{ width: "100%", fontSize: "1.3rem" }}
                    type="text"
                    label="Horário de Fechamento"
                    id="Fechamento"
                    placeholder="Horário de Fechamento (HH:MM)"
                    variant="outlined"
                    size="small"
                    value={horaFechamento}
                    error={!!erros.horaFechamento}
                    helperText={erros.horaFechamento}
                  />
                )}
              </InputMask>
            </StyleClientNweLib.wrapperCardBox>
          </StyleClientNweLib.containerChild>

          <StyleClientNweLib.containerChild>
            <StyleClientNweLib.wrapperCardBox>
              <InputMask
                mask="99.999.999/9999-99"
                value={cnpj}
                onChange={handleChangeCNPJ}
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    sx={{ width: "100%", fontSize: "1.3rem" }}
                    type="text"
                    label="CNPJ"
                    id="Cnpj"
                    placeholder="Informe o CNPJ"
                    variant="outlined"
                    size="small"
                    error={!!erros.cnpj}
                    helperText={erros.cnpj}
                  />
                )}
              </InputMask>
            </StyleClientNweLib.wrapperCardBox>

            <StyleClientNweLib.wrapperCardBox>
              <TextField
                sx={{ width: "100%" }}
                type="text"
                label="Nome"
                placeholder="Informe o nome da sua Empresa"
                variant="outlined"
                size="small"
                value={nomedaEmpresa}
                onChange={handleChangeNome}
                error={!!erros.nomedaEmpresa}
                helperText={erros.nomedaEmpresa}
              />
            </StyleClientNweLib.wrapperCardBox>
          </StyleClientNweLib.containerChild>

          <StyleClientNweLib.containerChild>
            <StyleClientNweLib.wrapperCardBox>
              <TextField
                sx={{ width: "100%" }}
                type="text"
                label="E-mail da empresa"
                variant="outlined"
                size="small"
                value={email}
                onChange={handleChangeEmail}
                error={!!erros.email}
                helperText={erros.email}
              />
            </StyleClientNweLib.wrapperCardBox>

            <StyleClientNweLib.wrapperCardBox>
              <TextField
                sx={{ width: "100%", marginBottom: 2 }}
                type={showPassword ? "text" : "password"}
                label="Senha"
                variant="outlined"
                size="small"
                value={password}
                onChange={handleChangePassword}
                error={!!erros.password}
                helperText={erros.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </StyleClientNweLib.wrapperCardBox>
          </StyleClientNweLib.containerChild>

          <StyleClientNweLib.containerChild>
            <StyleClientNweLib.wrapperCardBox>
              <InputMask
                mask="(99) 99999-9999"
                value={telefone}
                onChange={handleChangePhone}
              >
                {() => (
                  <TextField
                    sx={{ width: "100%", marginBottom: 2 }}
                    type="text"
                    label="Telefone"
                    variant="outlined"
                    size="small"
                    error={!!erros.telefone}
                    helperText={erros.telefone}
                  />
                )}
              </InputMask>
            </StyleClientNweLib.wrapperCardBox>

            <StyleClientNweLib.wrapperCardBox>
              <TextField
                sx={{ width: "100%", fontSize: "1.3rem" }}
                type="file"
                variant="outlined"
                size="small"
                onChange={handleFotoLogotipoChange}
                error={!!erros.fotoLogotipo}
                inputProps={{ accept: "image/*" }}
              />
              <Typography
                sx={{ fontSize: "1.3rem", color: "red" }}
                className="error"
              >
                {erros.fotoLogotipo}
              </Typography>
            </StyleClientNweLib.wrapperCardBox>
          </StyleClientNweLib.containerChild>

          <StyleClientNweLib.containerChild>
            <StyleClientNweLib.wrapperCardBox>
              <TextField
                sx={{
                  width: "100%",
                  marginBottom: "1.5rem",
                  display: "flex",
                  textAlign: "center",
                  fontSize: "1.6rem",
                }}
                type="text"
                label="Descrição da Empresa"
                variant="outlined"
                size="small"
                value={descricaoEmpresa}
                onClick={() => setDescricaoModalAberto(true)}
                onChange={handleDescricaoEmpresaChange}
                error={!!erros.descricaoEmpresa}
              />
              <Typography
                sx={{ fontSize: "1.3rem", color: "red" }}
                id="descricaoEmpresaError"
                className="error"
              >
                {erros.descricaoEmpresa}
              </Typography>
            </StyleClientNweLib.wrapperCardBox>

            <StyleClientNweLib.wrapperCardBox>
              <FormControl fullWidth>
                <InputLabel id="formas-de-pagamento-label">
                  Formas de Pagamento
                </InputLabel>
                <Select
                  labelId="formas-de-pagamento-label"
                  id="formas-de-pagamento"
                  value={formasDePagamento[0] || ""}
                  label="Formas de Pagamento"
                  onChange={handleFormasDePagamentoChange}
                  onBlur={() => setDescricaoModalAberto(false)}
                >
                  <MenuItem value="">Forma de Pagamento</MenuItem>
                  <MenuItem value="pix">Pix</MenuItem>
                  <MenuItem value="Cartão de Crédito">
                    Cartão de Crédito
                  </MenuItem>
                  <MenuItem value="Cartão de Débito">Cartão de Débito</MenuItem>
                  <MenuItem value="Pagamento Na Entrega">
                    Pagamento na Entrega
                  </MenuItem>
                </Select>
              </FormControl>
              {descricaoModalAberto && <Box sx={{ marginTop: "1rem" }}></Box>}
              {erros.formasDePagamento && (
                <Typography
                  sx={{ fontSize: "1.3rem", color: "red" }}
                  id="formasDePagamentoError"
                  className="error"
                >
                  {erros.formasDePagamento}
                </Typography>
              )}
            </StyleClientNweLib.wrapperCardBox>
          </StyleClientNweLib.containerChild>

          {descricaoModalAberto && (
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10px",
                marginBottom: "10px",
                height: "240px",
                width: "100%",
                display: "flex",
              }}
            >
              <textarea
                className="myTexteArea"
                value={descricaoEmpresa}
                onChange={handleDescricaoEmpresaChange}
                rows={5}
                cols={30}
                placeholder="Digite uma descrição (mínimo 20 caracteres)"
                style={{
                  marginBottom: "10px",
                  resize: "none",
                  height: "240px",
                  width: "100%",
                }}
              />
            </Box>
          )}

          <StyleClientNweLib.containerChild>
            <StyleClientNweLib.cardBotton
              onClick={handleSubmit}
              disabled={myNewloading}
            >
              Insira os Dados
            </StyleClientNweLib.cardBotton>
            <Link to={"/"}>Já tenho conta!</Link>
          </StyleClientNweLib.containerChild>
        </StyleClientNweLib.wrapper>

        {/* <StyleClientNweLib.wrapperCardBox>
      <ApexChart/>

      </StyleClientNweLib.wrapperCardBox> */}
      </StyleClientNweLib.container>
    </>
  );
};
