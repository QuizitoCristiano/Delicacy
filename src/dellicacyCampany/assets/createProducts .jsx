import React from "react";
import { Typography, Stack, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const CreateProductItem = () => {
  const handleAddToCart = () => {
    console.log("Produto adicionado ao carrinho!");
  };

  const handleFavorite = () => {
    console.log("Produto favoritado!");
  };

  return (
    <Stack sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
     height: "auto",
     width: "100%",
   
     padding: "10px",
      // background: "#F5F5F5",
      // borderRadius: "0.5rem",
      // marginBottom: "10px",
      // boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2)",
      // cursor: "pointer",
      // "&:hover": {
      //   boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.3)",
      // },
    }}>
      <Box
        sx={{
          padding: "10px",
          boxShadow: "1px 2px 11px 4px rgb(14 55 54 / 25%)",
          borderRadius: "0.5rem",
          height: "280px",
          width: "315px",
          position: "relative",
          "@media only screen and (max-width: 00px)": {
            width: "100%",
              bgcolor: 'red'
          },
        }}
      >
        <Stack>
          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "210px",
              borderRadius: "0.5rem",
              overflow: "hidden",
              "& img": {
                width: "100%",
                height: "210px",
                objectFit: "contain",
                objectPosition: "center",
                "@media only screen and (max-width: 500px)": {
                  width: "100%",
                  height: "210px",
                
                },
              },
            }}
          >
            <img src="https://via.placeholder.com/150" alt="Produto" />
          </Stack>

          <Typography
            variant="h1"
            sx={{
              fontWeight: "bold",
              fontSize: "1.8rem",
              color: "black",
            }}
          >
            Nome do Produto
          </Typography>

          <Stack direction="row" justifyContent="space-between">
            <Typography
              sx={{
                color: "var(--light-orange-color)",
                fontWeight: "600",
                fontSize: "2.2rem",
              }}
            >
              R$ 99,90
            </Typography>

            <Box
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  right: "0px",
                  bottom: "0px",
                  color: "var(--bg-color)",
                  fontSize: "3rem",
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                  padding: "8px",
                  background: "var(--green-color)",
                  borderRadius: "0.5rem 0px",
                  "&:hover": {
                    background: "var(--orange-color)",
                    transition: "0.2s",
                  },
                }}
                onClick={handleAddToCart}
              >
                <ShoppingCartIcon
                  sx={{
                    height: "25px",
                    width: "25px",
                    cursor: "pointer",
                  }}
                />
              </Box>
              <FavoriteBorderIcon
                onClick={handleFavorite}
                sx={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  fontSize: "20px",
                  color: "var(--light-orange-color)",
                  cursor: "pointer",
                }}
              />
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
