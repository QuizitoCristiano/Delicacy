import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


const Cliente = ({ nome, imagem, mensagem }) => {
  return (
    <Grid item>
      <Box className="box">
        <img src={imagem} alt={nome} />
        <Typography className="textName">{nome}</Typography>
        <p>{mensagem}</p>
        <ArrowForwardIcon className="bx" />
      </Box>
    </Grid>
  );
};

export default Cliente;

