import { Box, Stack, styled } from "@mui/material";

export const StyleClient = {
  container: styled(Stack)(({ bg }) => ({
    display: "flex",
    maxWidth: "1290px",
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
    background: bg ? bg : "red",
    padding: "20px 20px",
  })),

  wrapper: styled(Box)(({}) => ({
    textAlign: "center",
    fontSize: "1.6rem",
    fontWeight: 600,
    color: "black",
    marginBottom: "2rem",

    "@media only screen and (max-width: 700px)": {
      fontSize: "1.4rem",
    },
  })),

  containerChild: styled(Stack)(({}) => ({
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "1px 2px 11px 4px rgb(14 55 54 / 55%)",
    borderRadius: "0.5rem",
    marginBottom: "20px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(5px)",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      border: "2px solid black",
    },
  })),
};
