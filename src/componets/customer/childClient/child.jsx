import React from "react";
import { Typography, Box, Grid, Stack } from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { StyleClient } from "../StyleClient";

const Cliente = ({ nome, imagem, mensagem }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <StyleClient.containerChild
        
      >
        <div className="stars">
          {Array.from({ length: 5 }, (_, index) => (
            <StarRateIcon key={index} sx={{ fontSize: "1.9rem", color: "var(--light-orange-color)" }} />
          ))}
        </div>
        <Box sx={{ marginBottom: "20px" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 400, fontSize: "1.7rem", color: "black" }}>
            {mensagem}
          </Typography>
        </Box>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: "80px",
              height: "80px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              borderRadius: "50%",
              padding:'20px',
             
              boxShadow:' rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px',
              marginBottom: "10px",
              position: 'relative'
          

              
            }}
          >
            <img
              src={imagem}
              alt={nome}
              style={{
                width: "auto",
                borderRadius: "50%",
                height: "auto",
                objectFit: "cover",
                objectPosition: "center",
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </Box>





          <Typography sx={{ fontWeight: 700, fontSize: "1.7rem", color: "black" }}>{nome}</Typography>
        </Stack>
      </StyleClient.containerChild>
    </Grid>
  );
};

export default Cliente;
