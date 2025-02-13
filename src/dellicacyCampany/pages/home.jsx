
import React, { useState, useContext } from "react";

import "./styles/homeStyles.css";
import {
  TextField,
  Typography,
  Stack,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Login } from "../signin/signin";
import ApexChart from "../componente/newCharts/Charts";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authcontext";
import { PasswordRecovery } from "../recovery/recoverySenha";
import { Pedidos } from "./pedidos";
import MyCardCampany from "../cardCampany/campany";
import { MyFooter } from "../footer/fbBraFooter";
import PreparoComponent from "../assets/createProductsStyles";

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebaseconfig/firebaseconfig'; // Certifique-se de que o caminho está correto
import { MeuCadastro } from "../signUp/SignUp";
import { CreateProductItem } from "../assets/createProducts ";

export const HomeCompany = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("isLogged");
    logout();
    navigate("/");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (confirmLogout) => {
    setOpen(false);
    if (confirmLogout) {
      handleLogout();
    }
  };

  return (
    <>
      <Stack
        sx={{
          maxHeight: "100vh",
          width: "100%",
          overflowY: "auto", 
          scrollBehavior: "smooth", 
          gap: "2rem",
          bgcolor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          "@media only screen and (max-width: 800px)": {
            width: "100%",
            height:  'auto',
            marginTop: "4rem",
            position: "relative",
          },
        }}
      >
     
         

        <Stack
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "auto",
          width: "100%",
          marginTop: '30rem',

          "@media only screen and (max-width: 800px)": {
            marginTop: '90rem',
          },
          
        }}
        >
        <MyCardCampany/>
        <CreateProductItem/>
        </Stack>
       
    
        <Stack>
          <button className="logoutButton" onClick={handleClickOpen}>
            Sair
          </button>
        </Stack>

        <Dialog open={open} onClose={() => handleClose(false)}>
          <DialogTitle
            style={{ fontSize: "2rem", fontWeight: "bold", color: "#3cb815" }}
          >
            {"Confirmar Logout"}
          </DialogTitle>
          

          <DialogContent>
            <DialogContentText
              sx={{
                fontSize: "1.8rem",
                color: "#f75f1d;",
                fontWeight: "bold",
              }}
            >
              Você tem certeza que deseja sair?
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "space-evenly",
              gap: "1rem",
              padding: "1rem 2rem",
              borderRadius: "0.5rem",
              color: "#3ca63a",
            }}
          >
            <Button
              sx={{
                padding: "10",
                color: "#fff",
                borderRadius: "8px",
                fontSize: "14px",
                gap: "1rem",
                backgroundColor: "#1a2428",
                boxShadow: "1px 5px 20px #3ca63a",
                "&:hover": {
                  boxShadow: "1px 5px 20px #f75f1d",
                  border: "2px solid #3ca63a",
                  background: "#f75f1d",
                  color: "#000",
                },
              }}
              onClick={() => handleClose(true)}
            >
              <ArrowBackIcon sx={{ fontSize: "2rem" }} />
              Sim
            </Button>

            <Button
              sx={{
                padding: "10",
                boxShadow: "1px 5px 20px #3ca63a",
                backgroundColor: "#1a2428",
                color: "#fff",
                borderRadius: "8px",
                fontSize: "14px",
                gap: "1rem",
                "&:hover": {
                  boxShadow: "1px 5px 20px #3ca63a",
                  border: "2px solid #3ca63a",
                  color: "#3ca63a",
                },
              }}
              onClick={() => handleClose(false)}
            >
              Não
              <ArrowForwardIcon sx={{ fontSize: "2rem" }} />
            </Button>
          </DialogActions>
        </Dialog>
        <MyFooter/>
      </Stack>
    
    </>
  );
};



