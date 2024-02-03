import React from "react";
import { Typography, Stack, Box } from "@mui/material";
import { Grid } from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import "./cliente.css";

import sol from "../../images/sol.jpg";
import Quizito2 from "../../images/quizito2.jpeg";
import mamae from "../../images/mamae.jpeg";
import nascerd from "../../images/nascerd-o-sol.jpg";
import Quizito from "../../images/Quizito.jpeg";
import temotio from "../../images/temotio.jpeg";

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

  export const Clientes = () => {
    const dadosItem = dadosDosClientes.map((item, index) => (
      <Grid item key={index}>
        <Stack
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "2rem",
            "@media only screen and (max-width: 305px)": {
              gap: "1rem",
            },
          }}
        >
          <Box
            className="box"
            sx={{
              width: "100%",
              backgroundColor: item.backgroundColor,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "0.5rem",
              "& img": {
                width: "100%",
                height: "100px",
                objectFit: "contain",
                objectPosition: "center",
              },
              "& h2": {
                fontSize: "1.7rem",
                color: "black",
                fontWeight: 600,
              },
              "& span": {
                fontSize: "0.8rem",
                fontWeight: 400,
                marginBottom: "1rem",
              },
              "& .bx": {
                padding: "10px",
                color: "var(--bg-color)",
                borderRadius: "5rem",
                marginTop: "2rem",
                position: "absolute",
                bottom: "-8%",
                display: "none",
              },
              "&:hover .bx": {
                display: "block",
                transition: "0.5s all linear",
              },
            }}
          >
            <img
              src={item.customerImage}
              alt="Opa!! Não deu certo, tenta novamente."
            />
            <Typography className="textName">{item.nome}</Typography>
            <p>{item.message}</p>
            <ArrowForwardIcon
              sx={{
                color: "var(--bg-color)",
                fontSize: "3.8rem",
              }}
              className="bx"
            />
          </Box>
        </Stack>
      </Grid>
    ));
  
    return (
      <Stack className="categoriaProducts">
        <Stack
          sx={{
            padding: " 6rem 2% 2rem",
            fontSize: "1rem",
            color: "var(--text-color: #1a2428",
          }}
        >
          <h2>
            Nossos Produtos Populares <br />
            <span>Produtos de Frutas</span>
          </h2>
          <a href="#" className="btnMyButton">
            Ver tudo <ArrowForwardIcon className="bx" />
          </a>
        </Stack>
  
        <div className="stares">
          <StarRateIcon className="myStares" />
          <StarRateIcon className="myStares" />
          <StarRateIcon className="myStares" />
          <StarRateIcon className="myStares" />
          <StarRateIcon className="myStares" />
        </div>
  
        <Grid container spacing={3} justifyContent="center">
          {dadosItem}
        </Grid>
      </Stack>
    );
  };
