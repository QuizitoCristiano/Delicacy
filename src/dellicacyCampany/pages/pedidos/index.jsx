import { Link } from "react-router-dom";
import { StylePedidos } from "./style";
import { Stack } from "@mui/material";
import { useLocation } from "react-router-dom";

export const Pedidos = ({}) => {
  const subLinks = [
    {
      title: "Todos Pedidos",
      path: "/all",
      icon: null,
    },
    {
      title: "Completas",
      path: "/Completas",
      icon: null,
    },
    {
      title: "Canceladas",
      path: "/Canceladas",
      icon: null,
    },
    
    {
      title: "Entregues",
      path: "/Entregues",
      icon: null,
    },
    
    {
      title: "Em espera",
      path: "/Em espera",
      icon: null,
    },
    {
      title: "Atrasados",
      path: "/Atrasados",
      icon: null,
    },
  ];
  return (
    <StylePedidos.container>
      <StylePedidos.headerLinks>
        {subLinks.map((link, i) => {
          return (
            <Link
              to={link.path}
              key={i}
              style={{
                width: "100%",
                height: "100%",
                mt: i === 0 ? "3rem" : "0px",
                marginRight: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                ":hover": {
                  background: "var(--light-orange-color)",
                },
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  color: 'black',
                  borderBottom:  "3px solid #3cb815",
                }}
              >
                <span>{link.title}</span>
              </Stack>
            </Link>
          );
        })}
      </StylePedidos.headerLinks>
      
    </StylePedidos.container>
  );
};
