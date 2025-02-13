import { Box, Stack, styled, Button } from "@mui/material";
import { blue, red } from "@mui/material/colors";

export const StyleClientNweLib = {
  container: styled(Stack)(({ bg }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100vw",
    height: "100vh",
   
   
    
    "@media (max-width: 750px)": { width: "96vw" },

    // marginTop: '20px',
  })),

  wrapper: styled(Box)(({}) => ({
    width: "759px",
    height: "auto",
    gap: "2.8rem",
    display: "flex",

    padding: "20px",
    justifyContent: "center",
    borderRadius: "9px",
    border: "1px solid #e5e7eb",
    fontSize: "20px",
 

    alignItems: "center",
    boxShadow: "1px 2px 11px 4px rgb(14 55 54 / 25%)",
    flexDirection: "column",
    "@media (max-width: 750px)": { width: "100%", top: '10' },
  })),

  newcontainerrCharts: styled(Box)(({}) => ({
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0",
    margin: "0",
    boxSizing: "border-box",   
  })),

  wrapperCardBoxCharts: styled(Box)(({}) => ({
    width: "95vw",
    height: "95vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
    backgroundColor: "var(--white-color)",
    borderRadius: "1rem",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
    "@media (max-width: 750px)": {
      width: "100vw",
      height: "100vh",
      padding: "0.5rem",
      borderRadius: "0",  
      boxShadow: "1px 2px 11px 4px rgb(14 55 54 / 25%)",
    },



    
  })),

  newBoxCharts: styled(Box)(({}) => ({
    width: "100%",
    height: "100%",
    
  })),



  containerChild: styled(Stack)(({}) => ({
    width: "100%",
    display: "grid",

    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: "10px",
    "@media (max-width: 550px)": {
      width: "100%",
      gridTemplateColumns: "1fr",
    },
  })),



  wrapperCardBox: styled(Box)(({}) => ({
    width: "100%",
    display: "flex",
    gap: "1.3rem",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
  })),

  cardBotton: styled(Button)(({}) => ({
    display: "inline-block",
    padding: "12px 28px",
    backgroundColor: "var(--green-color)",
    borderRadius: "5px",
    color: "var(--bg-color)",
    fontSize: "1rem",
    letterSpacing: "1px",
    fontWeight: 600,
    transition: "all 0.45s ease",
    border: "none",
    outline: "none",
    ":hover": {
      background: "var(--light-orange-color)",
      border: "none",
      outline: "none",
      color: "var(--bg-color)",
      transition: "all 0.45s ease",
    },
  })),
};
