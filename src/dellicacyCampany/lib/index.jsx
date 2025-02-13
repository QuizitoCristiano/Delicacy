
const { controlStep, setControlStep } = props;
const {
  name,
  nameError,
  email,
  emailError,
  password,
  passwordError,
  telefone,
  telefoneError,
} = controlStep;





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
    setControlMyNewStep(() => ({
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





const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phoneNumber) => {
  // Remover caracteres não numéricos
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

  // Verificar se o número possui o formato correto (11 dígitos para celular ou 10 dígitos para telefone fixo)
  const isMobile = /^(\d{11})$/.test(cleanedPhoneNumber);
  const isLandline = /^(\d{10})$/.test(cleanedPhoneNumber);

  return isMobile || isLandline;
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (validateForm()) {
    // Enviar formulário
  }
};

const validateForm = () => {
  let isValid = true;
  if (!name.trim()) {
    setControlStep((prevState) => ({
      ...prevState,
      nameError: "O campo nome da empresa é obrigatório.",
    }));
    isValid = false;
  } else {
    setControlStep((prevState) => ({ ...prevState, nameError: "" }));
  }

  if (!email.trim()) {
    setControlStep((prevState) => ({
      ...prevState,
      emailError: "O campo e-mail da empresa é obrigatório.",
    }));
    isValid = false;
  } else if (!isValidEmail(email)) {
    setControlStep((prevState) => ({
      ...prevState,
      emailError: "Por favor, insira um e-mail válido.",
    }));
    isValid = false;
  } else {
    setControlStep((prevState) => ({ ...prevState, emailError: "" }));
  }

  if (!password.trim()) {
    setControlStep((prevState) => ({
      ...prevState,
      passwordError: "O campo senha é obrigatório.",
    }));
    isValid = false;
  } else if (password.length < 8) {
    setControlStep((prevState) => ({
      ...prevState,
      passwordError: "A senha deve ter pelo menos 8 caracteres.",
    }));
    isValid = false;
  } else {
    setControlStep((prevState) => ({ ...prevState, passwordError: "" }));
  }

  if (!telefone.trim()) {
    setControlStep((prevState) => ({
      ...prevState,
      telefoneError: "O campo telefone é obrigatório.",
    }));
    isValid = false;
  } else if (!isValidPhone(telefone)) {
    setControlStep((prevState) => ({
      ...prevState,
      telefoneError: "Por favor, insira um número de telefone válido.",
    }));
    isValid = false;
  } else {
    setControlStep((prevState) => ({ ...prevState, telefoneError: "" }));
  }

  return isValid;
};


