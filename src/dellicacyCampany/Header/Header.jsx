import React, { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./header.css";
import DehazeIcon from "@mui/icons-material/Dehaze";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Stack, Typography, colors } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import Dellicacy from "../imgLogomarca/priclogo1.png";

const myLink = [
  { label: "Home", link: "/" },
  { label: "Pedidos", link: "/pedidos" },
  { label: "Produtos", link: "/CreateProductItem" },
  { label: "Grafico", link: "/ApexChart" },
];

export const MyHeader = () => {
  const location = useLocation();
  console.log(location);
  const [abreMeno, setAbreMeno] = useState(false);

  const abrirMenu = () => {
    setAbreMeno(true);
  };

  const fecharMenu = () => {
    setAbreMeno(false);
  };

  return (
    <>
      <Stack
        sx={{
          fontFamily: '"Almarai","Helvetica","Arial",sans-serif',
          width: "100%",
          height: "80px",
          position: "fixed",
          padding: "20px 50px",
          top: "0",
          left: "0",
          right: "0",
          flexDirection: "row",
          display: "flex",
          background: "var(--bg-color)",
          boxShadow: "0 8px 11px rgb(14 55 54 / 35%)",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: "2000",
          "@media only screen and (max-width: 805px)": {
            padding: "10px 10px",
          },
        }}
      >
        {/* Logo e Título */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            height: "100%",
            width: "30%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              height: "100%",
              width: "100%",
              cursor: "pointer",

              transition: "all 0.3s ease",

              "@media (max-width: 600px)": {
                cursor: "pointer",
                height: "100%",
                width: "100%",
              },
            }}
          >
            <img src={Dellicacy} className="logoImageDl" alt="Dellicacy Logo" />
          </Box>
        </Box>

        {/* <Stack
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "row",
            justifyContent: "flex-start",

            height: "100%",
            width: "40%",
          }}
        >
          <StoreIcon
            sx={{
              color: "var(--light-orange-color)",
              fontSize: "2.5rem",
            }}
          />
          <Typography>
            <Link className="logoDelicacy" to="/">
              Delicacy
            </Link>
          </Typography>
        </Stack> */}

        <Stack className="myNaveLink">
          <div className="logo-links">
            {myLink.map((item, index) => {
              const isLink = item.link === location.pathname;
              return (
                <Link
                  style={{
                    color: isLink ? "#fff" : "black",
                    borderRadius: "5px",
                    padding: isLink && "4px",
                    boxShadow:
                      isLink &&
                      "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                    transition: "all .3s",
                    background: isLink && "#3cb815",
                  }}
                  to={item.link}
                  key={index}
                >
                  <p>{item.label}</p>
                </Link>
              );
            })}
          </div>

          <div className="logo-icons">
            <span onClick={abrirMenu}>
              {abreMeno ? <CloseIcon /> : <DehazeIcon />}
            </span>
          </div>

          {abreMeno && (
            <div className="menu-celular">
              <div className="icone-fechar">
                <span onClick={fecharMenu}>
                  Fechar
                  <CloseIcon />
                </span>
              </div>
              <div className="itens-menu-celular">
                {myLink.map((item, index) => {
                  const isLink = item.link === location.pathname;
                  return (
                    <Link
                      style={{
                        color: isLink ? "#fff" : "black",
                        borderRadius: "5px",
                        padding: isLink && "4px",
                        boxShadow:
                          isLink &&
                          "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                        transition: "all .3s",
                        background: isLink && "#3cb815",
                      }}
                      to={item.link}
                      key={index}
                    >
                      <p>{item.label}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </Stack>
      </Stack>
    </>
  );
};
