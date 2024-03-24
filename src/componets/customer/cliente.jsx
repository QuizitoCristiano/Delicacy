import React from "react";
import { Stack, Grid, Box } from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";

import sol from "../../images/sol.jpg";
import Quizito2 from "../../images/quizito2.jpeg";
import mamae from "../../images/mamae.jpeg";
import nascerd from "../../images/nascerd-o-sol.jpg";
import Quizito from "../../images/Quizito.jpeg";
import temotio from "../../images/temotio.jpeg";
import Cliente from "./childClient/child";
import { StyleClient } from "./StyleClient";


const dadosDosClientes = [
  {
    nome: "Quizito Cristiano",
    customerImage: sol,
    message: `
    A Delicacty sempre me surpreende com a qualidade impecável dos
    produtos. Os legumes são frescos e as frutas são deliciosas. Além
    disso, a entrega rápida é um grande diferencial. Mal posso esperar
    para fazer meu próximo pedido!
    `,
  },
  {
    nome: "Rafael T.",
    customerImage: Quizito2,
    message: `
    A Delicacty é a minha salvação quando estou sem tempo para ir ao
    supermercado. Eles entregam tão rapidamente que nunca fico sem
    frutas e legumes frescos em casa. E os descontos são uma grande
    ajuda para o orçamento.
    `,
  },

  {
    nome: "Sandro",
    customerImage: mamae,
    message: `
    Os produtos da Delicacty são tão frescos que parece que acabei de
    colhê-los eu mesmo. A entrega rápida é um grande benefício,
    especialmente quando estou ocupado. Os descontos também são muito
    apreciados!
    `,
  },

  {
    nome: "Pedro Henrique",
    customerImage: nascerd,
    message: `
    Nunca encontrei uma loja online que entregasse tão rapidamente
    quanto a Delicacty. Além disso, os produtos são de alta qualidade, e
    os descontos regulares são um bônus adicional que economiza meu
    dinheiro.
    `,
  },

  {
    nome: "Mariana Dos Santos",
    customerImage: Quizito,
    message: `
    A Delicacty sempre me surpreende com a qualidade impecável dos
    produtos. Os legumes são frescos e as frutas são deliciosas. Além
    disso, a entrega rápida é um grande diferencial. Mal posso esperar
    para fazer meu próximo pedido!
    `,
  },
  {
    nome: "Temótio Luiz",
    customerImage: temotio,
    message: `
    A Delicacty é a minha opção número um para alimentos frescos. A
    qualidade é impecável, a entrega é super rápida, e os descontos
    frequentes me fazem voltar sempre. Uma loja incrível!
    `,
  },
];

const Clientes = () => {
  const dadosItem = dadosDosClientes.map((item, index) => (
    <Cliente
      key={index}
      nome={item.nome}
      imagem={item.customerImage}
      mensagem={item.message}
    />
  ));

  return (
    <StyleClient.container bg="#fff">
      <StyleClient.wrapper>
        <h2>por que os clientes nos amam?</h2>
      </StyleClient.wrapper>

      <Grid container spacing={3} justifyContent="center">
        {dadosItem}
      </Grid>
    </StyleClient.container>
  );
};

export default Clientes;
